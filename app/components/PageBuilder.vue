<template>
  <div>
    <component
      v-for="block in blocks"
      :is="getBlockComponent(block)"
      :key="block._key || block._id || `block-${blocks.indexOf(block)}`"
      :block="block"
      :url-for="urlFor"
    />
  </div>
</template>

<script setup lang="ts">
import type { BlockComponent, SanityBlock, UrlBuilder } from '~/types/sanity'
import { useBlockResolver } from '~/composables/useBlockResolver'
import BlocksHero from '~/components/blocks/Hero.vue'
import BlocksText from '~/components/blocks/Text.vue'
import BlocksImage from '~/components/blocks/Image.vue'
import BlocksProjects from '~/components/blocks/Projects.vue'
import BlocksTechStack from '~/components/blocks/TechStack.vue'
import BlocksUnknownBlock from '~/components/blocks/UnknownBlock.vue'

interface Props {
  blocks: SanityBlock[]
  urlFor: UrlBuilder
}

defineProps<Props>()
const { resolveBlockComponent } = useBlockResolver()

// Manual component mapping for type safety and explicit imports
// Nuxt auto-imports work, but explicit imports ensure better tree-shaking
const blockComponentMap: Record<string, BlockComponent> = {
  hero: BlocksHero,
  richText: BlocksText,
  contentImage: BlocksImage,
  projects: BlocksProjects,
  techStack: BlocksTechStack,
}

/**
 * Get the Vue component for a Sanity block
 * Falls back to UnknownBlock if component not found
 */
const getBlockComponent = (block: SanityBlock): BlockComponent => {
  if (!block || !block._type) {
    return BlocksUnknownBlock
  }

  // Try explicit mapping first (fastest and most reliable)
  const mappedComponent = blockComponentMap[block._type]
  if (mappedComponent) {
    return mappedComponent
  }

  // Try dynamic resolution as fallback
  const resolved = resolveBlockComponent(block._type)
  if (resolved) {
    return resolved
  }

  // Fallback to UnknownBlock for unsupported block types
  return BlocksUnknownBlock
}
</script>
