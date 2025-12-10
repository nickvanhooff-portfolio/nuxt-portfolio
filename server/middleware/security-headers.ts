export default defineEventHandler((event) => {
  // Security headers for Best Practices
  // Note: Some headers are also set in nuxt.config.ts routeRules for better performance
  
  // Content Security Policy (CSP)
  // Allow same-origin, Sanity CDN for images, Google Fonts, and inline scripts/styles for Nuxt
  // PostHog analytics domains are included by default
  const isDev = process.dev
  
  // PostHog domains - supports both US and EU regions
  const posthogDomains = 'https://*.posthog.com https://app.posthog.com https://us.i.posthog.com https://eu.i.posthog.com'
  
  const csp = [
    "default-src 'self'",
    // In dev, allow unsafe-inline/eval for HMR; in production, be more strict
    // PostHog scripts are allowed
    isDev 
      ? `script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.sanity.io ${posthogDomains}`
      : `script-src 'self' 'unsafe-inline' https://cdn.sanity.io ${posthogDomains}`, // Keep unsafe-inline for Nuxt
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "img-src 'self' data: https://cdn.sanity.io https://*.apicdn.sanity.io",
    "font-src 'self' https://fonts.gstatic.com data:",
    // PostHog connect-src for API calls and event tracking
    `connect-src 'self' https://cdn.sanity.io https://*.apicdn.sanity.io ${posthogDomains}`,
    "frame-ancestors 'none'", // Prevent clickjacking (redundant with X-Frame-Options but recommended)
    "base-uri 'self'",
    "form-action 'self'",
  ].join('; ')
  
  // Content Security Policy
  event.node.res.setHeader('Content-Security-Policy', csp)
})

