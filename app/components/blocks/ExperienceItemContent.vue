<template>
  <div>
    <!-- Year/Date at top (horizontal only) -->
    <div 
      v-if="layout === 'horizontal'"
      class="flex flex-col items-center gap-1.5 mb-4"
    >
      <div 
        class="text-2xl md:text-3xl font-bold"
        :class="backgroundColor === 'primary' ? 'text-neutral' : 'text-primary'"
      >
        {{ getYear(experience.startDate) }}
      </div>
      <div class="flex flex-wrap justify-center items-center gap-2">
        <span class="text-xs px-2.5 py-1 rounded-full font-medium whitespace-nowrap bg-neutral-light text-primary">
          {{ formatDateRange(experience) }}
        </span>
        <span 
          v-if="experience.isCurrent || !experience.endDate"
          class="text-xs px-2.5 py-1 rounded-full font-medium whitespace-nowrap bg-accent/10 text-accent border border-accent/20"
        >
          Current
        </span>
      </div>
    </div>

    <!-- Date badge (vertical only) -->
    <div 
      v-else
      class="flex flex-wrap items-center gap-2 mb-6"
      :class="index % 2 === 0 ? 'md:justify-end' : 'md:justify-start'"
    >
      <span class="text-xs px-3 py-1.5 rounded-full font-medium whitespace-nowrap bg-neutral-light text-primary">
        {{ formatDateRange(experience) }}
      </span>
      <span 
        v-if="experience.isCurrent || !experience.endDate"
        class="text-xs px-3 py-1.5 rounded-full font-medium whitespace-nowrap bg-accent/10 text-accent border border-accent/20"
      >
        Current
      </span>
    </div>

    <!-- Job title and company -->
    <h3 
      :class="[
        layout === 'horizontal' 
          ? 'text-lg md:text-xl font-title font-bold mb-2 text-center'
          : 'text-2xl md:text-3xl font-title font-bold mb-2',
        layout === 'vertical' && (index % 2 === 0 ? 'md:text-right' : 'md:text-left'),
        backgroundColor === 'primary' ? 'text-neutral' : 'text-primary'
      ]"
    >
      {{ experience.title }}
    </h3>
    <p 
      :class="[
        layout === 'horizontal'
          ? 'text-base md:text-lg font-semibold mb-4 text-center'
          : 'text-xl md:text-2xl font-semibold mb-6',
        layout === 'vertical' && (index % 2 === 0 ? 'md:text-right' : 'md:text-left'),
        backgroundColor === 'primary' ? 'text-neutral/70' : 'text-primary/70',
        layout === 'horizontal' && backgroundColor === 'primary' ? 'text-neutral/80' : ''
      ]"
    >
      {{ experience.company }}
    </p>

    <!-- Description -->
    <p 
      v-if="experience.description"
      :class="[
        layout === 'horizontal'
          ? 'text-sm leading-relaxed line-clamp-4 text-center flex-grow'
          : 'text-body-mobile md:text-body leading-relaxed',
        layout === 'vertical' && (index % 2 === 0 ? 'md:text-right' : 'md:text-left'),
        backgroundColor === 'primary' ? 'text-neutral/70' : 'text-primary/70'
      ]"
    >
      {{ experience.description }}
    </p>
  </div>
</template>

<script setup lang="ts">
import type { ExperienceItem } from '~/types/sanity'

interface Props {
  experience: ExperienceItem
  index: number
  backgroundColor?: 'white' | 'gray' | 'primary'
  layout?: 'vertical' | 'horizontal'
}

defineProps<Props>()

const formatDateRange = (experience: { startDate: string; endDate?: string; isCurrent?: boolean }) => {
  const start = new Date(experience.startDate)
  const startFormatted = start.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
  
  if (experience.isCurrent || !experience.endDate) {
    return `${startFormatted} - Present`
  }
  
  const end = new Date(experience.endDate)
  const endFormatted = end.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
  
  return `${startFormatted} - ${endFormatted}`
}

const getYear = (dateString: string): string => {
  const date = new Date(dateString)
  return date.getFullYear().toString()
}
</script>


