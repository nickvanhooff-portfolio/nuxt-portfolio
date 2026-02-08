import { createClient } from '@sanity/client'
import groq from 'groq'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const siteUrl = config.public.siteUrl || 'https://nickvanhooff.com'
  
  // Initialize Sanity client
  const client = createClient({
    projectId: String(config.public.NUXT_PUBLIC_SANITY_PROJECT_ID || ''),
    dataset: String(config.public.NUXT_PUBLIC_SANITY_DATASET || 'production'),
    apiVersion: '2025-07-16',
    useCdn: true
  })
  
  try {
    // Fetch all pages
    const pagesQuery = groq`*[_type == "page" && defined(slug.current)] {
      "slug": slug.current,
      _updatedAt
    }`
    const pages = await client.fetch(pagesQuery)
    
    // Fetch all projects
    const projectsQuery = groq`*[_type == "project" && defined(slug.current)] {
      "slug": slug.current,
      _updatedAt
    }`
    const projects = await client.fetch(projectsQuery)
    
    // Build sitemap XML
    const urls: string[] = []
    
    // Home page
    urls.push(`  <url>
    <loc>${siteUrl}/</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>`)
    
    // Projects index
    urls.push(`  <url>
    <loc>${siteUrl}/projects</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`)
    
    // All pages
    pages.forEach((page: { slug: string; _updatedAt: string }) => {
      if (page.slug !== 'home') { // Skip home as it's already added
        const lastmod = page._updatedAt ? new Date(page._updatedAt).toISOString() : new Date().toISOString()
        urls.push(`  <url>
    <loc>${siteUrl}/${page.slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`)
      }
    })
    
    // All projects
    projects.forEach((project: { slug: string; _updatedAt: string }) => {
      const lastmod = project._updatedAt ? new Date(project._updatedAt).toISOString() : new Date().toISOString()
      urls.push(`  <url>
    <loc>${siteUrl}/projects/${project.slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`)
    })
    
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>`
    
    event.node.res.setHeader('Content-Type', 'application/xml')
    event.node.res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=3600') // Cache for 1 hour
    return sitemap
  } catch (error) {
    // Fallback to basic sitemap if Sanity fetch fails
    console.error('Error generating sitemap:', error)
    const fallbackSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${siteUrl}/</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>`
    event.node.res.setHeader('Content-Type', 'application/xml')
    return fallbackSitemap
  }
})

