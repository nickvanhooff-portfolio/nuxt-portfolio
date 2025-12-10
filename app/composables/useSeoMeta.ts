/**
 * Composable for generating comprehensive SEO meta tags
 */
export const useSeo = (options: {
  title: string
  description?: string
  image?: string
  url?: string
  type?: string
  keywords?: string[]
  siteName?: string
  locale?: string
}) => {
  const config = useRuntimeConfig()
  const route = useRoute()
  
  // Default values
  const siteName = options.siteName || 'Portfolio'
  const siteUrl = config.public.siteUrl || (process.client ? window.location.origin : '')
  const currentUrl = options.url || `${siteUrl}${route.path}`
  const locale = options.locale || 'nl_NL'
  const type = options.type || 'website'
  
  // Use featured image or OG image, fallback to default
  const ogImage = options.image || `${siteUrl}/og-default.jpg`
  const absoluteImageUrl = ogImage.startsWith('http') ? ogImage : `${siteUrl}${ogImage}`
  
  // Build meta tags
  const meta = [
    // Basic SEO
    {
      name: 'description',
      content: options.description || '',
    },
    ...(options.keywords && options.keywords.length > 0
      ? [
          {
            name: 'keywords',
            content: options.keywords.join(', '),
          },
        ]
      : []),
    
    // Open Graph
    {
      property: 'og:title',
      content: options.title,
    },
    {
      property: 'og:description',
      content: options.description || '',
    },
    {
      property: 'og:image',
      content: absoluteImageUrl,
    },
    {
      property: 'og:url',
      content: currentUrl,
    },
    {
      property: 'og:type',
      content: type,
    },
    {
      property: 'og:site_name',
      content: siteName,
    },
    {
      property: 'og:locale',
      content: locale,
    },
    
    // Twitter Card
    {
      name: 'twitter:card',
      content: 'summary_large_image',
    },
    {
      name: 'twitter:title',
      content: options.title,
    },
    {
      name: 'twitter:description',
      content: options.description || '',
    },
    {
      name: 'twitter:image',
      content: absoluteImageUrl,
    },
    
    // Additional
    {
      name: 'robots',
      content: 'index, follow',
    },
    {
      name: 'author',
      content: siteName,
    },
  ]
  
  // Canonical URL
  const link = [
    {
      rel: 'canonical',
      href: currentUrl,
    },
  ]
  
  // Use useSeoMeta (Nuxt built-in) and useHead to set the meta tags
  useSeoMeta({
    title: options.title,
    description: options.description,
    ogTitle: options.title,
    ogDescription: options.description,
    ogImage: absoluteImageUrl,
    ogUrl: currentUrl,
    ogType: type,
    ogSiteName: siteName,
    ogLocale: locale,
    twitterCard: 'summary_large_image',
    twitterTitle: options.title,
    twitterDescription: options.description,
    twitterImage: absoluteImageUrl,
    robots: 'index, follow',
    author: siteName,
    ...(options.keywords && options.keywords.length > 0 && { keywords: options.keywords.join(', ') }),
  })
  
  // Set canonical URL
  useHead({
    link,
  })
}

