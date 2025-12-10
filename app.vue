<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
// Font loading optimization - load fonts asynchronously
useHead({
  link: [
    // Google Fonts - preconnect for faster DNS resolution
    {
      rel: 'preconnect',
      href: 'https://fonts.googleapis.com',
    },
    {
      rel: 'preconnect',
      href: 'https://fonts.gstatic.com',
      crossorigin: '',
    },
    // Load fonts with display=swap (already in URL) for better FCP
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap',
      // Load fonts asynchronously to prevent render blocking
      media: 'print',
    },
    // Sanity CDN - preconnect for faster image loading
    {
      rel: 'preconnect',
      href: 'https://cdn.sanity.io',
      crossorigin: 'anonymous',
    },
    {
      rel: 'dns-prefetch',
      href: 'https://cdn.sanity.io',
    },
  ],
  script: [
    {
      children: `
        // Async font loading - change media from 'print' to 'all' when loaded
        const fontLink = document.querySelector('link[href*="fonts.googleapis.com"]');
        if (fontLink) {
          fontLink.onload = function() {
            this.media = 'all';
          };
          // Fallback for browsers that don't fire onload
          setTimeout(function() {
            if (fontLink.media === 'print') {
              fontLink.media = 'all';
            }
          }, 100);
        }
      `,
      type: 'text/javascript',
    },
  ],
})
</script>

