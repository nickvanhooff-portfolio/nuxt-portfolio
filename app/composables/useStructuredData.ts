/**
 * Composable for generating structured data (JSON-LD) for SEO
 */

interface PersonSchemaOptions {
  name: string
  jobTitle?: string
  url?: string
  image?: string
  sameAs?: string[] // Social media profiles
  email?: string
}

interface BreadcrumbItem {
  name: string
  url: string
}

/**
 * Generate Person schema for portfolio owner
 */
export const usePersonSchema = (options: PersonSchemaOptions) => {
  const config = useRuntimeConfig()
  const siteUrl = config.public.siteUrl || ''
  
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: options.name,
    ...(options.jobTitle && { jobTitle: options.jobTitle }),
    ...(options.url && { url: options.url }),
    ...(options.image && { 
      image: options.image.startsWith('http') 
        ? options.image 
        : `${siteUrl}${options.image.startsWith('/') ? options.image : '/' + options.image}`
    }),
    ...(options.sameAs && options.sameAs.length > 0 && { sameAs: options.sameAs }),
    ...(options.email && { email: options.email }),
  }
}

/**
 * Generate BreadcrumbList schema
 */
export const useBreadcrumbSchema = (items: BreadcrumbItem[]) => {
  const config = useRuntimeConfig()
  const siteUrl = config.public.siteUrl || ''
  
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${siteUrl}${item.url.startsWith('/') ? item.url : '/' + item.url}`,
    })),
  }
}

/**
 * Generate Organization schema
 */
export const useOrganizationSchema = (options: {
  name: string
  url: string
  logo?: string
  description?: string
  sameAs?: string[]
}) => {
  const config = useRuntimeConfig()
  const siteUrl = config.public.siteUrl || ''
  
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: options.name,
    url: options.url.startsWith('http') ? options.url : `${siteUrl}${options.url.startsWith('/') ? options.url : '/' + options.url}`,
    ...(options.logo && {
      logo: options.logo.startsWith('http')
        ? options.logo
        : `${siteUrl}${options.logo.startsWith('/') ? options.logo : '/' + options.logo}`
    }),
    ...(options.description && { description: options.description }),
    ...(options.sameAs && options.sameAs.length > 0 && { sameAs: options.sameAs }),
  }
}


