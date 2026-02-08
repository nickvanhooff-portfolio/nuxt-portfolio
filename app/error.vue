<template>
  <div class="min-h-screen bg-neutral flex items-center justify-center">
    <div class="container-custom text-center space-y-8">
      <div class="space-y-4">
        <h1 class="text-6xl md:text-8xl font-bold text-primary">
          {{ error.statusCode || 404 }}
        </h1>
        <h2 class="text-2xl md:text-3xl font-title font-bold text-primary">
          {{ error.statusMessage || 'Page Not Found' }}
        </h2>
        <p class="text-body text-primary/70 max-w-md mx-auto">
          {{ error.statusCode === 404 
            ? "The page you're looking for doesn't exist or has been moved." 
            : "Something went wrong. Please try again later." }}
        </p>
      </div>
      
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <NuxtLink
          to="/"
          class="inline-flex items-center justify-center gap-2 px-6 py-3 bg-accent text-neutral rounded-lg font-semibold hover:bg-accent-dark transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          Go to Homepage
        </NuxtLink>
        <button
          @click="handleError"
          class="inline-flex items-center justify-center gap-2 px-6 py-3 bg-neutral-light text-primary rounded-lg font-semibold hover:bg-neutral-gray transition-all duration-200 border border-neutral-gray"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Try Again
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSeo } from '~/composables/useSeoMeta'

const props = defineProps<{
  error: {
    statusCode?: number
    statusMessage?: string
    message?: string
  }
}>()

const handleError = () => clearError({ redirect: '/' })

// SEO for error page
const route = useRoute()
const config = useRuntimeConfig()
const siteUrl = config.public.siteUrl || ''

useSeo({
  title: `${props.error.statusCode || 404} - ${props.error.statusMessage || 'Page Not Found'}`,
  description: props.error.statusCode === 404
    ? "The page you're looking for doesn't exist or has been moved."
    : "Something went wrong. Please try again later.",
  url: `${siteUrl}${route.path}`,
  type: 'website',
})

// Structured data for error page
useHead({
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: `${props.error.statusCode || 404} - ${props.error.statusMessage || 'Page Not Found'}`,
        description: props.error.statusCode === 404
          ? "The page you're looking for doesn't exist or has been moved."
          : "Something went wrong. Please try again later.",
        url: `${siteUrl}${route.path}`,
      }),
    },
  ],
})
</script>


