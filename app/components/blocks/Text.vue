<template>
  <section 
    class="section-spacing"
    :class="backgroundColorClass"
  >
    <div class="container-custom">
      <div 
        class="max-w-6xl mx-auto space-y-8"
        :class="textAlignmentClass"
      >
        <h2 
          v-if="block.heading" 
          class="text-section-mobile md:text-section text-primary font-title font-bold"
        >
          {{ block.heading }}
        </h2>
        
        <div 
          v-if="block.content" 
          class="sanity-content"
          :class="proseAlignmentClass"
        >
          <SanityContent :value="block.content as any" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { Text } from '~/types/sanity'

interface Props {
  block: Text
}

const props = defineProps<Props>()

const textAlignmentClass = computed(() => {
  switch (props.block.textAlignment) {
    case 'center':
      return 'text-center'
    case 'right':
      return 'text-right'
    default:
      return 'text-left'
  }
})

const proseAlignmentClass = computed(() => {
  switch (props.block.textAlignment) {
    case 'center':
      return 'mx-auto'
    case 'right':
      return 'ml-auto'
    default:
      return ''
  }
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
