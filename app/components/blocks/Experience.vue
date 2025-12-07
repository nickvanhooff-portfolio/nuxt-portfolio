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
            <!-- Timeline line -->
            <div class="absolute left-4 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-[3px] bg-neutral-gray z-0" />

            <!-- Experience items -->
            <div class="space-y-16 md:space-y-20">
              <article
                v-for="(experience, index) in sortedExperiences"
                :key="index"
                class="relative animate-fade-in-up"
                :style="{ animationDelay: `${index * 0.1}s` }"
              >
                <!-- Timeline dot -->
                <div 
                  class="absolute left-4 md:left-1/2 top-8 w-6 h-6 rounded-full bg-accent z-20 border-[4px] -translate-x-1/2 md:-translate-x-1/2 shadow-lg"
                  :class="block.backgroundColor === 'primary' ? 'border-primary' : 'border-white'"
                >
                  <!-- Inner glow -->
                  <div class="absolute inset-0 rounded-full bg-accent/50 blur-sm" />
                </div>

                <!-- Content card -->
                <div 
                  class="relative ml-12 md:ml-0 md:max-w-[calc(50%-3rem)] p-8 md:p-10 rounded-2xl"
                  :class="[
                    index % 2 === 0 ? 'md:ml-auto md:pl-10 md:pr-4' : 'md:mr-auto md:pr-10 md:pl-4',
                    block.backgroundColor === 'primary' 
                      ? 'bg-white/10 border border-white/15' 
                      : 'bg-white/98 border border-black/8',
                    'shadow-[0_4px_16px_rgba(0,0,0,0.08),0_2px_8px_rgba(0,0,0,0.04)]'
                  ]"
                >
                  <!-- Date badge -->
                  <div 
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
                    class="text-2xl md:text-3xl font-title font-bold mb-2"
                    :class="[
                      index % 2 === 0 ? 'md:text-right' : 'md:text-left',
                      block.backgroundColor === 'primary' ? 'text-neutral' : 'text-primary'
                    ]"
                  >
                    {{ experience.title }}
                  </h3>
                  <p 
                    class="text-xl md:text-2xl font-semibold mb-6"
                    :class="[
                      index % 2 === 0 ? 'md:text-right' : 'md:text-left',
                      block.backgroundColor === 'primary' ? 'text-neutral/70' : 'text-primary/70'
                    ]"
                  >
                    {{ experience.company }}
                  </p>

                  <!-- Description -->
                  <p 
                    v-if="experience.description"
                    class="text-body-mobile md:text-body leading-relaxed"
                    :class="[
                      index % 2 === 0 ? 'md:text-right' : 'md:text-left',
                      block.backgroundColor === 'primary' ? 'text-neutral/70' : 'text-primary/70'
                    ]"
                  >
                    {{ experience.description }}
                  </p>
                </div>
              </article>
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
              
              <!-- Timeline line - prominent and visible -->
              <div class="absolute top-12 left-0 right-0 h-[3px] bg-neutral-gray z-0" />
              <div class="absolute top-12 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-neutral-gray to-transparent z-0 opacity-50" />
              
              <!-- Scroll hint gradients on edges - indicate scrollability -->
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
                <article
                  v-for="(experience, index) in sortedExperiences"
                  :key="`experience-${index}`"
                  class="keen-slider__slide relative pt-6"
                >
                  <!-- Timeline dot with connecting line -->
                  <div class="absolute top-12 left-0 right-0 flex items-center justify-center z-20">
                    <!-- Vertical connector line to card -->
                    <div 
                      class="absolute top-0 -bottom-10 w-[2px]"
                      :class="block.backgroundColor === 'primary' ? 'bg-white/30' : 'bg-neutral-gray/50'"
                    />
                    <!-- Timeline dot -->
                    <div 
                      class="w-7 h-7 rounded-full bg-accent z-20 border-[4px] shadow-xl relative transition-all duration-300"
                      :class="block.backgroundColor === 'primary' ? 'border-primary' : 'border-white'"
                    >
                      <!-- Inner glow -->
                      <div class="absolute inset-0 rounded-full bg-accent/60 blur-md -z-10" />
                      <!-- Center dot -->
                      <div class="absolute inset-2 rounded-full bg-accent" />
                    </div>
                  </div>

                  <!-- Content card -->
                  <div 
                    class="relative mt-12 rounded-2xl p-6 h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                    :class="[
                      block.backgroundColor === 'primary' 
                        ? 'bg-white/10 border border-white/15 hover:bg-white/15 hover:border-white/25' 
                        : 'bg-white border border-black/8 hover:border-accent/40',
                      'shadow-[0_4px_12px_rgba(0,0,0,0.08),0_2px_4px_rgba(0,0,0,0.04)]',
                      'min-h-[280px] flex flex-col'
                    ]"
                  >
                    <!-- Year/Date at top -->
                    <div class="flex flex-col items-center gap-1.5 mb-4">
                      <div 
                        class="text-2xl md:text-3xl font-bold"
                        :class="block.backgroundColor === 'primary' ? 'text-neutral' : 'text-primary'"
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

                    <!-- Job title and company -->
                    <h3 
                      class="text-lg md:text-xl font-title font-bold mb-2 text-center"
                      :class="block.backgroundColor === 'primary' ? 'text-neutral' : 'text-primary'"
                    >
                      {{ experience.title }}
                    </h3>
                    <p 
                      class="text-base md:text-lg font-semibold mb-4 text-center"
                      :class="block.backgroundColor === 'primary' ? 'text-neutral/80' : 'text-primary/70'"
                    >
                      {{ experience.company }}
                    </p>

                    <!-- Description -->
                    <p 
                      v-if="experience.description"
                      class="text-sm leading-relaxed line-clamp-4 text-center flex-grow"
                      :class="block.backgroundColor === 'primary' ? 'text-neutral/70' : 'text-primary/70'"
                    >
                      {{ experience.description }}
                    </p>
                  </div>
                </article>
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
import { useKeenSlider } from 'keen-slider/vue.es'
import { nextTick, watch } from 'vue'

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

// Initialize Keen Slider (must be called unconditionally)
const [container, slider] = useKeenSlider(
  {
    mode: 'free',
    loop: false,
    rubberband: true,
    drag: true,
    breakpoints: {
      '(min-width: 0px)': {
        slides: {
          perView: 1.3,
          spacing: 20,
          origin: 'auto',
        },
      },
      '(min-width: 640px)': {
        slides: {
          perView: 2.2,
          spacing: 24,
          origin: 'auto',
        },
      },
      '(min-width: 1024px)': {
        slides: {
          perView: 3,
          spacing: 32,
          origin: 'auto',
        },
      },
      '(min-width: 1280px)': {
        slides: {
          perView: 3.5,
          spacing: 36,
          origin: 'auto',
        },
      },
    },
  }
)

// Enable trackpad/mouse wheel horizontal scrolling
let wheelTimeout: ReturnType<typeof setTimeout> | null = null
let accumulatedDelta = 0

// Track current slide for dots navigation
const currentSlide = ref(0)

// Function to navigate to a specific slide
const goToSlide = (index: number) => {
  // Prevent event propagation
  if (!slider.value || sortedExperiences.value.length === 0) {
    return
  }
  
  const maxIndex = sortedExperiences.value.length - 1
  const targetIndex = Math.max(0, Math.min(index, maxIndex))
  
  // Update current slide immediately for visual feedback
  currentSlide.value = targetIndex
  
  // Use requestAnimationFrame to ensure slider is ready
  requestAnimationFrame(() => {
    if (!slider.value) return
    
    try {
      // Move to the target slide
      slider.value.moveToIdx(targetIndex)
      
      // Verify we reached the target after animation
      setTimeout(() => {
        if (slider.value) {
          const actualIdx = getClosestSlideIndex()
          // Only update if we're close to target (within 1 slide)
          if (Math.abs(actualIdx - targetIndex) <= 1) {
            currentSlide.value = actualIdx
          } else {
            // Retry if we didn't reach it
            slider.value.moveToIdx(targetIndex)
            currentSlide.value = targetIndex
          }
        }
      }, 300)
    } catch (error) {
      console.warn('Error navigating to slide:', error)
      // Fallback: just update the visual state
      currentSlide.value = targetIndex
    }
  })
}

// Get the closest slide index based on slider position
const getClosestSlideIndex = (): number => {
  if (!slider.value || sortedExperiences.value.length === 0) return 0
  
  const track = slider.value.track.details
  const abs = track.abs
  const maxIdx = sortedExperiences.value.length - 1
  
  // Check if we're at or near the maximum scrollable position
  // The maxIdx in track.details represents the last reachable index
  const maxScrollableIdx = track.maxIdx ?? maxIdx
  
  // If we're at or past the maximum scrollable position (within tolerance), 
  // we're definitely on the last slide
  if (abs >= maxScrollableIdx - 0.5) {
    return maxIdx
  }
  
  // For other positions, round to nearest slide
  const roundedIdx = Math.round(abs)
  return Math.max(0, Math.min(roundedIdx, maxIdx))
}

// Setup slider event listeners
const setupSliderListeners = () => {
  if (slider.value && props.block.layout === 'horizontal') {
    // Update current slide when slider moves
    slider.value.on('slideChanged', () => {
      currentSlide.value = getClosestSlideIndex()
    })
    
    // Also update on details changed for more accurate tracking
    slider.value.on('detailsChanged', () => {
      currentSlide.value = getClosestSlideIndex()
    })
    
    // Update on drag end to catch when user stops dragging
    slider.value.on('dragEnded', () => {
      // Use a small delay to ensure track details are updated
      setTimeout(() => {
        currentSlide.value = getClosestSlideIndex()
      }, 50)
    })
    
    // Also update on animation end
    slider.value.on('animationEnded', () => {
      currentSlide.value = getClosestSlideIndex()
    })
    
    // Set initial slide
    if (sortedExperiences.value.length > 0) {
      currentSlide.value = 0
    }
  }
}

onMounted(() => {
  // Wait for next tick to ensure slider is fully initialized
  nextTick(() => {
    setupSliderListeners()
    
    // Re-setup when slider updates
    if (slider.value) {
      slider.value.update()
    }
  })
  
  // Watch for layout or experiences changes
  watch(() => [props.block.layout, sortedExperiences.value.length], () => {
    nextTick(() => {
      setupSliderListeners()
      if (slider.value) {
        slider.value.update()
      }
    })
  })
  
  if (container.value && slider.value && props.block.layout === 'horizontal') {
    const sliderContainer = container.value as HTMLElement
    
    // Reset accumulated delta when mounting
    accumulatedDelta = 0
    
    const handleWheel = (e: WheelEvent) => {
      // Handle horizontal scroll (deltaX) or Shift + vertical scroll (deltaY)
      const isHorizontalScroll = Math.abs(e.deltaX) > Math.abs(e.deltaY)
      const isShiftVertical = e.shiftKey && Math.abs(e.deltaY) > 0
      
      if (isHorizontalScroll || isShiftVertical) {
        e.preventDefault()
        e.stopPropagation()
        
        const delta = isHorizontalScroll ? e.deltaX : -e.deltaY
        accumulatedDelta += delta
        
        // Clear existing timeout
        if (wheelTimeout) {
          clearTimeout(wheelTimeout)
        }
        
        // Apply accumulated scroll
        wheelTimeout = setTimeout(() => {
          if (slider.value && Math.abs(accumulatedDelta) > 5) {
            const currentPosition = slider.value.track.details.abs
            // Convert delta to slide movement (smaller divisor for smoother scrolling)
            const slideMovement = accumulatedDelta / 8
            const newPosition = Math.round(currentPosition + slideMovement)
            
            // Get valid range - ensure we can reach all slides
            const slidesLength = slider.value.track.details.slides.length
            const minPosition = 0
            const maxPosition = slidesLength > 0 ? slidesLength - 1 : 0
            const clampedPosition = Math.max(minPosition, Math.min(maxPosition, newPosition))
            
            slider.value.moveToIdx(clampedPosition)
            
            // Update current slide tracking using the helper function
            currentSlide.value = getClosestSlideIndex()
          }
          accumulatedDelta = 0
        }, 10)
      }
    }
    
    sliderContainer.addEventListener('wheel', handleWheel, { passive: false })
    
    onUnmounted(() => {
      sliderContainer.removeEventListener('wheel', handleWheel)
      if (wheelTimeout) {
        clearTimeout(wheelTimeout)
      }
    })
  }
})

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
