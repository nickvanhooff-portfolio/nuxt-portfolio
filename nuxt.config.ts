// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },

  modules: ['@nuxt/eslint', '@nuxt/image', '@nuxtjs/sanity', '@nuxtjs/tailwindcss', '@tresjs/nuxt', 'nuxt-keen-slider'],

  css: ['~/assets/css/main.css'],

  compatibilityDate: '2025-07-16',
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
      NUXT_PUBLIC_SANITY_PROJECT_ID: process.env.NUXT_PUBLIC_SANITY_PROJECT_ID || "i6f2j3l0",
      NUXT_PUBLIC_SANITY_DATASET: process.env.NUXT_PUBLIC_SANITY_DATASET || "production",
    },
  },
  // Disable Sanity module to avoid React runtime conflicts
  // Using direct @sanity/client instead
})