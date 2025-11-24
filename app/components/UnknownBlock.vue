<template>
  <section class="py-16 bg-yellow-50 border-l-4 border-yellow-400">
    <div class="container mx-auto px-8">
      <div class="bg-yellow-100 border border-yellow-400 rounded p-4">
        <h3 class="text-lg font-semibold text-yellow-800 mb-2">Unknown Block Type</h3>
        <p class="text-yellow-700">
          Block type "{{ block._type }}" is not supported. Please create a component for this block type.
        </p>
        <details class="mt-4">
          <summary class="cursor-pointer text-yellow-700 font-medium">Block Data</summary>
          <pre class="mt-2 text-xs bg-yellow-50 p-2 rounded overflow-auto">{{ JSON.stringify(block, null, 2) }}</pre>
        </details>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface Props {
  block: {
    _type: string
    [key: string]: any
  }
  urlFor: (source: any) => any
}

defineProps<Props>()
</script>
