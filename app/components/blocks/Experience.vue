<template>
  <section 
    :id="$attrs.id as string || 'experience'"
    class="section-spacing relative overflow-hidden"
    :class="backgroundColorClass"
    :style="{ scrollMarginTop: '80px' }"
  >
    <div class="container-custom relative z-10">
      <div class="max-w-7xl mx-auto space-y-12 md:space-y-16">
        <!-- Heading -->
        <div 
          v-if="block.title || block.description"
          class="text-center space-y-6 animate-fade-in-up"
        >
          <h2 
            v-if="block.title" 
            class="text-section-mobile md:text-section text-primary font-title font-bold relative inline-block"
          >
            <span class="relative z-10">{{ block.title }}</span>
            <span 
              class="absolute inset-0 bg-gradient-to-r from-accent/20 via-accent/40 to-accent/20 blur-2xl opacity-50 -z-10"
            />
          </h2>
          
          <p 
            v-if="block.description" 
            class="text-body-mobile md:text-body text-primary/70 max-w-2xl mx-auto leading-relaxed"
          >
            {{ block.description }}
          </p>
        </div>
        
        <!-- Timeline Container -->
        <div 
          v-if="block.experiences && block.experiences.length > 0"
          class="relative"
          :class="block.layout === 'horizontal' ? 'py-8 md:py-8' : ''"
        >
          <!-- Vertical Timeline -->
          <template v-if="block.layout === 'vertical' || !block.layout">
            <div class="absolute left-4 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-[3px] bg-neutral-gray z-0" />
            <div class="space-y-16 md:space-y-20">
              <ExperienceItem
                v-for="(experience, index) in sortedExperiences"
                :key="index"
                :experience="experience"
                :index="index"
                :backgroundColor="block.backgroundColor"
                :layout="block.layout"
              />
            </div>
          </template>

          <!-- Horizontal Timeline with Keen Slider -->
          <template v-else>
            <div class="relative py-12 md:py-16">
              <!-- Scroll hint text -->
              <div class="absolute top-0 right-8 z-30 pointer-events-none hidden md:flex items-center gap-2 text-xs text-primary/60">
                <span>Swipe to explore</span>
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </div>
              
              <!-- Timeline line -->
              <div class="absolute top-12 left-0 right-0 h-[3px] bg-neutral-gray z-0" />
              <div class="absolute top-12 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-neutral-gray to-transparent z-0 opacity-50" />
              
              <!-- Scroll hint gradients -->
              <div 
                class="absolute top-12 right-0 w-32 h-[3px] bg-gradient-to-l z-10 pointer-events-none"
                :class="block.backgroundColor === 'primary' ? 'from-primary/80 via-primary/40 to-transparent' : 'from-neutral via-neutral/50 to-transparent'"
              />
              <div 
                class="absolute top-12 left-0 w-32 h-[3px] bg-gradient-to-r z-10 pointer-events-none"
                :class="block.backgroundColor === 'primary' ? 'from-primary/80 via-primary/40 to-transparent' : 'from-neutral via-neutral/50 to-transparent'"
              />

              <!-- Keen Slider Container -->
              <div 
                ref="container" 
                class="keen-slider pb-16 cursor-grab active:cursor-grabbing select-none relative z-10"
              >
                <ExperienceItem
                  v-for="(experience, index) in sortedExperiences"
                  :key="`experience-${index}`"
                  :experience="experience"
                  :index="index"
                  :backgroundColor="block.backgroundColor"
                  :layout="block.layout"
                />
              </div>
              
              <!-- Navigation dots -->
              <div 
                v-if="sortedExperiences.length > 1"
                class="flex justify-center items-center gap-2 mt-10 relative z-50"
              >
                <button
                  v-for="(experience, index) in sortedExperiences"
                  :key="`dot-${index}`"
                  @click.stop.prevent="goToSlide(index)"
                  @mousedown.stop
                  @touchstart.stop
                  class="relative rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 cursor-pointer pointer-events-auto z-50"
                  :style="{ 
                    minWidth: '8px',
                    minHeight: '8px',
                    zIndex: 50 + index 
                  }"
                  :class="currentSlide === index 
                    ? (block.backgroundColor === 'primary' 
                        ? 'bg-neutral w-8 h-2.5' 
                        : 'bg-primary w-8 h-2.5')
                    : (block.backgroundColor === 'primary' 
                        ? 'bg-white/40 hover:bg-white/60 w-2 h-2' 
                        : 'bg-primary/30 hover:bg-primary/50 w-2 h-2')
                  "
                  :aria-label="`Go to experience from ${getYear(experience.startDate)}`"
                  type="button"
                >
                  <span class="sr-only">Navigate to experience from {{ getYear(experience.startDate) }}</span>
                </button>
              </div>
            </div>
          </template>
        </div>
        
        <!-- Empty state -->
        <div 
          v-else 
          class="text-center py-16 animate-fade-in-up"
        >
          <p class="text-primary/60">No experiences added yet.</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { Experience } from '~/types/sanity'
import { useSliderNavigation } from '~/composables/useSliderNavigation'

interface Props {
  block: Experience
}

const props = defineProps<Props>()

// Sort experiences by start date (oldest first - chronological order)
const sortedExperiences = computed(() => {
  if (!props.block.experiences) return []
  
  return [...props.block.experiences].sort((a, b) => {
    const dateA = new Date(a.startDate).getTime()
    const dateB = new Date(b.startDate).getTime()
    return dateA - dateB
  })
})

const backgroundColorClass = computed(() => {
  switch (props.block.backgroundColor) {
    case 'gray':
      return 'bg-neutral-light'
    case 'primary':
      return 'bg-primary text-neutral'
    default:
      return 'bg-neutral'
  }
})

// Use slider composable for horizontal layout
const { container, currentSlide, goToSlide } = useSliderNavigation({
  enabled: props.block.layout === 'horizontal',
  itemsCount: sortedExperiences.value.length,
})

const getYear = (dateString: string): string => {
  const date = new Date(dateString)
  return date.getFullYear().toString()
}
</script>
