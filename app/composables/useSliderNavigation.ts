import { useKeenSlider } from 'keen-slider/vue.es'
import { nextTick, watch, ref, onMounted, onUnmounted, computed } from 'vue'

interface UseSliderNavigationOptions {
  enabled: boolean
  itemsCount: number
  breakpoints?: {
    [key: string]: {
      slides: {
        perView: number
        spacing: number
        origin: string
      }
    }
  }
}

export function useSliderNavigation(options: UseSliderNavigationOptions) {
  const { enabled, itemsCount, breakpoints } = options
  
  // Default breakpoints if none provided
  const defaultBreakpoints = {
    '(min-width: 0px)': {
      slides: {
        perView: 1.3,
        spacing: 20,
        origin: 'auto' as const,
      },
    },
    '(min-width: 640px)': {
      slides: {
        perView: 2.2,
        spacing: 24,
        origin: 'auto' as const,
      },
    },
    '(min-width: 1024px)': {
      slides: {
        perView: 3,
        spacing: 32,
        origin: 'auto' as const,
      },
    },
    '(min-width: 1280px)': {
      slides: {
        perView: 3.5,
        spacing: 36,
        origin: 'auto' as const,
      },
    },
  } as const

  // Only initialize slider if enabled and has items
  // This prevents MutationObserver errors when element doesn't exist
  const shouldInitialize = computed(() => enabled && itemsCount > 0)
  
  // Initialize Keen Slider - will only activate when container exists
  const [container, slider] = useKeenSlider({
    mode: 'free',
    loop: false,
    rubberband: true,
    drag: shouldInitialize.value,
    breakpoints: (breakpoints || defaultBreakpoints) as typeof defaultBreakpoints,
    disabled: !shouldInitialize.value,
  })

  // Track current slide for dots navigation
  const currentSlide = ref(0)

  // Get the closest slide index based on slider position
  const getClosestSlideIndex = (): number => {
    if (!slider.value || itemsCount === 0) return 0
    
    const track = slider.value.track?.details
    if (!track || track.abs === undefined || track.abs === null) return 0
    
    const abs = track.abs
    const maxIdx = itemsCount - 1
    
    const maxScrollableIdx = track.maxIdx ?? maxIdx
    
    if (abs >= maxScrollableIdx - 0.5) {
      return maxIdx
    }
    
    const roundedIdx = Math.round(abs)
    return Math.max(0, Math.min(roundedIdx, maxIdx))
  }

  // Function to navigate to a specific slide
  const goToSlide = (index: number) => {
    if (!slider.value || itemsCount === 0) return
    
    const maxIndex = itemsCount - 1
    const targetIndex = Math.max(0, Math.min(index, maxIndex))
    
    currentSlide.value = targetIndex
    
    requestAnimationFrame(() => {
      if (!slider.value) return
      
      try {
        slider.value.moveToIdx(targetIndex)
        
        setTimeout(() => {
          if (slider.value) {
            const actualIdx = getClosestSlideIndex()
            if (Math.abs(actualIdx - targetIndex) <= 1) {
              currentSlide.value = actualIdx
            } else {
              slider.value.moveToIdx(targetIndex)
              currentSlide.value = targetIndex
            }
          }
        }, 300)
      } catch (error) {
        console.warn('Error navigating to slide:', error)
        currentSlide.value = targetIndex
      }
    })
  }

  // Setup slider event listeners
  const setupSliderListeners = () => {
    if (slider.value && enabled && itemsCount > 0) {
      // Check if track is initialized before setting up listeners
      const track = slider.value.track?.details
      if (!track) {
        // Wait a bit for slider to initialize
        setTimeout(() => {
          if (slider.value?.track?.details) {
            setupSliderListeners()
          }
        }, 100)
        return
      }
      
      slider.value.on('slideChanged', () => {
        currentSlide.value = getClosestSlideIndex()
      })
      
      slider.value.on('detailsChanged', () => {
        currentSlide.value = getClosestSlideIndex()
      })
      
      slider.value.on('dragEnded', () => {
        setTimeout(() => {
          currentSlide.value = getClosestSlideIndex()
        }, 50)
      })
      
      slider.value.on('animationEnded', () => {
        currentSlide.value = getClosestSlideIndex()
      })
      
      currentSlide.value = 0
    }
  }

  // Enable trackpad/mouse wheel horizontal scrolling
  let wheelTimeout: ReturnType<typeof setTimeout> | null = null
  let accumulatedDelta = 0

  const setupWheelScrolling = (): (() => void) | null => {
    if (!container.value || !(container.value instanceof Node) || !slider.value || !enabled) return null
    
    const sliderContainer = container.value as HTMLElement
    accumulatedDelta = 0
    
    const handleWheel = (e: WheelEvent) => {
      const isHorizontalScroll = Math.abs(e.deltaX) > Math.abs(e.deltaY)
      const isShiftVertical = e.shiftKey && Math.abs(e.deltaY) > 0
      
      if (isHorizontalScroll || isShiftVertical) {
        e.preventDefault()
        e.stopPropagation()
        
        const delta = isHorizontalScroll ? e.deltaX : -e.deltaY
        accumulatedDelta += delta
        
        if (wheelTimeout) {
          clearTimeout(wheelTimeout)
        }
        
        wheelTimeout = setTimeout(() => {
          if (slider.value && Math.abs(accumulatedDelta) > 5) {
            const track = slider.value.track?.details
            if (!track || track.abs === undefined || track.abs === null) {
              accumulatedDelta = 0
              return
            }
            
            const currentPosition = track.abs
            const slideMovement = accumulatedDelta / 8
            const newPosition = Math.round(currentPosition + slideMovement)
            
            const slidesLength = track.slides?.length ?? 0
            const minPosition = 0
            const maxPosition = slidesLength > 0 ? slidesLength - 1 : 0
            const clampedPosition = Math.max(minPosition, Math.min(maxPosition, newPosition))
            
            slider.value.moveToIdx(clampedPosition)
            currentSlide.value = getClosestSlideIndex()
          }
          accumulatedDelta = 0
        }, 10)
      }
    }
    
    sliderContainer.addEventListener('wheel', handleWheel, { passive: false })
    
    return () => {
      sliderContainer.removeEventListener('wheel', handleWheel)
      if (wheelTimeout) {
        clearTimeout(wheelTimeout)
      }
    }
  }

  onMounted(() => {
    // Wait for DOM to be ready and container to exist
    nextTick(() => {
      // Only setup if container element exists and is a valid Node
      if (container.value && container.value instanceof Node && enabled && itemsCount > 0) {
        setupSliderListeners()
        
        if (slider.value) {
          slider.value.update()
        }
      }
    })
    
    // Watch for changes in enabled state or items count
    watch(() => [enabled, itemsCount], () => {
      nextTick(() => {
        if (container.value && container.value instanceof Node && enabled && itemsCount > 0) {
          setupSliderListeners()
          if (slider.value) {
            slider.value.update()
          }
        }
      })
    })
    
    // Watch for container element to become available
    watch(container, (newContainer) => {
      if (newContainer && newContainer instanceof Node && enabled && itemsCount > 0) {
        nextTick(() => {
          setupSliderListeners()
          if (slider.value) {
            slider.value.update()
          }
        })
      }
    }, { immediate: true })
    
    // Setup wheel scrolling only when container is ready
    let cleanup: (() => void) | null = null
    const setupWheelWhenReady = () => {
      if (container.value && container.value instanceof Node && enabled && itemsCount > 0) {
        const cleanupFn = setupWheelScrolling()
        cleanup = cleanupFn || null
      }
    }
    
    nextTick(() => {
      setupWheelWhenReady()
    })
    
    onUnmounted(() => {
      if (cleanup) {
        cleanup()
      }
    })
  })

  return {
    container,
    slider,
    currentSlide,
    goToSlide,
  }
}
