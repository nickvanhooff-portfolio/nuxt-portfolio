<template>
  <section 
    :id="$attrs.id as string || 'image'"
    class="section-spacing bg-neutral"
    :style="{ scrollMarginTop: '80px' }"
  >
    <div class="container-custom">
      <div class="max-w-6xl mx-auto">
        <div 
          class="relative"
          :class="containerAlignmentClass"
        >
        <div 
          v-if="block.image" 
          class="relative group"
          :class="imageSizeClass"
        >
          <NuxtImg
            :src="urlFor(block.image).width(1200).height(800).url()"
            :alt="block.altText || 'Image'"
            class="rounded-card shadow-card w-full h-auto object-cover transition-transform duration-300 group-hover:scale-[1.01]"
            sizes="100vw md:500px lg:600px"
            width="1200"
            height="800"
            format="webp"
          />
        </div>
        
        <p 
          v-if="block.caption" 
          class="mt-4 text-primary/60 text-center text-ui-small italic"
        >
          {{ block.caption }}
        </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { Image } from '~/types/sanity'

interface Props {
  block: Image
}

const props = defineProps<Props>()

const urlFor = useImageUrl()

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