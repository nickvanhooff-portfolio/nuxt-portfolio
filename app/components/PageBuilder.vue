<template>
  <div>
    <component
      v-for="(block, index) in blocks"
      :is="getBlockComponent(block)"
      :key="block._key || block._id || `block-${index}`"
      :block="block"
      :id="getBlockId(block, index)"
    />
  </div>
</template>

<script setup lang="ts">
import type { SanityBlock } from '~/types/sanity'
import BlocksUnknownBlock from '~/components/blocks/UnknownBlock.vue'

interface Props {
  blocks: SanityBlock[]
}

const props = defineProps<Props>()

// Components that don't match their Sanity block type name
const BLOCK_TYPE_MAPPINGS: Record<string, string> = {
  Text: 'richText',
  Image: 'contentImage',
}

function getBlockTypeFromFileName(fileName: string): string {
  return BLOCK_TYPE_MAPPINGS[fileName] || fileName.charAt(0).toLowerCase() + fileName.slice(1)
}

function extractComponentName(path: string): string {
  return path.split('/').pop()?.replace('.vue', '') || ''
}

// Auto-discover all block components from the blocks folder
const blockModules = import.meta.glob<{ default: any }>('~/components/blocks/*.vue', { eager: true })

const blockComponentMap = Object.entries(blockModules).reduce((map, [path, module]) => {
  const componentName = extractComponentName(path)
  
  if (componentName === 'UnknownBlock') {
    return map
  }
  
  const blockType = getBlockTypeFromFileName(componentName)
  
  if (blockType && module.default) {
    map[blockType] = module.default
  }
  
  return map
}, {} as Record<string, any>)

function getBlockComponent(block: SanityBlock): any {
  if (!block?._type) {
    return BlocksUnknownBlock
  }

  return blockComponentMap[block._type] || BlocksUnknownBlock
}

function getBlockId(block: SanityBlock, index: number): string {
  if (!block?._type) {
    return `block-${index}`
  }
  
  // Map block types to ID-friendly names
  const idMap: Record<string, string> = {
    hero: 'home',
    projects: 'projects',
    techStack: 'tech-stack',
    contact: 'contact',
    imageText: 'about',
    richText: 'text',
    contentImage: 'image',
    experience: 'experience',
  }
  
  return idMap[block._type] || `${block._type}-${index}`
}
</script>
