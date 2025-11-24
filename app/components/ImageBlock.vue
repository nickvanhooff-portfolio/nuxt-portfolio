<template>
  <section class="py-16">
    <div class="container mx-auto px-8" :class="containerClass">
      <div v-if="block.image" class="relative">
        <img
          :src="imageUrl"
          :alt="block.altText"
          class="rounded-lg shadow-lg"
          :class="imageSizeClass"
        />
        <p v-if="block.caption" class="mt-4 text-gray-600 text-center italic">
          {{ block.caption }}
        </p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface Props {
  block: {
    image: any
    altText: string
    caption?: string
    imageSize?: 'small' | 'medium' | 'large' | 'full'
    imageAlignment?: 'left' | 'center' | 'right'
  }
  urlFor: (source: any) => any
}

const props = defineProps<Props>()

const imageUrl = computed(() => {
  if (props.block.image && props.urlFor) {
    return props.urlFor(props.block.image).width(800).height(600).url()
  }
  return ''
})

const imageSizeClass = computed(() => {
  switch (props.block.imageSize) {
    case 'small':
      return 'max-w-sm mx-auto'
    case 'large':
      return 'max-w-4xl mx-auto'
    case 'full':
      return 'w-full'
    default: // medium
      return 'max-w-2xl mx-auto'
  }
})

const containerClass = computed(() => {
  switch (props.block.imageAlignment) {
    case 'left':
      return 'flex justify-start'
    case 'right':
      return 'flex justify-end'
    default: // center
      return 'flex justify-center'
  }
})
</script>
