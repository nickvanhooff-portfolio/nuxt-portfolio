<template>
  <section 
    :id="($attrs.id as string) || `experience-${props.block._key || 'default'}`"
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
          <div v-if="block.layout === 'vertical' || !block.layout">
            <div class="absolute left-4 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-[3px] bg-neutral-gray z-0" />
            <div class="space-y-16 md:space-y-20">
              <ExperienceItem
                v-for="(experience, index) in sortedExperiences"
                :key="`vertical-${index}`"
                :experience="experience"
                :index="index"
                :background-color="block.backgroundColor"
                :layout="block.layout"
              />
            </div>
          </div>

          <!-- Horizontal Timeline with Swiper -->
          <ClientOnly v-else-if="block.layout === 'horizontal'">
                <div>
                  <div class="relative py-12 md:py-16">
                    <!-- Scroll hint text -->
                    <div class="absolute top-0 right-8 z-30 pointer-events-none hidden md:flex items-center gap-2 text-xs text-primary/60" aria-hidden="true">
                      <span>Swipe to explore</span>
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
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

                    <!-- Swiper Container -->
                    <div 
                      ref="container" 
                      class="swiper pb-16 cursor-grab active:cursor-grabbing select-none relative z-10"
                    >
                      <div class="swiper-wrapper">
                        <div
                          v-for="(experience, index) in sortedExperiences"
                          :key="`swiper-${block._key || 'default'}-${(experience as any)._key || index}`"
                          class="swiper-slide"
                          :style="{ width: 'auto', minWidth: '280px', maxWidth: '400px' }"
                        >
                          <ExperienceItem
                            :experience="experience"
                            :index="index"
                            :background-color="block.backgroundColor"
                            :layout="block.layout"
                          />
                        </div>
                      </div>
                    </div>
                    
                    <!-- Swiper Pagination (Navigation dots) -->
                    <div 
                      v-if="sortedExperiences.length > 1"
                      class="swiper-pagination mt-10 relative z-50"
                    />
                  </div>
                </div>
                <template #fallback>
                  <div class="relative py-12 md:py-16">
                    <div class="flex gap-6 overflow-x-auto pb-16">
                      <ExperienceItem
                        v-for="(experience, index) in sortedExperiences"
                        :key="`fallback-${block._key || 'default'}-${(experience as any)._key || index}`"
                        :experience="experience"
                        :index="index"
                        :background-color="block.backgroundColor"
                        :layout="block.layout"
                      />
                    </div>
                  </div>
                </template>
              </ClientOnly>
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
import ExperienceItem from './ExperienceItem.vue'
import { computed, ref, onMounted, nextTick, onUnmounted } from 'vue'

interface Props {
  block: Experience
}

const props = defineProps<Props>()


// Sort experiences by start date (oldest first - chronological order)
const sortedExperiences = computed(() => {
  if (!props.block.experiences) {
    if (process.dev) {
      console.warn('Experience block has no experiences array:', props.block)
    }
    return []
  }
  
  // Filter out any invalid experiences
  const validExperiences = props.block.experiences.filter((exp: any) => {
    return exp && exp.title && exp.company && exp.startDate
  })
  
  if (process.dev && validExperiences.length !== props.block.experiences.length) {
    console.warn('Some experiences were filtered out:', {
      total: props.block.experiences.length,
      valid: validExperiences.length
    })
  }
  
  return [...validExperiences].sort((a, b) => {
    // Parse dates directly from strings to avoid timezone issues
    // Format: YYYY-MM-DD, so string comparison works for chronological sorting
    const dateA = a.startDate || ''
    const dateB = b.startDate || ''
    
    // If dates are in YYYY-MM-DD format, string comparison works perfectly
    if (dateA < dateB) return -1
    if (dateA > dateB) return 1
    return 0
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

// Initialize Keen Slider directly in the component
// Only enable if layout is horizontal AND there are experiences
const isHorizontalLayout = computed(() => props.block.layout === 'horizontal')
const hasExperiences = computed(() => sortedExperiences.value.length > 0)

const container = ref<HTMLElement | null>(null)
const slider = ref<any>(null)
const currentSlide = ref(0)

// Initialize Swiper on mount
onMounted(async () => {
  if (process.server || !isHorizontalLayout.value || !hasExperiences.value) return
  
  // Wait for ClientOnly to render and container to be available
  await nextTick()
  await nextTick() // Extra tick for ClientOnly
  
  // Ensure container is a valid DOM node before initializing
  if (!container.value || !(container.value instanceof HTMLElement)) {
    // Retry after a short delay
    setTimeout(() => {
      if (container.value && container.value instanceof HTMLElement) {
        initializeSwiperAsync()
      }
    }, 100)
    return
  }
  
  initializeSwiperAsync()
})

// Async function to initialize Swiper
const initializeSwiperAsync = async () => {
  // Double-check container is valid
  if (!container.value || !(container.value instanceof HTMLElement)) {
    console.warn('Container is not a valid DOM element')
    return
  }
  
  try {
    // Dynamically import Swiper
    // @ts-ignore - Swiper types may not be available immediately
    const SwiperModule = await import('swiper')
    // @ts-ignore
    const ModulesModule = await import('swiper/modules')
    const Swiper = SwiperModule.Swiper || SwiperModule.default
    const FreeMode = ModulesModule.FreeMode || ModulesModule.default?.FreeMode
    const Pagination = ModulesModule.Pagination || ModulesModule.default?.Pagination
    const Mousewheel = ModulesModule.Mousewheel || ModulesModule.default?.Mousewheel
    
    if (!Swiper) {
      console.warn('Swiper module not loaded')
      return
    }
    
    initializeSwiper(Swiper, FreeMode, Pagination, Mousewheel)
  } catch (error) {
    console.warn('Failed to initialize Swiper:', error)
  }
}

// Helper function to initialize Swiper
const initializeSwiper = (Swiper: any, FreeMode: any, Pagination: any, Mousewheel: any) => {
  // Ensure container is a valid DOM node
  if (!container.value || !(container.value instanceof HTMLElement) || !Swiper) {
    console.warn('Cannot initialize Swiper: invalid container or Swiper instance')
    return
  }
  
  try {
    // Initialize Swiper with proper configuration for horizontal scrolling
    slider.value = new Swiper(container.value, {
      modules: [FreeMode, Pagination, Mousewheel].filter(Boolean),
      slidesPerView: 'auto', // Let Swiper calculate based on slide width
      spaceBetween: 20,
      freeMode: FreeMode ? {
        enabled: true,
        sticky: false,
        momentum: true,
        momentumRatio: 0.5,
        momentumBounce: true,
        momentumBounceRatio: 0.5,
      } : false,
      mousewheel: Mousewheel ? {
        enabled: true,
        forceToAxis: true, // Only scroll horizontally
        sensitivity: 1,
        releaseOnEdges: false,
        eventsTarget: 'container', // Listen to wheel events on the container
      } : false,
      pagination: Pagination && hasExperiences.value ? {
        el: container.value.querySelector('.swiper-pagination') || undefined,
        clickable: true,
        dynamicBullets: false,
        bulletClass: 'swiper-pagination-bullet',
        bulletActiveClass: 'swiper-pagination-bullet-active',
        renderBullet: function (index: number, className: string) {
          const year = getYear(index)
          return `<button class="${className}" type="button" aria-label="Go to experience from ${year}"><span class="sr-only">Navigate to experience from ${year}</span></button>`
        },
      } : false,
      breakpoints: {
        640: {
          spaceBetween: 24,
        },
        1024: {
          spaceBetween: 32,
        },
        1280: {
          spaceBetween: 36,
        },
      },
      grabCursor: true,
      watchOverflow: true,
      resistance: true,
      resistanceRatio: 0.85,
      direction: 'horizontal', // Explicitly set horizontal direction
    })
    
    // Setup slide change listener
    if (slider.value) {
      slider.value.on('slideChange', () => {
        currentSlide.value = slider.value.activeIndex || 0
      })
      
      // Update slider after initialization
      nextTick(() => {
        if (slider.value) {
          slider.value.update()
        }
      })
    }
  } catch (error) {
    console.warn('Error initializing Swiper:', error)
  }
}

// Cleanup on unmount
onUnmounted(() => {
  if (slider.value) {
    slider.value.destroy(true, true)
    slider.value = null
  }
})

// Function to navigate to a specific slide
const goToSlide = (index: number) => {
  if (!slider.value || sortedExperiences.value.length === 0) return
  
  const maxIndex = sortedExperiences.value.length - 1
  const targetIndex = Math.max(0, Math.min(index, maxIndex))
  
  currentSlide.value = targetIndex
  
  requestAnimationFrame(() => {
    if (slider.value) {
      slider.value.moveToIdx(targetIndex)
    }
  })
}

    // Create a computed map of years for consistent rendering
    // Parse dates consistently to avoid hydration mismatches
    const experienceYears = computed(() => {
      return sortedExperiences.value.reduce((acc, exp, idx) => {
        if (!exp.startDate) {
          acc[idx] = ''
          return acc
        }
        try {
          // Parse date string consistently (format: YYYY-MM-DD)
          const parts = exp.startDate.split('-')
          if (parts.length < 1) {
            acc[idx] = ''
            return acc
          }
          const yearNum = Number.parseInt(parts[0] || '0', 10)
          if (!yearNum || yearNum === 0) {
            acc[idx] = ''
            return acc
          }
          acc[idx] = yearNum.toString()
        } catch (error) {
          if (process.dev) {
            console.warn('Error extracting year for experience:', error, exp)
          }
          acc[idx] = ''
        }
        return acc
      }, {} as Record<number, string>)
    })

    const getYear = (index: number): string => {
      return experienceYears.value[index] || ''
    }
</script>

