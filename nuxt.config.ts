// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },

  modules: [
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxtjs/sanity',
    '@nuxtjs/tailwindcss'
  ],

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
    public: {
      NUXT_PUBLIC_SANITY_PROJECT_ID: process.env.NUXT_PUBLIC_SANITY_PROJECT_ID || "i6f2j3l0",
      NUXT_PUBLIC_SANITY_DATASET: process.env.NUXT_PUBLIC_SANITY_DATASET || "production",
    },
  },
  // Disable Sanity module to avoid React runtime conflicts
  // Using direct @sanity/client instead
})