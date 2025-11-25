<template>
  <section class="section-spacing bg-neutral">
    <div class="container-custom">
      <div 
        class="relative"
        :class="containerAlignmentClass"
      >
        <div 
          v-if="block.image" 
          class="relative group"
          :class="imageSizeClass"
        >
          <img
            :src="imageUrl"
            :alt="block.altText || 'Image'"
            class="rounded-card shadow-card w-full h-auto object-cover transition-transform duration-300 group-hover:scale-[1.01]"
          >
        </div>
        
        <p 
          v-if="block.caption" 
          class="mt-4 text-primary/60 text-center text-ui-small italic"
        >
          {{ block.caption }}
        </p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { ImageBlock, UrlBuilder } from '~/types/sanity'

interface Props {
  block: ImageBlock
  urlFor: UrlBuilder
}

const props = defineProps<Props>()

const imageUrl = computed(() => {
  if (props.block.image && props.urlFor) {
    return props.urlFor(props.block.image).width(1200).height(800).url()
  }
  return ''
})

const imageSizeClass = computed(() => {
  switch (props.block.imageSize) {
    case 'small':
      return 'max-w-md mx-auto'
    case 'large':
      return 'max-w-5xl mx-auto'
    case 'full':
      return 'w-full'
    default: // medium
      return 'max-w-3xl mx-auto'
  }
})

const containerAlignmentClass = computed(() => {
  switch (props.block.imageAlignment) {
    case 'left':
      return 'flex flex-col items-start'
    case 'right':
      return 'flex flex-col items-end ml-auto'
    default: // center
      return 'flex flex-col items-center'
  }
})
</script>