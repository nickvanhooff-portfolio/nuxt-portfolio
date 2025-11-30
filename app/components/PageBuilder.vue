<template>
  <div>
    <component
      v-for="block in blocks"
      :is="getBlockComponent(block)"
      :key="block._key || block._id || `block-${blocks.indexOf(block)}`"
      :block="block"
    />
  </div>
</template>

<script setup lang="ts">
import type { BlockComponent, SanityBlock } from '~/types/sanity'
import { useBlockResolver } from '~/composables/useBlockResolver'
import BlocksHero from '~/components/blocks/Hero.vue'
import BlocksText from '~/components/blocks/Text.vue'
import BlocksImage from '~/components/blocks/Image.vue'
import BlocksProjects from '~/components/blocks/Projects.vue'
import BlocksTechStack from '~/components/blocks/TechStack.vue'
import BlocksImageText from '~/components/blocks/ImageText.vue'
import BlocksContact from '~/components/blocks/Contact.vue'
import BlocksUnknownBlock from '~/components/blocks/UnknownBlock.vue'

interface Props {
  blocks: SanityBlock[]
}

const props = defineProps<Props>()
const { resolveBlockComponent } = useBlockResolver()

// Manual component mapping for type safety and explicit imports
// Nuxt auto-imports work, but explicit imports ensure better tree-shaking
// Note: Some components (hero, contentImage) use useImageUrl composable internally
const blockComponentMap: Record<string, any> = {
  hero: BlocksHero,
  richText: BlocksText,
  contentImage: BlocksImage,
  projects: BlocksProjects,
  techStack: BlocksTechStack,
  imageText: BlocksImageText,
  contact: BlocksContact,
}

/**
 * Get the Vue component for a Sanity block
 * Falls back to UnknownBlock if component not found
 */
const getBlockComponent = (block: SanityBlock): any => {
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
