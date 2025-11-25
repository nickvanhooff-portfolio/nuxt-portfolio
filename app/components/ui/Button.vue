<template>
  <component
    :is="tag"
    :href="href"
    :to="to"
    :class="buttonClasses"
    :type="tag === 'button' ? type : undefined"
    @click="handleClick"
  >
    <slot />
  </component>
</template>

<script setup lang="ts">
interface Props {
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  href?: string
  to?: string
  type?: 'button' | 'submit' | 'reset'
  fullWidth?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  type: 'button',
  fullWidth: false,
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

const tag = computed(() => {
  if (props.href) return 'a'
  if (props.to) return 'nuxt-link'
  return 'button'
})

const buttonClasses = computed(() => {
  const base = 'inline-flex items-center justify-center font-medium rounded-button transition-all duration-200 ease-out focus:outline-none focus:ring-2 focus:ring-offset-2'
  
  const variants: Record<string, string> = {
    primary: 'bg-accent text-white hover:bg-accent-dark hover:scale-[1.02] focus:ring-accent shadow-sm hover:shadow-glow',
    secondary: 'bg-neutral-gray text-primary hover:bg-neutral-dark focus:ring-neutral-gray',
    outline: 'border-2 border-accent text-accent hover:bg-accent hover:text-white focus:ring-accent',
  }
  
  const sizes: Record<string, string> = {
    sm: 'px-4 py-2 text-ui-small',
    md: 'px-6 py-3 text-ui',
    lg: 'px-8 py-4 text-lg',
  }
  
  const width = props.fullWidth ? 'w-full' : ''
  
  return `${base} ${variants[props.variant] || variants.primary} ${sizes[props.size] || sizes.md} ${width}`
})

const handleClick = (event: MouseEvent) => {
  emit('click', event)
}
</script>
