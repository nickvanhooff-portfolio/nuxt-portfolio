<template>
  <section 
    class="section-spacing"
    :class="backgroundColorClass"
  >
    <div class="container-custom">
      <div 
        class="max-w-4xl mx-auto space-y-8"
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
          class="prose prose-lg max-w-none text-primary/90"
          :class="proseAlignmentClass"
        >
          <UiSanityContent :blocks="block.content" :url-for="urlFor" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { TextBlock, UrlBuilder } from '~/types/sanity'
import UiSanityContent from '~/components/ui/SanityContent.vue'

interface Props {
  block: TextBlock
  urlFor: UrlBuilder
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

<style scoped>
.prose {
  @apply text-body-mobile md:text-body leading-relaxed;
}

.prose :deep(h1), 
.prose :deep(h2), 
.prose :deep(h3), 
.prose :deep(h4), 
.prose :deep(h5), 
.prose :deep(h6) {
  @apply text-primary font-title font-bold mb-4 mt-8;
}

.prose :deep(h1) {
  @apply text-3xl md:text-4xl;
}

.prose :deep(h2) {
  @apply text-2xl md:text-3xl;
}

.prose :deep(h3) {
  @apply text-xl md:text-2xl;
}

.prose :deep(p) {
  @apply mb-6;
}

.prose :deep(ul), 
.prose :deep(ol) {
  @apply mb-6 pl-6 space-y-2;
}

.prose :deep(li) {
  @apply mb-2;
}

.prose :deep(a) {
  @apply text-accent hover:text-accent-dark underline transition-all duration-200 ease-out;
}

.prose :deep(strong) {
  @apply font-semibold;
}

.prose :deep(em) {
  @apply italic;
}

.prose :deep(blockquote) {
  @apply border-l-4 border-accent pl-6 italic my-6 text-primary/80;
}

.prose :deep(code) {
  @apply bg-neutral-light px-2 py-1 rounded text-sm font-mono;
}

.prose :deep(pre) {
  @apply bg-primary text-neutral p-4 rounded-card overflow-x-auto my-6;
}

.prose :deep(pre code) {
  @apply bg-transparent p-0;
}
</style>