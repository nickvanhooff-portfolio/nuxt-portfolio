<template>
  <div>
    <component
      :is="getBlockComponent(block)"
      v-for="(block, index) in blocks"
      :id="getBlockId(block, index)"
      :key="block._key || block._id || `block-${index}`"
      :block="block"
    />
  </div>
</template>

<script setup lang="ts">
import type { Component } from 'vue'
import type { SanityBlock } from '~/types/sanity'
import BlocksUnknownBlock from '~/components/blocks/UnknownBlock.vue'

interface Props {
  blocks: SanityBlock[]
}

defineProps<Props>()

// Components that don't match their Sanity block type name
const BLOCK_TYPE_MAPPINGS: Record<string, string> = {
  Text: 'richText',
  Image: 'contentImage',
}

function getBlockTypeFromFileName(fileName: string): string {
  return BLOCK_TYPE_MAPPINGS[fileName] || fileName.charAt(0).toLowerCase() + fileName.slice(1)
}

function extractComponentName(path: string): string {
  // Handle both flat files and folder/index.vue structure
  const parts = path.split('/')
  const fileName = parts.pop()?.replace('.vue', '') || ''
  
  // If it's index.vue, use the folder name instead
  if (fileName === 'index') {
    const folderName = parts.pop()
    return folderName || fileName
  }
  
  return fileName
}

// Auto-discover all block components from the blocks folder
// Support both flat structure (*.vue) and folder structure (*/index.vue)
const blockModules = import.meta.glob<{ default: Component }>('~/components/blocks/**/*.vue', { eager: true })

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
}, {} as Record<string, Component>)


function getBlockComponent(block: SanityBlock): Component {
  if (!block?._type) {
    if (process.dev) {
      console.warn('Block has no _type:', block)
    }
    return BlocksUnknownBlock
  }

  const component = blockComponentMap[block._type]
  
  if (!component) {
    if (process.dev) {
      console.warn(`No component found for block type "${block._type}". Available types:`, Object.keys(blockComponentMap))
    }
    return BlocksUnknownBlock
  }

  return component
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
