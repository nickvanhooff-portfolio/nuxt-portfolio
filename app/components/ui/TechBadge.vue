<template>
  <span :class="badgeClasses">
    <NuxtImg
      v-if="icon"
      :src="urlFor(icon).width(16).height(16).url()"
      :alt="`${label} icon`"
      class="w-4 h-4 object-contain"
      width="16"
      height="16"
    />
    <slot name="icon" />
    <span v-if="label">{{ label }}</span>
    <slot />
  </span>
</template>

<script setup lang="ts">
import type { SanityImageAsset } from '~/types/sanity'

interface Props {
  label: string
  icon?: SanityImageAsset
  variant?: 'default' | 'accent' | 'neutral'
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
})

const urlFor = useImageUrl()

const badgeClasses = computed(() => {
  const base = 'inline-flex items-center gap-1.5 px-3 py-1 rounded-badge text-xs font-medium uppercase tracking-wide transition-all duration-200 ease-out'
  
  const variants: Record<string, string> = {
    default: 'bg-neutral-light text-primary',
    accent: 'bg-accent/10 text-accent',
    neutral: 'bg-neutral-gray text-primary',
  }
  
  return `${base} ${variants[props.variant] || variants.default}`
})
</script>
