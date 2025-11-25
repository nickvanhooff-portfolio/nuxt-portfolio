<template>
  <span :class="badgeClasses">
    {{ label }}
  </span>
</template>

<script setup lang="ts">
interface Props {
  label: string
  variant?: 'default' | 'accent' | 'neutral'
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
})

const badgeClasses = computed(() => {
  const base = 'inline-flex items-center px-3 py-1 rounded-badge text-xs font-medium uppercase tracking-wide transition-all duration-200 ease-out'
  
  const variants: Record<string, string> = {
    default: 'bg-neutral-light text-primary',
    accent: 'bg-accent/10 text-accent',
    neutral: 'bg-neutral-gray text-primary',
  }
  
  return `${base} ${variants[props.variant] || variants.default}`
})
</script>
