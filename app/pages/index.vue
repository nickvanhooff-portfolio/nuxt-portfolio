<template>
  <main class="min-h-screen bg-neutral">
    <div class="container-custom section-spacing">
      <h1 class="text-section-mobile md:text-section text-primary font-title font-bold mb-12 md:mb-16">
        Pages
      </h1>
      
      <!-- Loading state -->
      <div v-if="pending" class="text-center py-16">
        <p class="text-primary/60">Loading pages...</p>
      </div>
      
      <!-- Pages grid -->
      <div 
        v-else-if="pages && pages.length > 0" 
        class="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
      >
        <article 
          v-for="page in pages" 
          :key="page._id" 
          class="bg-neutral border border-neutral-gray rounded-card p-6 md:p-8 hover:shadow-card-hover transition-all duration-300 hover:scale-[1.02]"
        >
          <nuxt-link :to="`/${page.slug.current}`" class="block space-y-4">
            <h2 class="text-xl md:text-2xl font-title font-bold text-primary">
              {{ page.title }}
            </h2>
            <p 
              v-if="page.metaDescription" 
              class="text-primary/70 text-body-mobile line-clamp-3"
            >
              {{ page.metaDescription }}
            </p>
            <div 
              v-if="page.pageBuilder && page.pageBuilder.length > 0" 
              class="text-ui-small text-primary/50"
            >
              {{ page.pageBuilder.length }} block{{ page.pageBuilder.length !== 1 ? 's' : '' }}
            </div>
          </nuxt-link>
        </article>
      </div>
      
      <!-- Error state -->
      <div v-else-if="error" class="text-center py-16">
        <p class="text-red-500 mb-4">Error loading pages:</p>
        <p class="text-ui-small text-primary/60">{{ error?.message }}</p>
      </div>
      
      <!-- No pages found -->
      <div v-else class="text-center py-16">
        <p class="text-primary/60 mb-4">No pages found.</p>
        <p class="text-ui-small text-primary/40">Create a page in Sanity Studio first.</p>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import type { SanityDocument } from '@sanity/client'
import { createClient } from '@sanity/client'
import groq from 'groq'

// Query for pages with page builder
const PAGES_QUERY = groq`*[_type == "page"]{ 
  _id, 
  title, 
  slug, 
  metaDescription,
  pageBuilder
}`

const runtime = useRuntimeConfig()
const client = createClient({
  projectId: String(runtime.public.NUXT_PUBLIC_SANITY_PROJECT_ID || ''),
  dataset: String(runtime.public.NUXT_PUBLIC_SANITY_DATASET || 'production'),
  apiVersion: '2025-07-16',
  useCdn: true
})

const { data: pages, pending, error } = await useAsyncData<SanityDocument[]>(
  'pages',
  async () => {
    try {
      console.log('Fetching pages with query:', PAGES_QUERY)
      console.log('Client config:', client.config())
      const result = await client.fetch(PAGES_QUERY)
      console.log('Pages result:', result)
      return result
    } catch (err) {
      console.error('Error fetching pages:', err)
      throw err
    }
  }
)
</script>