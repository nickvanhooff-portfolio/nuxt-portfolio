<template>
  <div>
    <!-- Year/Date at top (horizontal only) -->
    <div 
      v-if="isHorizontalLayout"
      class="flex flex-col items-center gap-1.5 mb-4"
    >
      <div 
        class="text-2xl md:text-3xl font-bold"
        :class="yearTextColor"
      >
        {{ year }}
      </div>
      <div class="flex flex-wrap justify-center items-center gap-2">
        <span class="text-xs px-2.5 py-1 rounded-full font-medium whitespace-nowrap bg-neutral-light text-primary">
          {{ formattedDateRange }}
        </span>
        <span 
          v-if="isCurrent"
          class="text-xs px-2.5 py-1 rounded-full font-medium whitespace-nowrap bg-accent/15 text-accent-dark border border-accent/30"
        >
          Current
        </span>
      </div>
    </div>

    <!-- Date badge (vertical only) -->
    <div 
      v-else
      class="flex flex-wrap items-center gap-2 mb-6"
      :class="dateBadgeAlignment"
    >
      <span class="text-xs px-3 py-1.5 rounded-full font-medium whitespace-nowrap bg-neutral-light text-primary">
        {{ formattedDateRange }}
      </span>
      <span 
        v-if="isCurrent"
        class="text-xs px-3 py-1.5 rounded-full font-medium whitespace-nowrap bg-accent/15 text-accent-dark border border-accent/30"
      >
        Current
      </span>
    </div>

    <!-- Job title and company -->
    <h3 
      :class="h3Classes"
    >
      {{ experience.title }}
    </h3>
    <p 
      :class="companyClasses"
    >
      {{ experience.company }}
    </p>

    <!-- Description -->
    <p 
      v-if="experience.description"
      :class="descriptionClasses"
    >
      {{ experience.description }}
    </p>
  </div>
</template>

<script setup lang="ts">
import type { ExperienceItem } from '~/types/sanity'
import { computed } from 'vue'

interface Props {
  experience: ExperienceItem
  index: number
  backgroundColor?: 'white' | 'gray' | 'primary'
  layout?: 'vertical' | 'horizontal'
}

const props = defineProps<Props>()

// Ensure layout is always defined consistently
const isHorizontalLayout = computed(() => props.layout === 'horizontal')
const isCurrent = computed(() => props.experience.isCurrent || !props.experience.endDate)

// Computed properties for conditional classes to ensure consistent rendering
const dateBadgeAlignment = computed(() => {
  return props.index % 2 === 0 ? 'md:justify-end' : 'md:justify-start'
})

const yearTextColor = computed(() => {
  return props.backgroundColor === 'primary' ? 'text-neutral' : 'text-primary'
})

const titleAlignment = computed(() => {
  if (props.layout === 'vertical') {
    return props.index % 2 === 0 ? 'md:text-right' : 'md:text-left'
  }
  return ''
})

const companyAlignment = computed(() => {
  if (props.layout === 'vertical') {
    return props.index % 2 === 0 ? 'md:text-right' : 'md:text-left'
  }
  return ''
})

const descriptionAlignment = computed(() => {
  if (props.layout === 'vertical') {
    return props.index % 2 === 0 ? 'md:text-right' : 'md:text-left'
  }
  return ''
})

// Consolidated class computations for consistent rendering
const h3Classes = computed(() => {
  const base = isHorizontalLayout.value
    ? 'text-lg md:text-xl font-title font-bold mb-2 text-center'
    : 'text-2xl md:text-3xl font-title font-bold mb-2'
  return [
    base,
    titleAlignment.value,
    props.backgroundColor === 'primary' ? 'text-neutral' : 'text-primary'
  ]
})

const companyClasses = computed(() => {
  const base = isHorizontalLayout.value
    ? 'text-base md:text-lg font-semibold mb-4 text-center'
    : 'text-xl md:text-2xl font-semibold mb-6'
  return [
    base,
    companyAlignment.value,
    props.backgroundColor === 'primary' ? 'text-neutral/70' : 'text-primary/70',
    isHorizontalLayout.value && props.backgroundColor === 'primary' ? 'text-neutral/80' : ''
  ]
})

const descriptionClasses = computed(() => {
  const base = isHorizontalLayout.value
    ? 'text-sm leading-relaxed line-clamp-4 text-center flex-grow'
    : 'text-body-mobile md:text-body leading-relaxed'
  return [
    base,
    descriptionAlignment.value,
    props.backgroundColor === 'primary' ? 'text-neutral/70' : 'text-primary/70'
  ]
})

// Date formatting that's consistent between server and client
// Use computed properties to ensure consistency during SSR and hydration
// Parse dates directly from string to avoid timezone issues
const formattedDateRange = computed(() => {
  if (!props.experience.startDate) return ''
  
  try {
    // Parse date string consistently (format: YYYY-MM-DD)
    const startParts = props.experience.startDate.split('-')
    if (startParts.length < 2) return ''
    
    const startYear = Number.parseInt(startParts[0] || '0', 10)
    const startMonth = Number.parseInt(startParts[1] || '1', 10)
    
    if (!startYear || !startMonth || startYear === 0 || startMonth === 0) return ''
    
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const startMonthName = months[Math.max(0, Math.min(startMonth - 1, 11))]
    const startFormatted = `${startMonthName} ${startYear}`
    
    if (props.experience.isCurrent || !props.experience.endDate) {
      return `${startFormatted} - Present`
    }
    
    // Parse end date consistently
    const endParts = props.experience.endDate.split('-')
    if (endParts.length < 2) return `${startFormatted} - Present`
    
    const endYear = Number.parseInt(endParts[0] || '0', 10)
    const endMonth = Number.parseInt(endParts[1] || '1', 10)
    
    if (!endYear || !endMonth || endYear === 0 || endMonth === 0) return `${startFormatted} - Present`
    
    const endMonthName = months[Math.max(0, Math.min(endMonth - 1, 11))]
    const endFormatted = `${endMonthName} ${endYear}`
    
    return `${startFormatted} - ${endFormatted}`
  } catch (error) {
    if (process.dev) {
      console.warn('Error formatting date range:', error, props.experience)
    }
    return ''
  }
})

const year = computed(() => {
  if (!props.experience.startDate) return ''
  
  try {
    // Parse date string consistently (format: YYYY-MM-DD)
    const parts = props.experience.startDate.split('-')
    if (parts.length < 1) return ''
    
    const yearNum = Number.parseInt(parts[0] || '0', 10)
    if (!yearNum || yearNum === 0) return ''
    
    return yearNum.toString()
  } catch (error) {
    if (process.dev) {
      console.warn('Error extracting year:', error, props.experience)
    }
    return ''
  }
})
</script>

