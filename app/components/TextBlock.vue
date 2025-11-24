<template>
  <section 
    class="py-16"
    :class="backgroundColorClass"
  >
    <div class="container mx-auto px-8 max-w-4xl">
      <h2 v-if="block.heading" class="text-3xl md:text-4xl font-bold mb-8" :class="textAlignmentClass">
        {{ block.heading }}
      </h2>
      <div v-if="block.content" class="prose prose-lg max-w-none" :class="textAlignmentClass">
        <SanityContent :blocks="block.content" :url-for="urlFor" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface Props {
  block: {
    heading?: string
    content?: any[]
    textAlignment?: 'left' | 'center' | 'right'
    backgroundColor?: 'white' | 'gray' | 'primary'
  }
  urlFor: (source: any) => any
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

const backgroundColorClass = computed(() => {
  switch (props.block.backgroundColor) {
    case 'gray':
      return 'bg-gray-100'
    case 'primary':
      return 'bg-blue-50'
    default:
      return 'bg-white'
  }
})
</script>

<style scoped>
.prose {
  @apply text-gray-800 leading-relaxed;
}
.prose h1, .prose h2, .prose h3, .prose h4, .prose h5, .prose h6 {
  @apply text-gray-900 font-bold;
}
.prose p {
  @apply mb-4;
}
.prose ul, .prose ol {
  @apply mb-4 pl-6;
}
.prose li {
  @apply mb-2;
}
</style>
