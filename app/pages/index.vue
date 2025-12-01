<template>
  <main v-if="page" class="min-h-screen bg-neutral">
    <!-- Page Builder Blocks -->
    <PageBuilder
      v-if="page.pageBuilder && page.pageBuilder.length > 0"
      :blocks="page.pageBuilder"
    />
    
    <!-- Fallback if no blocks -->
    <div v-else class="container-custom section-spacing">
      <h1 class="text-section-mobile md:text-section text-primary font-title font-bold mb-6">
        {{ page.title }}
      </h1>
      <p 
        v-if="page.metaDescription" 
        class="text-body text-primary/70 mb-8"
      >
        {{ page.metaDescription }}
      </p>
      <p class="text-primary/60">No content blocks added yet.</p>
    </div>
  </main>
  
  <!-- Loading state -->
  <div v-else-if="pending" class="container-custom min-h-screen flex items-center justify-center">
    <p class="text-primary/60">Loading...</p>
  </div>
  
  <!-- Error state -->
  <div v-else-if="error" class="container-custom min-h-screen flex items-center justify-center">
    <div class="text-center space-y-4">
      <p class="text-red-500 mb-4">Error loading page:</p>
      <p class="text-ui-small text-primary/60">{{ error?.message }}</p>
    </div>
  </div>
  
  <!-- No home page found -->
  <div v-else class="container-custom min-h-screen flex items-center justify-center">
    <div class="text-center space-y-6">
      <h1 class="text-section-mobile md:text-section text-primary font-title font-bold">
        Home page not found
      </h1>
      <p class="text-primary/60">
        Please create a page with slug "home" in Sanity Studio.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { SanityDocument } from '@sanity/client'
import { createClient } from '@sanity/client'
import groq from 'groq'
import PageBuilder from '~/components/PageBuilder.vue'

// Query for home page (slug: "home")
const HOME_PAGE_QUERY = groq`*[_type == "page" && slug.current == "home"][0] {
  _id,
  title,
  slug,
  metaDescription,
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
    }
  }
}`

const runtime = useRuntimeConfig()
const client = createClient({
  projectId: String(runtime.public.NUXT_PUBLIC_SANITY_PROJECT_ID || ''),
  dataset: String(runtime.public.NUXT_PUBLIC_SANITY_DATASET || 'production'),
  apiVersion: '2025-07-16',
  useCdn: true
})

const { data: page, pending, error } = await useAsyncData<SanityDocument>(
  'home-page',
  () => client.fetch(HOME_PAGE_QUERY)
)

// SEO metadata
useHead({
  title: page.value ? `${page.value.title} - Portfolio` : 'Portfolio',
  meta: [
    {
      name: 'description',
      content: page.value?.metaDescription || '',
    },
  ],
})
</script>