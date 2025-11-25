<template>
  <section class="section-spacing bg-neutral">
    <div class="container-custom">
      <h2 
        v-if="block.title" 
        class="text-section-mobile md:text-section text-primary font-title font-bold mb-12 md:mb-16 text-center"
      >
        {{ block.title }}
      </h2>
      
      <!-- Loading state -->
      <div v-if="pending" class="text-center py-16">
        <p class="text-primary/60">Loading projects...</p>
      </div>
      
      <!-- Error state -->
      <div v-else-if="error" class="text-center py-16">
        <p class="text-red-500">Error loading projects: {{ error?.message }}</p>
      </div>
      
      <!-- Projects grid -->
      <div 
        v-else-if="projects && projects.length > 0" 
        class="grid gap-8 md:grid-cols-2"
      >
        <article
          v-for="project in projects"
          :key="project._id"
          class="group bg-neutral border border-neutral-gray rounded-card overflow-hidden hover:shadow-card-hover transition-all duration-300 cursor-pointer hover:scale-[1.02]"
          @click="navigateToProject(project.slug.current)"
        >
          <div 
            v-if="project.featuredImage" 
            class="aspect-video overflow-hidden bg-neutral-light"
          >
            <img
              :src="urlFor(project.featuredImage).width(800).height(450).url()"
              :alt="project.title"
              class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            >
          </div>
          
          <div class="p-6 md:p-8 space-y-4">
            <div class="flex items-start justify-between gap-4">
              <h3 class="text-xl md:text-2xl font-title font-bold text-primary flex-1">
                {{ project.title }}
              </h3>
              <span
                v-if="project.status"
                class="text-xs px-3 py-1 rounded-full font-medium whitespace-nowrap"
                :class="getStatusClass(project.status)"
              >
                {{ formatStatus(project.status) }}
              </span>
            </div>
            
            <p 
              v-if="project.description" 
              class="text-primary/70 text-body-mobile line-clamp-3"
            >
              {{ project.description }}
            </p>
            
            <div 
              v-if="project.techStack && project.techStack.length > 0" 
              class="flex flex-wrap gap-2"
            >
              <UiTechBadge
                v-for="tech in project.techStack.slice(0, 4)"
                :key="tech"
                :label="tech"
                variant="default"
              />
              <span
                v-if="project.techStack.length > 4"
                class="text-xs text-primary/50 self-center"
              >
                +{{ project.techStack.length - 4 }}
              </span>
            </div>
            
            <div class="flex gap-6 text-ui-small pt-2">
              <a
                v-if="project.githubUrl"
                :href="project.githubUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="text-accent hover:text-accent-dark transition-all duration-200 ease-out"
                @click.stop
              >
                GitHub →
              </a>
              <a
                v-if="project.demoUrl"
                :href="project.demoUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="text-accent hover:text-accent-dark transition-all duration-200 ease-out"
                @click.stop
              >
                Demo →
              </a>
            </div>
          </div>
        </article>
      </div>
      
      <!-- Empty state -->
      <div v-else class="text-center py-16">
        <p class="text-primary/60">No projects found.</p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { SanityDocument } from '@sanity/client'
import { createClient } from '@sanity/client'
import groq from 'groq'
import type { ProjectsBlock, UrlBuilder } from '~/types/sanity'
import UiTechBadge from '~/components/ui/TechBadge.vue'

interface Props {
  block: ProjectsBlock
  urlFor: UrlBuilder
}

const props = defineProps<Props>()

const runtime = useRuntimeConfig()
const client = createClient({
  projectId: String(runtime.public.NUXT_PUBLIC_SANITY_PROJECT_ID || ''),
  dataset: String(runtime.public.NUXT_PUBLIC_SANITY_DATASET || 'production'),
  apiVersion: '2025-07-16',
  useCdn: true
})

// Build GROQ query based on block configuration
const buildProjectsQuery = computed(() => {
  const maxProjects = props.block.showAllProjects 
    ? 999 
    : (props.block.maxProjects || 6)
  
  const statusFilter = props.block.filterByStatus && props.block.filterByStatus !== 'all'
    ? `&& status == "${props.block.filterByStatus}"`
    : ''
  
  return groq`*[_type == "project" && defined(slug.current) ${statusFilter}]|order(_createdAt desc)[0...${maxProjects}]{
    _id,
    title,
    slug,
    description,
    featuredImage,
    techStack,
    githubUrl,
    demoUrl,
    status,
    startDate,
    endDate
  }`
})

const { data: projects, pending, error } = await useAsyncData<SanityDocument[]>(
  () => `projects-${props.block.maxProjects || 6}-${props.block.filterByStatus || 'all'}`,
  () => client.fetch(buildProjectsQuery.value)
)

const navigateToProject = (slug: string) => {
  navigateTo(`/projects/${slug}`)
}

const formatStatus = (status: string): string => {
  return status
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

const getStatusClass = (status: string): string => {
  switch (status) {
    case 'completed':
      return 'bg-green-100 text-green-800'
    case 'in-progress':
      return 'bg-accent/10 text-accent'
    case 'school-project':
      return 'bg-purple-100 text-purple-800'
    case 'archived':
      return 'bg-neutral-gray text-primary/70'
    default:
      return 'bg-neutral-gray text-primary/70'
  }
}
</script>