<template>
  <main v-if="page" class="min-h-screen">
    <a href="/" class="block p-8 hover:underline">&larr; Back to pages</a>
    
    <!-- Page Builder Blocks -->
    <div v-if="page.pageBuilder && page.pageBuilder.length > 0">
      <component
        v-for="block in page.pageBuilder"
        :key="block._key"
        :is="renderBlock(block)"
        :block="block"
        :url-for="urlFor"
      />
    </div>
    
    <!-- Fallback if no blocks -->
    <div v-else class="container mx-auto max-w-3xl p-8">
      <h1 class="text-4xl font-bold mb-8">{{ page.title }}</h1>
      <p v-if="page.metaDescription" class="text-lg text-gray-600">{{ page.metaDescription }}</p>
      <p class="mt-4 text-gray-500">No content blocks added yet.</p>
    </div>
  </main>
  
  <!-- 404 if page not found -->
  <div v-else class="container mx-auto max-w-3xl p-8">
    <h1 class="text-4xl font-bold mb-8">Page not found</h1>
    <a href="/" class="hover:underline">&larr; Back to pages</a>
  </div>
</template>

<script setup lang="ts">
import type { SanityDocument } from '@sanity/client'
import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'
import groq from 'groq'
import HeroBlock from '~/components/HeroBlock.vue'
import TextBlock from '~/components/TextBlock.vue'
import ImageBlock from '~/components/ImageBlock.vue'
import UnknownBlock from '~/components/UnknownBlock.vue'

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

const urlFor = (source: SanityImageSource) =>
  imageUrlBuilder({ projectId: client.config().projectId!, dataset: client.config().dataset! }).image(source)

// Block component mapping
const renderBlock = (block: any) => {
  switch (block._type) {
    case 'heroBlock':
      return HeroBlock
    case 'textBlock':
      return TextBlock
    case 'imageBlock':
      return ImageBlock
    default:
      return UnknownBlock
  }
}
</script>