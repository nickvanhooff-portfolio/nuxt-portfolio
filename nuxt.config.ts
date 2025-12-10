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
    'nuxt-keen-slider',
    '@nuxt/hints'
  ],

  css: ['~/assets/css/main.css'],

  compatibilityDate: '2025-07-16',
  
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
    // Quality settings
    quality: 80,
    // Format optimization
    format: ['webp', 'avif'],
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
    EMAIL_FROM: process.env.EMAIL_FROM || 'Portfolio Contact <noreply@yourdomain.com>',
    public: {
      NUXT_PUBLIC_SANITY_PROJECT_ID: process.env.NUXT_PUBLIC_SANITY_PROJECT_ID,
      NUXT_PUBLIC_SANITY_DATASET: process.env.NUXT_PUBLIC_SANITY_DATASET || "production",
    },
  },
  // Disable Sanity module to avoid React runtime conflicts
  // Using direct @sanity/client instead
})