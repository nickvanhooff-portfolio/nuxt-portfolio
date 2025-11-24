<template>
  <main class="container mx-auto min-h-screen max-w-6xl p-8">
    <h1 class="text-4xl font-bold mb-8">Pages</h1>
    
    <!-- Loading state -->
    <div v-if="!pages" class="text-center py-8">
      <p class="text-gray-500">Loading pages...</p>
    </div>
    
    <!-- Pages grid -->
    <div v-else-if="pages && pages.length > 0" class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      <article v-for="page in pages" :key="page._id" class="border rounded-lg p-6 hover:shadow-lg transition-shadow">
        <nuxt-link :to="`/${page.slug.current}`" class="block">
          <h2 class="text-xl font-semibold mb-2">{{ page.title }}</h2>
          <p v-if="page.metaDescription" class="text-gray-600 mb-4">{{ page.metaDescription }}</p>
          <div v-if="page.pageBuilder && page.pageBuilder.length > 0" class="text-sm text-gray-500">
            {{ page.pageBuilder.length }} block{{ page.pageBuilder.length !== 1 ? 's' : '' }}
          </div>
        </nuxt-link>
      </article>
    </div>
    
    <!-- Error state -->
    <div v-else-if="error" class="text-center py-8">
      <p class="text-red-500 mb-4">Error loading pages:</p>
      <p class="text-sm text-gray-600">{{ error.message }}</p>
    </div>
    
    <!-- No pages found -->
    <div v-else class="text-center py-8">
      <p class="text-gray-500 mb-4">No pages found.</p>
      <p class="text-sm text-gray-400">Create a page in Sanity Studio first.</p>
    </div>
    
    <!-- Debug info -->
    <details class="mt-8">
      <summary class="cursor-pointer text-sm text-gray-500">Debug: Pages Data</summary>
      <pre class="mt-2 text-xs bg-gray-100 p-4 rounded overflow-auto">{{ JSON.stringify(pages, null, 2) }}</pre>
    </details>
  </main>
</template>

<script setup lang="ts">
import type { SanityDocument } from '@sanity/client'
import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
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

const { data: pages, error } = await useAsyncData<SanityDocument[]>(
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

const urlFor = (source: any) =>
  source ? imageUrlBuilder({ projectId: client.config().projectId!, dataset: client.config().dataset! }).image(source) : null
</script>