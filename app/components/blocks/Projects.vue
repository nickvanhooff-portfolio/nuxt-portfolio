<template>
  <section 
    :id="$attrs.id as string || 'projects'"
    class="section-spacing bg-neutral relative overflow-hidden"
    :style="{ scrollMarginTop: '80px' }"
  >
    <!-- Subtle background gradient -->
    <div class="absolute inset-0 opacity-20">
      <div class="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-accent/10" />
    </div>

    <div class="container-custom relative z-10">
      <div class="max-w-6xl mx-auto space-y-12 md:space-y-16">
        <!-- Heading -->
        <div 
          v-if="block.title" 
          class="text-center space-y-4 animate-fade-in-up"
        >
          <h2 
            class="text-section-mobile md:text-section text-primary font-title font-bold relative inline-block"
          >
            <span class="relative z-10">{{ block.title }}</span>
            <span 
              class="absolute inset-0 bg-gradient-to-r from-accent/20 via-accent/40 to-accent/20 blur-2xl opacity-50 -z-10"
            />
          </h2>
        </div>
        
        <!-- Loading state -->
        <div v-if="pending" class="text-center py-16 animate-fade-in-up">
          <p class="text-primary/60">Loading projects...</p>
        </div>
        
        <!-- Error state -->
        <div v-else-if="error" class="text-center py-16 animate-fade-in-up">
          <p class="text-red-500">Error loading projects: {{ error?.message }}</p>
        </div>
        
        <!-- Projects grid with modern cards -->
        <div 
          v-else-if="projects && projects.length > 0" 
          class="grid gap-6 md:gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          <article
            v-for="(project, index) in projects"
            :key="project._id"
            class="project-card group"
            :style="{ animationDelay: `${index * 0.1}s` }"
            @click="navigateToProject(project.slug.current)"
            @mouseenter="handleMouseEnter"
            @mousemove="handleMouseMove($event, index)"
            @mouseleave="handleMouseLeave"
          >
            <!-- Glow effect -->
            <div class="project-glow" />
            
            <!-- Image -->
            <div 
              v-if="project.featuredImage" 
              class="project-image-container"
            >
              <NuxtImg
                :src="urlFor(project.featuredImage).width(600).height(400).url()"
                sizes="100vw md:350px lg:400px"
                width="500"
                height="300"
                :alt="project.title"
                format="webp"
                loading="eager"
                fetchpriority="high"
                class="project-image"
              />
              <div class="project-image-overlay" />
            </div>
            
            <!-- Content -->
            <div class="project-content">
              <!-- Header with title and status -->
              <div class="project-header">
                <h3 class="project-title">
                  {{ project.title }}
                </h3>
                <span
                  v-if="project.status"
                  class="project-status"
                  :class="getStatusClass(project.status)"
                >
                  {{ formatStatus(project.status) }}
                </span>
              </div>
              
              <!-- Description -->
              <p 
                v-if="project.description" 
                class="project-description"
              >
                {{ project.description }}
              </p>
              
              <!-- Tech Stack -->
              <div 
                v-if="project.techStack && project.techStack.length > 0" 
                class="project-tech-stack"
              >
                <div
                  v-for="tech in project.techStack.slice(0, 8)"
                  :key="tech._id"
                  class="project-tech-icon"
                  :title="tech.name"
                >
                  <NuxtImg
                    v-if="tech.icon"
                    :src="urlFor(tech.icon).width(24).height(24).url()"
                    :alt="`${tech.name} icon`"
                    class="w-6 h-6 object-contain opacity-70 hover:opacity-100 transition-opacity"
                    width="24"
                    height="24"
                    format="webp"
                  />
                </div>
                <span
                  v-if="project.techStack.length > 8"
                  class="project-tech-more"
                >
                  +{{ project.techStack.length - 8 }}
                </span>
              </div>
              
              <!-- Links -->
              <div class="project-links">
                <a
                  v-if="project.githubUrl"
                  :href="project.githubUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="project-link"
                  @click.stop
                >
                  GitHub →
                </a>
                <a
                  v-if="project.demoUrl"
                  :href="project.demoUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="project-link"
                  @click.stop
                >
                  Demo →
                </a>
              </div>
            </div>

            <!-- Shine effect -->
            <div class="project-shine" />
          </article>
        </div>
        
        <!-- Empty state -->
        <div v-else class="text-center py-16 animate-fade-in-up">
          <p class="text-primary/60">No projects found.</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { SanityDocument } from '@sanity/client'
import { createClient } from '@sanity/client'
import groq from 'groq'
import type { Projects, UrlBuilder } from '~/types/sanity'

interface Props {
  block: Projects
}

const props = defineProps<Props>()

const urlFor = useImageUrl()

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
    techStack[]-> {
      _id,
      name,
      icon,
      category
    },
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

// 3D tilt effect handlers
const handleMouseEnter = (event: MouseEvent) => {
  const target = event.currentTarget as HTMLElement
  if (target) {
    target.style.transition = 'transform 0.1s ease-out'
  }
}

const handleMouseMove = (event: MouseEvent, index: number) => {
  const target = event.currentTarget as HTMLElement
  if (!target) return

  const rect = target.getBoundingClientRect()
  const x = event.clientX - rect.left
  const y = event.clientY - rect.top
  
  const centerX = rect.width / 2
  const centerY = rect.height / 2
  
  const rotateX = ((y - centerY) / centerY) * -5
  const rotateY = ((x - centerX) / centerX) * 5
  
  target.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`
  
  // Update glow position
  const glow = target.querySelector('.project-glow') as HTMLElement
  if (glow) {
    const glowX = (x / rect.width) * 100
    const glowY = (y / rect.height) * 100
    glow.style.background = `radial-gradient(circle at ${glowX}% ${glowY}%, rgba(0, 102, 255, 0.3), transparent 70%)`
  }
}

const handleMouseLeave = (event: MouseEvent) => {
  const target = event.currentTarget as HTMLElement
  if (target) {
    target.style.transition = 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)'
    target.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)'
  }
}
</script>

<style scoped>
/* Fade in up animation */
@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fade-in-up 0.8s ease-out forwards;
  opacity: 0;
}

/* Project card */
.project-card {
  @apply relative cursor-pointer rounded-2xl overflow-hidden;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.9) 100%);
  border: 1px solid rgba(0, 0, 0, 0.08);
  box-shadow: 
    0 4px 16px rgba(0, 0, 0, 0.08),
    0 2px 4px rgba(0, 0, 0, 0.04);
  backdrop-filter: blur(10px);
  animation: fade-in-up 0.6s ease-out forwards;
  opacity: 0;
  transform-style: preserve-3d;
  transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);
}

.project-card:hover {
  box-shadow: 
    0 12px 32px rgba(0, 102, 255, 0.15),
    0 4px 12px rgba(0, 102, 255, 0.1);
  border-color: rgba(0, 102, 255, 0.2);
}

/* Glow effect */
.project-glow {
  @apply absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 pointer-events-none;
  z-index: 0;
}

.project-card:hover .project-glow {
  opacity: 1;
}

/* Image container */
.project-image-container {
  @apply relative aspect-video overflow-hidden bg-neutral-light;
}

.project-image {
  @apply w-full h-full object-cover transition-transform duration-500;
}

.project-card:hover .project-image {
  transform: scale(1.08);
}

.project-image-overlay {
  @apply absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent opacity-0 transition-opacity duration-300;
}

.project-card:hover .project-image-overlay {
  opacity: 1;
}

/* Content */
.project-content {
  @apply relative z-10 p-5 md:p-6 space-y-4;
}

.project-header {
  @apply flex items-start justify-between gap-3;
}

.project-title {
  @apply text-lg md:text-xl font-title font-bold text-primary flex-1 leading-tight;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  transition: color 0.3s ease;
}

.project-card:hover .project-title {
  @apply text-accent;
}

.project-status {
  @apply text-xs px-2.5 py-1 rounded-full font-medium whitespace-nowrap flex-shrink-0;
}

.project-description {
  @apply text-sm text-primary/70 line-clamp-2 leading-relaxed;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.project-tech-stack {
  @apply flex flex-wrap gap-2 items-center;
}

.project-tech-icon {
  @apply flex items-center justify-center w-6 h-6 rounded;
  transition: transform 0.2s ease;
}

.project-tech-icon:hover {
  transform: scale(1.1);
}

.project-tech-more {
  @apply text-xs text-primary/50 self-center ml-1;
}

.project-links {
  @apply flex gap-4 text-sm pt-2 border-t border-neutral-gray/30;
}

.project-link {
  @apply text-accent hover:text-accent-dark transition-all duration-200 ease-out font-medium;
}

.project-link:hover {
  transform: translateX(2px);
}

/* Shine effect */
.project-shine {
  @apply absolute inset-0 rounded-2xl opacity-0 pointer-events-none;
  background: linear-gradient(
    135deg,
    transparent 0%,
    rgba(255, 255, 255, 0.4) 50%,
    transparent 100%
  );
  transform: translateX(-100%) skewX(-20deg);
  transition: all 0.6s ease;
  z-index: 20;
}

.project-card:hover .project-shine {
  opacity: 1;
  transform: translateX(200%) skewX(-20deg);
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .project-content {
    @apply p-4;
  }
  
  .project-title {
    @apply text-base;
  }
  
  .project-description {
    @apply text-xs;
  }
  
  .project-links {
    @apply text-xs gap-3;
  }
}

/* Grid adjustments for better spacing */
@media (min-width: 1024px) {
  .grid.lg\:grid-cols-3 {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}
</style>
