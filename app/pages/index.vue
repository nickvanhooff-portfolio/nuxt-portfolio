<template>
  <main id="main-content" v-if="page" class="min-h-screen bg-neutral">
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
import groq from 'groq'
import { useSeo } from '~/composables/useSeoMeta'
import { createSanityClient } from '~/utils/sanity'

// Query for home page (slug: "home")
const HOME_PAGE_QUERY = groq`*[_type == "page" && slug.current == "home"][0] {
  _id,
  title,
  slug,
  metaDescription,
  ogImage,
  keywords,
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

const client = createSanityClient()

const { data: page, pending, error } = await useAsyncData<SanityDocument>(
  'home-page',
  () => client.fetch(HOME_PAGE_QUERY)
)

// SEO metadata
const route = useRoute()
const config = useRuntimeConfig()
const siteUrl = config.public.siteUrl || (process.client ? window.location.origin : '')
const urlFor = useImageUrl()

const ogImage = page.value?.ogImage
  ? urlFor(page.value.ogImage).width(1200).height(630).url()
  : page.value?.pageBuilder?.find((b: any) => b._type === 'hero' && b.backgroundImage)
    ? urlFor(page.value.pageBuilder.find((b: any) => b._type === 'hero' && b.backgroundImage).backgroundImage).width(1200).height(630).url()
    : undefined

useSeo({
  title: page.value ? `${page.value.title} - Portfolio` : 'Portfolio',
  description: page.value?.metaDescription || 'Portfolio website showcasing projects and experience',
  image: ogImage,
  url: `${siteUrl}${route.path}`,
  keywords: page.value?.keywords || ['portfolio', 'developer', 'web development'],
})

// Structured data (JSON-LD)
useHead({
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: page.value?.title || 'Portfolio',
        description: page.value?.metaDescription || 'Portfolio website',
        url: `${siteUrl}${route.path}`,
        ...(ogImage && { image: ogImage }),
      }),
    },
  ],
})
</script>