<template>
  <main class="min-h-screen bg-neutral">
    <div class="container-custom section-spacing">
      <div class="max-w-6xl mx-auto space-y-12 md:space-y-16">
        <h1 class="text-section-mobile md:text-section text-primary font-title font-bold text-center">
          Projects
        </h1>
        
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
          class="grid gap-6 md:gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
        <article
          v-for="project in projects"
          :key="project._id"
          class="group bg-neutral border border-neutral-gray rounded-card overflow-hidden hover:shadow-card-hover transition-all duration-300 cursor-pointer hover:scale-[1.02]"
          @click="navigateTo(`/projects/${project.slug.current}`)"
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
              <h2 class="text-xl md:text-2xl font-title font-bold text-primary flex-1">
                {{ project.title }}
              </h2>
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
                :key="tech._id"
                :label="tech.name"
                :icon="tech.icon"
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
    </div>
  </main>
</template>

<script setup lang="ts">
import type { SanityDocument } from '@sanity/client'
import { createClient } from '@sanity/client'
import groq from 'groq'
import UiTechBadge from '~/components/ui/TechBadge.vue'
import { useSeo } from '~/composables/useSeoMeta'

const PROJECTS_QUERY = groq`*[_type == "project" && defined(slug.current)]|order(_createdAt desc){
  _id,
  title,
  slug,
  description,
  featuredImage,
  techStack[]-> {
    _id,
    name,
    icon,
    category
  },
  githubUrl,
  demoUrl,
  status
}`

const runtime = useRuntimeConfig()
const client = createClient({
  projectId: String(runtime.public.NUXT_PUBLIC_SANITY_PROJECT_ID || ''),
  dataset: String(runtime.public.NUXT_PUBLIC_SANITY_DATASET || 'production'),
  apiVersion: '2025-07-16',
  useCdn: true
})

const { data: projects, pending, error } = await useAsyncData<SanityDocument[]>(
  'all-projects',
  () => client.fetch(PROJECTS_QUERY)
)

// SEO metadata
const route = useRoute()
const config = useRuntimeConfig()
const siteUrl = config.public.siteUrl || (process.client ? window.location.origin : '')

useSeo({
  title: 'Projects - Portfolio',
  description: 'Browse through my portfolio of web development projects and applications',
  url: `${siteUrl}${route.path}`,
  keywords: ['projects', 'portfolio', 'web development', 'applications'],
})

const urlFor = useImageUrl()

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