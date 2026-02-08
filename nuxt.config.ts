// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: {
    enabled: process.dev,
    timeline: {
      enabled: true
    }
  },

  modules: [
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxtjs/sanity',
    '@nuxtjs/tailwindcss',
    '@tresjs/nuxt',
    '@nuxt/hints',
    'nuxt-security'
  ],

  css: ['~/assets/css/main.css'],

  compatibilityDate: '2025-07-16',
  
  // SSR is enabled by default in Nuxt 4, but explicitly set for clarity
  ssr: true,
  
  // HTML attributes - set lang attribute for accessibility
  app: {
    head: {
      htmlAttrs: {
        lang: 'nl',
      },
      // Default meta tags for SEO
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'format-detection', content: 'telephone=no' },
        { name: 'theme-color', content: '#000000' }, // Update with your brand color
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' }, // Add this icon
      ],
    },
  },
  
  // Security configuration via nuxt-security module
  // Most headers are enabled by default, only CSP needs custom configuration
  security: {
    headers: {
      // Content Security Policy - only configure what you actually use
      contentSecurityPolicy: {
        'default-src': ["'self'"],
        'script-src': [
          "'self'",
          "'unsafe-inline'", // Required for Nuxt
          ...(process.dev ? ["'unsafe-eval'"] : []), // Only in dev for HMR
          'https://cdn.sanity.io', // Sanity CDN
        ],
        'style-src': [
          "'self'",
          "'unsafe-inline'", // Required for Nuxt
          'https://fonts.googleapis.com', // Google Fonts
        ],
        'img-src': [
          "'self'",
          'data:',
          'https://cdn.sanity.io', // Sanity CDN (handles both cdn.sanity.io and *.apicdn.sanity.io)
        ],
        'font-src': [
          "'self'",
          'https://fonts.gstatic.com', // Google Fonts
          'data:',
        ],
        'connect-src': [
          "'self'",
          'https://cdn.sanity.io', // Sanity CDN
          'https://*.apicdn.sanity.io', // Sanity API (project-specific subdomain)
        ],
      },
    },
  },

  // Performance optimizations
  nitro: {
    // Enable compression (gzip/brotli) for production
    compressPublicAssets: true,
    // Minify HTML output
    minify: true,
  },
  
  // Image optimization
  image: {
    // Use Sanity as image provider
    providers: {
      sanity: {},
    },
    // Quality settings - lower default for better performance
    quality: 75,
    // Format optimization - prefer webp and avif
    format: ['webp', 'avif'],
    // Screen densities to generate
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536,
    },
  },
  
  // Tailwind CSS optimization
  tailwindcss: {
    // Enable JIT mode for smaller CSS output
    exposeConfig: false,
    // Viewer is not needed in production
    viewer: false,
  },
  
  sanity: {
    projectId: process.env.NUXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NUXT_PUBLIC_SANITY_DATASET || 'production',
    // visualEditing: { enabled: false },
    // liveContent: { enabled: false },
    // stega: { enabled: false }
  },
  runtimeConfig: {
    // Server-side only (not exposed to client)
    SANITY_WRITE_TOKEN: process.env.SANITY_WRITE_TOKEN,
    // Email configuration (optional)
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    NOTIFICATION_EMAIL: process.env.NOTIFICATION_EMAIL,
    EMAIL_FROM: process.env.EMAIL_FROM || 'contact@nickvanhooff.com',
    public: {
      NUXT_PUBLIC_SANITY_PROJECT_ID: process.env.NUXT_PUBLIC_SANITY_PROJECT_ID,
      NUXT_PUBLIC_SANITY_DATASET: process.env.NUXT_PUBLIC_SANITY_DATASET || "production",
      // Site URL for SEO (canonical URLs, Open Graph, etc.)
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://www.nickvanhooff.com',
    },
  },
  // Disable Sanity module to avoid React runtime conflicts
  // Using direct @sanity/client instead
})