import imageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'
import type { UrlBuilder } from '~/types/sanity'

// Singleton builder instance - created once and reused across all components
let builderInstance: ReturnType<typeof imageUrlBuilder> | null = null

/**
 * Composable for building Sanity image URLs
 * Uses a singleton pattern to ensure the builder is only created once,
 * even when used across multiple components
 * 
 * @returns A function that builds image URLs from Sanity image sources
 * 
 * @example
 * ```vue
 * <script setup>
 * const urlFor = useImageUrl()
 * const imageUrl = urlFor(imageAsset).width(800).height(600).url()
 * </script>
 * ```
 */
export const useImageUrl = (): UrlBuilder => {
  // Create builder only once (singleton pattern)
  if (!builderInstance) {
    const runtime = useRuntimeConfig()
    const projectId = String(runtime.public.NUXT_PUBLIC_SANITY_PROJECT_ID || '')
    const dataset = String(runtime.public.NUXT_PUBLIC_SANITY_DATASET || 'production')
    
    builderInstance = imageUrlBuilder({
      projectId,
      dataset,
    })
  }
  
  return (source: SanityImageSource) => builderInstance!.image(source)
}

