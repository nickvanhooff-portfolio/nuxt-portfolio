<template>
  <main v-if="project" class="min-h-screen bg-neutral">
    <div class="container-custom pt-12 pb-section">
      <!-- Back link -->
      <nuxt-link 
        to="/projects" 
        class="inline-flex items-center text-primary/60 hover:text-accent transition-all duration-200 ease-out mb-12 group"
      >
        <span class="mr-2 group-hover:-translate-x-1 transition-transform duration-200">←</span>
        <span>Back to projects</span>
      </nuxt-link>

      <!-- Featured Image -->
      <div 
        v-if="project.featuredImage" 
        class="mb-12 md:mb-16 rounded-card overflow-hidden shadow-card"
      >
        <img
          :src="urlFor(project.featuredImage).width(1200).height(675).url()"
          :alt="project.title"
          class="w-full h-auto"
        >
      </div>

      <!-- Project Header -->
      <header class="mb-12 md:mb-16 space-y-6">
        <div class="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <h1 class="text-section-mobile md:text-hero text-primary font-title font-bold">
            {{ project.title }}
          </h1>
          <span
            v-if="project.status"
            class="text-sm px-4 py-2 rounded-full font-medium self-start"
            :class="getStatusClass(project.status)"
          >
            {{ formatStatus(project.status) }}
          </span>
        </div>

        <!-- Meta information -->
        <div 
          v-if="project.startDate || project.endDate" 
          class="flex flex-wrap gap-6 text-ui text-primary/60"
        >
          <div v-if="project.startDate" class="flex items-center">
            <span class="font-medium">Start:</span>
            <span class="ml-2">{{ formatDate(project.startDate) }}</span>
          </div>
          <div v-if="project.endDate" class="flex items-center">
            <span class="font-medium">End:</span>
            <span class="ml-2">{{ formatDate(project.endDate) }}</span>
          </div>
        </div>

        <!-- Links -->
        <div class="flex flex-wrap gap-4">
          <UiButton
            v-if="project.githubUrl"
            :href="project.githubUrl"
            variant="primary"
            size="md"
          >
            View on GitHub ↗
          </UiButton>
          <UiButton
            v-if="project.demoUrl"
            :href="project.demoUrl"
            variant="outline"
            size="md"
          >
            View Demo ↗
          </UiButton>
        </div>
      </header>

      <!-- Description -->
      <div 
        v-if="project.description" 
        class="prose prose-lg mb-12 md:mb-16 max-w-none"
      >
        <p class="text-xl md:text-2xl text-primary/80 leading-relaxed">
          {{ project.description }}
        </p>
      </div>

      <!-- Tech Stack -->
      <div 
        v-if="project.techStack && project.techStack.length > 0" 
        class="mb-12 md:mb-16"
      >
        <h2 class="text-section-mobile md:text-section text-primary font-title font-bold mb-6">
          Tech Stack
        </h2>
        <div class="flex flex-wrap gap-3">
          <UiTechBadge
            v-for="tech in project.techStack"
            :key="tech"
            :label="tech"
            variant="accent"
          />
        </div>
      </div>

      <!-- Page Builder Content -->
      <div 
        v-if="project.pageBuilder && project.pageBuilder.length > 0" 
        class="mb-12 md:mb-16"
      >
        <AppPageBuilder :blocks="project.pageBuilder" :url-for="urlFor" />
      </div>

      <!-- Legacy Content (fallback if pageBuilder is not used) -->
      <div 
        v-else-if="project.content && project.content.length > 0" 
        class="prose prose-lg max-w-none mb-12 md:mb-16"
      >
        <UiSanityContent :blocks="project.content" :url-for="urlFor" />
      </div>

      <!-- Additional Images -->
      <div 
        v-if="project.images && project.images.length > 0" 
        class="grid gap-6 md:gap-8 md:grid-cols-2 mb-12 md:mb-16"
      >
        <div
          v-for="(image, index) in project.images"
          :key="index"
          class="rounded-card overflow-hidden shadow-card group"
        >
          <img
            :src="urlFor(image).width(800).height(600).url()"
            :alt="`${project.title} - Image ${index + 1}`"
            class="w-full h-auto transition-transform duration-300 group-hover:scale-[1.02]"
          >
        </div>
      </div>

      <!-- Tags -->
      <div 
        v-if="project.tags && project.tags.length > 0" 
        class="flex flex-wrap gap-3 pt-8 border-t border-neutral-gray"
      >
        <span
          v-for="tag in project.tags"
          :key="tag"
          class="px-4 py-2 bg-neutral-light text-primary rounded-full text-ui-small"
        >
          #{{ tag }}
        </span>
      </div>
    </div>
  </main>

  <!-- 404 if project not found -->
  <div v-else class="container-custom min-h-screen flex items-center justify-center">
    <div class="text-center space-y-6">
      <h1 class="text-section-mobile md:text-section text-primary font-title font-bold">
        Project not found
      </h1>
      <nuxt-link 
        to="/" 
        class="inline-block text-accent hover:text-accent-dark transition-all duration-200 ease-out"
      >
        ← Back to home
      </nuxt-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { SanityDocument } from '@sanity/client'
import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'
import groq from 'groq'
import UiSanityContent from '~/components/ui/SanityContent.vue'
import UiButton from '~/components/ui/Button.vue'
import UiTechBadge from '~/components/ui/TechBadge.vue'
import AppPageBuilder from '~/components/PageBuilder.vue'

const PROJECT_QUERY = groq`*[_type == "project" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  description,
  featuredImage,
  images,
  techStack,
  githubUrl,
  demoUrl,
  startDate,
  endDate,
  status,
  tags,
  content,
  pageBuilder
}`

const { params } = useRoute()

const runtime = useRuntimeConfig()
const client = createClient({
  projectId: String(runtime.public.NUXT_PUBLIC_SANITY_PROJECT_ID || ''),
  dataset: String(runtime.public.NUXT_PUBLIC_SANITY_DATASET || 'production'),
  apiVersion: '2025-07-16',
  useCdn: true
})

const { data: project } = await useAsyncData<SanityDocument>(
  () => `project-${params.slug}`,
  () => client.fetch(PROJECT_QUERY, params)
)

// SEO metadata
useHead({
  title: project.value ? `${project.value.title} - Portfolio` : 'Project Not Found',
  meta: [
    {
      name: 'description',
      content: project.value?.description || 'Project details',
    },
  ],
})

const urlFor = (source: SanityImageSource) =>
  imageUrlBuilder({ projectId: client.config().projectId!, dataset: client.config().dataset! }).image(source)

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

const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}
</script>

<style scoped>
.prose {
  @apply text-body-mobile md:text-body leading-relaxed text-primary/90;
}

.prose :deep(h1), 
.prose :deep(h2), 
.prose :deep(h3), 
.prose :deep(h4), 
.prose :deep(h5), 
.prose :deep(h6) {
  @apply text-primary font-title font-bold mb-4 mt-8;
}

.prose :deep(h1) {
  @apply text-3xl md:text-4xl;
}

.prose :deep(h2) {
  @apply text-2xl md:text-3xl;
}

.prose :deep(h3) {
  @apply text-xl md:text-2xl;
}

.prose :deep(p) {
  @apply mb-6;
}

.prose :deep(ul), 
.prose :deep(ol) {
  @apply mb-6 pl-6 space-y-2;
}

.prose :deep(li) {
  @apply mb-2;
}

.prose :deep(a) {
  @apply text-accent hover:text-accent-dark underline transition-all duration-200 ease-out;
}

.prose :deep(strong) {
  @apply font-semibold;
}

.prose :deep(em) {
  @apply italic;
}

.prose :deep(blockquote) {
  @apply border-l-4 border-accent pl-6 italic my-6 text-primary/80;
}

.prose :deep(code) {
  @apply bg-neutral-light px-2 py-1 rounded text-sm font-mono;
}

.prose :deep(pre) {
  @apply bg-primary text-neutral p-4 rounded-card overflow-x-auto my-6;
}

.prose :deep(pre code) {
  @apply bg-transparent p-0;
}
</style>