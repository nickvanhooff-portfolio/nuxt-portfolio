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
  
  <!-- 404 if page not found -->
  <div v-else class="container-custom min-h-screen flex items-center justify-center">
    <div class="text-center space-y-6">
      <h1 class="text-section-mobile md:text-section text-primary font-title font-bold">
        Page not found
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
import groq from 'groq'

const PAGE_QUERY = groq`*[_type == "page" && slug.current == $slug][0]`
const { params } = useRoute()

const runtime = useRuntimeConfig()
const client = createClient({
  projectId: String(runtime.public.NUXT_PUBLIC_SANITY_PROJECT_ID || ''),
  dataset: String(runtime.public.NUXT_PUBLIC_SANITY_DATASET || 'production'),
  apiVersion: '2025-07-16',
  useCdn: true
})

const { data: page } = await useAsyncData<SanityDocument>(
  () => `page-${params.slug}`,
  () => client.fetch(PAGE_QUERY, params)
)

// SEO metadata
useHead({
  title: page.value ? `${page.value.title} - Portfolio` : 'Page Not Found',
  meta: [
    {
      name: 'description',
      content: page.value?.metaDescription || '',
    },
  ],
})

</script>