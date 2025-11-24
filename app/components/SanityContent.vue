<template>
  <div>
    <template v-for="(block, index) in blocks" :key="index">
      <div v-if="block._type === 'block'" class="mb-4">
        <template v-for="(child, childIndex) in block.children" :key="childIndex">
          <component
            :is="getElement(block.style)"
            v-if="child._type === 'span'"
            :class="getElementClasses(block.style)"
          >
            <template v-for="(mark, markIndex) in child.marks" :key="markIndex">
              <component
                :is="getMarkComponent(mark._type)"
                v-if="mark._type"
                :class="getMarkClasses(mark._type)"
              >
                {{ child.text }}
              </component>
              <span v-else>{{ child.text }}</span>
            </template>
            <span v-if="!child.marks || child.marks.length === 0">{{ child.text }}</span>
          </component>
        </template>
      </div>
      <div v-else-if="block._type === 'image'" class="my-8">
        <img
          v-if="block.asset"
          :src="urlFor(block.asset).width(800).url()"
          :alt="block.alt || ''"
          class="max-w-full h-auto rounded-lg"
        />
        <p v-if="block.caption" class="text-center text-gray-600 italic mt-2">
          {{ block.caption }}
        </p>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
interface Props {
  blocks: any[]
  urlFor?: (source: any) => any
}

const props = defineProps<Props>()

const getElement = (style: string) => {
  switch (style) {
    case 'h1':
      return 'h1'
    case 'h2':
      return 'h2'
    case 'h3':
      return 'h3'
    case 'h4':
      return 'h4'
    case 'blockquote':
      return 'blockquote'
    default:
      return 'p'
  }
}

const getElementClasses = (style: string) => {
  switch (style) {
    case 'h1':
      return 'text-4xl font-bold mb-6'
    case 'h2':
      return 'text-3xl font-bold mb-4'
    case 'h3':
      return 'text-2xl font-bold mb-3'
    case 'h4':
      return 'text-xl font-bold mb-2'
    case 'blockquote':
      return 'border-l-4 border-gray-300 pl-4 italic my-4'
    default:
      return 'mb-3'
  }
}

const getMarkComponent = (markType: string) => {
  switch (markType) {
    case 'strong':
      return 'strong'
    case 'em':
      return 'em'
    case 'code':
      return 'code'
    default:
      return 'span'
  }
}

const getMarkClasses = (markType: string) => {
  switch (markType) {
    case 'strong':
      return 'font-bold'
    case 'em':
      return 'italic'
    case 'code':
      return 'bg-gray-100 px-1 py-0.5 rounded text-sm font-mono'
    default:
      return ''
  }
}

const urlFor = props.urlFor || ((source: any) => ({ url: () => '' }))
</script>
