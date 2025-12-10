<template>
  <main v-if="project" class="min-h-screen bg-neutral">
    <!-- Hero Section with Featured Image -->
    <section class="relative">
      <!-- Featured Image -->
      <div 
        v-if="project.featuredImage" 
        class="relative w-full h-[50vh] min-h-[400px] max-h-[600px] overflow-hidden"
      >
        <NuxtImg
          :src="urlFor(project.featuredImage).width(1920).height(1080).url()"
          :alt="project.title"
          class="w-full h-full object-cover"
          sizes="100vw"
          width="1920"
          height="1080"
          format="webp"
          loading="eager"
          fetchpriority="high"
        />
        <div class="absolute inset-0 bg-gradient-to-b from-transparent via-primary/20 to-primary/80" />
      </div>

      <!-- Project Header Overlay -->
      <div class="container-content relative -mt-32 md:-mt-48 z-10">
        <div class="bg-neutral rounded-2xl shadow-2xl p-8 md:p-12 border border-neutral-gray">
          <!-- Back link -->
          <NuxtLink
            to="/projects" 
            class="inline-flex items-center gap-2 text-primary/60 hover:text-accent transition-colors mb-8 group"
          >
            <svg class="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
            <span class="font-medium">Back to projects</span>
          </NuxtLink>

          <!-- Title and Status -->
          <div class="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-8">
            <div class="flex-1">
              <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-4 leading-tight">
                {{ project.title }}
              </h1>
              <p 
                v-if="project.description" 
                class="text-xl text-primary/80 leading-relaxed max-w-3xl"
              >
                {{ project.description }}
              </p>
            </div>
            <div class="flex flex-col gap-3">
              <span
                v-if="project.status"
                class="inline-flex items-center justify-center px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap"
                :class="getStatusClass(project.status)"
              >
                {{ formatStatus(project.status) }}
              </span>
              <!-- Date Range -->
              <div 
                v-if="project.startDate || project.endDate" 
                class="flex flex-col gap-2 text-sm text-primary/60"
              >
                <div v-if="project.startDate" class="flex items-center gap-2">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>{{ formatDate(project.startDate) }}</span>
                </div>
                <div v-if="project.endDate" class="flex items-center gap-2">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{{ formatDate(project.endDate) }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="flex flex-wrap gap-4 pb-8 border-b border-neutral-gray">
            <a
              v-if="project.githubUrl"
              :href="project.githubUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 px-6 py-3 bg-primary text-neutral rounded-lg font-semibold hover:bg-primary/90 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              View on GitHub
            </a>
            <a
              v-if="project.demoUrl"
              :href="project.demoUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 px-6 py-3 bg-accent text-neutral rounded-lg font-semibold hover:bg-accent-dark transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              View Live Demo
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- Main Content -->
    <div class="container-content py-16 space-y-16">
      <!-- Tech Stack -->
      <section 
        v-if="project.techStack && project.techStack.length > 0"
        class="space-y-6"
      >
        <h2 class="text-3xl md:text-4xl font-bold text-primary">
          Technologies Used
        </h2>
        <div class="flex flex-wrap gap-3">
          <a
            v-for="tech in project.techStack"
            :key="tech._id"
            :href="tech.url || '#'"
            :target="tech.url ? '_blank' : undefined"
            :rel="tech.url ? 'noopener noreferrer' : undefined"
            class="inline-flex items-center gap-2 px-5 py-2.5 bg-neutral-light text-primary rounded-lg text-sm font-medium border border-neutral-gray hover:bg-neutral-gray transition-colors duration-200"
            :class="tech.url ? 'hover:border-accent cursor-pointer' : 'cursor-default'"
          >
            <NuxtImg
              v-if="tech.icon"
              :src="urlFor(tech.icon).width(20).height(20).url()"
              :alt="`${tech.name} icon`"
              class="w-5 h-5 object-contain"
              width="20"
              height="20"
            />
            <span>{{ tech.name }}</span>
          </a>
        </div>
      </section>

      <!-- Page Builder Content -->
      <section 
        v-if="project.pageBuilder && project.pageBuilder.length > 0"
      >
        <PageBuilder :blocks="project.pageBuilder" />
      </section>

      <!-- Legacy Content (fallback) -->
      <section 
        v-else-if="project.content && project.content.length > 0"
        class="space-y-6"
      >
        <div class="sanity-content">
          <SanityContent :value="project.content as any" />
        </div>
      </section>

      <!-- Additional Images Gallery -->
      <section 
        v-if="project.images && project.images.length > 0"
        class="space-y-6"
      >
        <h2 class="text-3xl md:text-4xl font-bold text-primary">
          Project Gallery
        </h2>
        <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div
            v-for="(imageItem, index) in project.images"
            :key="index"
            class="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
          >
            <NuxtImg
              v-if="imageItem.image"
              :src="urlFor(imageItem.image).width(800).height(600).url()"
              :alt="imageItem.altText || `${project.title} - Image ${index + 1}`"
              class="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-110"
              sizes="100vw md:400px"
              width="500"
              height="300"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div class="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <p class="text-sm font-semibold">{{ imageItem.altText || `Image ${index + 1}` }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Tags -->
      <section 
        v-if="project.tags && project.tags.length > 0"
        class="pt-8 border-t border-neutral-gray"
      >
        <div class="flex flex-wrap gap-2">
          <span
            v-for="tag in project.tags"
            :key="tag"
            class="px-3 py-1.5 bg-neutral-light text-primary rounded-full text-sm font-medium"
          >
            #{{ tag }}
          </span>
        </div>
      </section>
    </div>
  </main>

  <!-- 404 if project not found -->
  <div v-else class="container-content min-h-screen flex items-center justify-center">
    <div class="text-center space-y-6">
      <h1 class="text-4xl md:text-5xl font-bold text-primary">
        Project not found
      </h1>
      <p class="text-xl text-primary/60">
        The project you're looking for doesn't exist.
      </p>
      <nuxt-link 
        to="/projects" 
        class="inline-flex items-center gap-2 px-6 py-3 bg-accent text-neutral rounded-lg font-semibold hover:bg-accent-dark transition-all duration-200"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
        Back to projects
      </nuxt-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { SanityDocument } from '@sanity/client'
import { createClient } from '@sanity/client'
import groq from 'groq'
import PageBuilder from '~/components/PageBuilder.vue'
import { useSeo } from '~/composables/useSeoMeta'

const PROJECT_QUERY = groq`*[_type == "project" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  description,
  featuredImage,
  ogImage,
  keywords,
  images[] {
    image,
    altText
  },
  techStack[]-> {
    _id,
    name,
    icon,
    category,
    url
  },
  githubUrl,
  demoUrl,
  startDate,
  endDate,
  status,
  tags,
  content,
  pageBuilder[] {
    ...,
    _type == "techStack" => {
      ...,
      techItems[]-> {
        _id,
        name,
        icon,
        category,
        url
      }
    },
    _type == "experience" => {
      _type,
      _key,
      title,
      description,
      layout,
      backgroundColor,
      experiences[] {
        _key,
        title,
        company,
        description,
        startDate,
        endDate,
        isCurrent
      }
    }
  }
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
const route = useRoute()
const config = useRuntimeConfig()
const siteUrl = config.public.siteUrl || (process.client ? window.location.origin : '')
const urlFor = useImageUrl()

const ogImage = project.value?.ogImage
  ? urlFor(project.value.ogImage).width(1200).height(630).url()
  : project.value?.featuredImage
    ? urlFor(project.value.featuredImage).width(1200).height(630).url()
    : undefined

useSeo({
  title: project.value ? `${project.value.title} - Portfolio` : 'Project Not Found',
  description: project.value?.description || 'Project details',
  image: ogImage,
  url: `${siteUrl}${route.path}`,
  type: 'article',
  keywords: project.value?.keywords || project.value?.tags,
})

// Structured data (JSON-LD) for Project
useHead({
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'CreativeWork',
        name: project.value?.title,
        description: project.value?.description,
        url: `${siteUrl}${route.path}`,
        ...(ogImage && { image: ogImage }),
        ...(project.value?.githubUrl && { codeRepository: project.value.githubUrl }),
        ...(project.value?.demoUrl && { url: project.value.demoUrl }),
        ...(project.value?.startDate && { dateCreated: project.value.startDate }),
        ...(project.value?.endDate && { datePublished: project.value.endDate }),
      }),
    },
  ],
})

const formatStatus = (status: string): string => {
  return status
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

const getStatusClass = (status: string): string => {
  switch (status) {
    case 'completed':
      return 'bg-green-100 text-green-800 border border-green-200'
    case 'in-progress':
      return 'bg-blue-100 text-blue-800 border border-blue-200'
    case 'school-project':
      return 'bg-purple-100 text-purple-800 border border-purple-200'
    case 'archived':
      return 'bg-neutral-light text-primary border border-neutral-gray'
    default:
      return 'bg-neutral-light text-primary border border-neutral-gray'
  }
}

const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}
</script>

