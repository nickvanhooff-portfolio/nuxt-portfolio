<template>
  <section 
    :id="$attrs.id as string || 'unknown-block'"
    class="section-spacing bg-yellow-50 border-l-4 border-yellow-400"
    :style="{ scrollMarginTop: '80px' }"
  >
    <div class="container-custom">
      <div class="max-w-6xl mx-auto">
        <div class="bg-yellow-100 border border-yellow-400 rounded-card p-6">
        <h3 class="text-lg font-semibold text-yellow-800 mb-2 font-title">
          Unknown Block Type
        </h3>
        <p class="text-yellow-700 text-body-mobile mb-4">
          Block type "{{ block._type }}" is not supported. Please create a component for this block type.
        </p>
        <details class="mt-4">
          <summary class="cursor-pointer text-yellow-700 font-medium hover:text-yellow-800 transition-all duration-200 ease-out">
            Block Data
          </summary>
          <pre class="mt-2 text-xs bg-yellow-50 p-4 rounded overflow-auto max-h-64">{{ JSON.stringify(block, null, 2) }}</pre>
        </details>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { SanityBlock } from '~/types/sanity'

interface Props {
  block: SanityBlock
}

defineProps<Props>()
</script>