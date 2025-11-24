<template>
  <section 
    class="relative min-h-screen flex items-center justify-center bg-cover bg-center"
    :style="backgroundStyle"
  >
    <div class="container mx-auto px-8 text-center text-white relative z-10">
      <h1 class="text-5xl md:text-7xl font-bold mb-6">
        {{ block.heading }}
      </h1>
      <p v-if="block.subheading" class="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
        {{ block.subheading }}
      </p>
      <div v-if="block.ctaButton?.text && block.ctaButton?.url">
        <a 
          :href="block.ctaButton.url"
          class="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-lg text-lg transition-colors"
        >
          {{ block.ctaButton.text }}
        </a>
      </div>
    </div>
    <!-- Overlay for better text readability -->
    <div class="absolute inset-0 bg-black bg-opacity-40"></div>
  </section>
</template>

<script setup lang="ts">
interface Props {
  block: {
    heading: string
    subheading?: string
    backgroundImage?: any
    ctaButton?: {
      text: string
      url: string
    }
  }
  urlFor: (source: any) => any
}

const props = defineProps<Props>()

const backgroundStyle = computed(() => {
  if (props.block.backgroundImage && props.urlFor) {
    const imageUrl = props.urlFor(props.block.backgroundImage).width(1920).height(1080).url()
    return {
      backgroundImage: `url(${imageUrl})`
    }
  }
  return {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
  }
})
</script>
