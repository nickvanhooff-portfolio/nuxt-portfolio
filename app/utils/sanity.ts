import { createClient } from '@sanity/client'
import type { SanityClient } from '@sanity/client'

/**
 * Sanity API version - update this when Sanity releases a new API version
 * See: https://www.sanity.io/docs/api-versioning
 */
export const SANITY_API_VERSION = '2025-07-16'

/**
 * Creates a read-only Sanity client (uses CDN for better performance)
 * Use this for fetching data in pages/components
 */
export function createSanityClient(): SanityClient {
  const runtime = useRuntimeConfig()
  
  const projectId = runtime.public.NUXT_PUBLIC_SANITY_PROJECT_ID
  const dataset = runtime.public.NUXT_PUBLIC_SANITY_DATASET || 'production'

  if (!projectId) {
    throw new Error('NUXT_PUBLIC_SANITY_PROJECT_ID is not configured')
  }

  return createClient({
    projectId: String(projectId),
    dataset: String(dataset),
    apiVersion: SANITY_API_VERSION,
    useCdn: true, // Use CDN for reads (faster, cached)
  })
}

/**
 * Creates a write-enabled Sanity client (no CDN for writes)
 * Use this for server-side operations that need to write data
 */
export function createSanityWriteClient(): SanityClient {
  const runtime = useRuntimeConfig()
  
  const projectId = runtime.public.NUXT_PUBLIC_SANITY_PROJECT_ID
  const dataset = runtime.public.NUXT_PUBLIC_SANITY_DATASET || 'production'
  const token = runtime.SANITY_WRITE_TOKEN

  if (!projectId) {
    throw new Error('NUXT_PUBLIC_SANITY_PROJECT_ID is not configured')
  }

  if (!token) {
    throw new Error('SANITY_WRITE_TOKEN is not configured')
  }

  return createClient({
    projectId: String(projectId),
    dataset: String(dataset),
    apiVersion: SANITY_API_VERSION,
    token: String(token),
    useCdn: false, // Don't use CDN for writes
  })
}

