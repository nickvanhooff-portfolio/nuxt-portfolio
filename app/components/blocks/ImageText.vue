<template>
  <section 
    :id="$attrs.id as string || 'about'"
    class="section-spacing"
    :class="backgroundColorClass"
    :style="{ scrollMarginTop: '80px' }"
  >
    <div class="container-custom">
      <div class="max-w-6xl mx-auto space-y-8 md:space-y-12">
        <!-- Content with image -->
        <div 
          class="grid gap-8 md:gap-12 items-center"
          :class="layoutClass"
        >
          <!-- Image (left or top) -->
          <div 
            v-if="block.image && (block.layout === 'image-left' || block.layout === 'image-top')"
            class="relative group"
            :class="imageContainerClass"
          >
            <div class="relative overflow-hidden rounded-card shadow-card">
              <NuxtImg
                :src="urlFor(block.image).width(800).height(800).url()"
                :alt="block.altText || 'Image'"
                class="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 400px"
                width="800"
                height="800"
                format="webp"
                loading="lazy"
              />
              <!-- Subtle overlay on hover -->
              <div class="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          </div>
          
          <!-- Text content -->
          <div 
            v-if="block.content" 
            class="sanity-content space-y-4"
            :class="textContainerClass"
          >
            <SanityContent :value="block.content as any" />
          </div>
          
          <!-- Image (right) -->
          <div 
            v-if="block.image && block.layout === 'image-right'"
            class="relative group"
            :class="imageContainerClass"
          >
            <div class="relative overflow-hidden rounded-card shadow-card">
              <NuxtImg
                :src="urlFor(block.image).width(800).height(800).url()"
                :alt="block.altText || 'Image'"
                class="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 400px"
                width="800"
                height="800"
                format="webp"
                loading="lazy"
              />
              <!-- Subtle overlay on hover -->
              <div class="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { ImageText } from '~/types/sanity'

interface Props {
  block: ImageText
}

const props = defineProps<Props>()

const urlFor = useImageUrl()

const layoutClass = computed(() => {
  switch (props.block.layout) {
    case 'image-right':
      return 'grid-cols-1 md:grid-cols-[1fr,400px]'
    case 'image-top':
      return 'grid-cols-1'
    default: // image-left
      return 'grid-cols-1 md:grid-cols-[400px,1fr]'
  }
})

const imageContainerClass = computed(() => {
  if (props.block.layout === 'image-top') {
    return 'max-w-md mx-auto'
  }
  return 'w-full'
})

const textContainerClass = computed(() => {
  // Text alignment based on layout
  if (props.block.layout === 'image-top') {
    return 'text-center max-w-3xl mx-auto'
  }
  return 'text-left'
})

const backgroundColorClass = computed(() => {
  switch (props.block.backgroundColor) {
    case 'gray':
      return 'bg-neutral-light'
    case 'primary':
      return 'bg-primary text-neutral'
    default:
      return 'bg-neutral'
  }
})
</script>

