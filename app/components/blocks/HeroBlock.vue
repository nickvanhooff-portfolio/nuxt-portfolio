<template>
  <section 
    class="relative min-h-screen flex items-center justify-center bg-primary"
  >
    <!-- Optional background image -->
    <div 
      v-if="block.backgroundImage && urlFor" 
      class="absolute inset-0 z-0"
    >
      <img
        :src="urlFor(block.backgroundImage).width(1920).height(1080).url()"
        :alt="block.heading || 'Hero background'"
        class="w-full h-full object-cover opacity-20"
      >
    </div>
    
    <!-- Content -->
    <div class="container-custom relative z-10 text-center">
      <div class="max-w-6xl mx-auto space-y-8">
        <h1 
          class="text-hero-mobile md:text-hero text-neutral font-title font-bold animate-fade-in"
        >
          {{ block.heading }}
        </h1>
        
        <p 
          v-if="block.subheading" 
          class="text-xl md:text-2xl text-neutral/90 max-w-2xl mx-auto leading-relaxed animate-fade-in-delay"
        >
          {{ block.subheading }}
        </p>
        
        <div 
          v-if="block.ctaButton?.text && block.ctaButton?.url" 
          class="pt-4 animate-fade-in-delay-2"
        >
          <UiButton
            :href="block.ctaButton.url"
            size="lg"
          >
            {{ block.ctaButton.text }}
          </UiButton>
        </div>
      </div>
    </div>
    
    <!-- Subtle gradient overlay for better text readability -->
    <div class="absolute inset-0 bg-gradient-to-b from-primary/40 to-primary/80 z-[1]" />
  </section>
</template>

<script setup lang="ts">
import type { HeroBlock, UrlBuilder } from '~/types/sanity'
import UiButton from '~/components/ui/Button.vue'

interface Props {
  block: HeroBlock
  urlFor: UrlBuilder
}

defineProps<Props>()
</script>

<style scoped>
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 0.6s ease-out forwards;
}

.animate-fade-in-delay {
  animation: fade-in 0.6s ease-out 0.2s forwards;
  opacity: 0;
}

.animate-fade-in-delay-2 {
  animation: fade-in 0.6s ease-out 0.4s forwards;
  opacity: 0;
}
</style>