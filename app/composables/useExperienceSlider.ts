import { useKeenSlider } from 'keen-slider/vue.es'
import { nextTick, watch, ref, onMounted, onUnmounted } from 'vue'

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
  }

  // Initialize Keen Slider (must be called unconditionally)
  const [container, slider] = useKeenSlider({
    mode: 'free',
    loop: false,
    rubberband: true,
    drag: true,
    breakpoints: breakpoints || defaultBreakpoints,
  })

  // Track current slide for dots navigation
  const currentSlide = ref(0)

  // Get the closest slide index based on slider position
  const getClosestSlideIndex = (): number => {
    if (!slider.value || itemsCount === 0) return 0
    
    const track = slider.value.track.details
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
    if (slider.value && enabled) {
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
      
      if (itemsCount > 0) {
        currentSlide.value = 0
      }
    }
  }

  // Enable trackpad/mouse wheel horizontal scrolling
  let wheelTimeout: ReturnType<typeof setTimeout> | null = null
  let accumulatedDelta = 0

  const setupWheelScrolling = () => {
    if (!container.value || !slider.value || !enabled) return
    
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
            const currentPosition = slider.value.track.details.abs
            const slideMovement = accumulatedDelta / 8
            const newPosition = Math.round(currentPosition + slideMovement)
            
            const slidesLength = slider.value.track.details.slides.length
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
    nextTick(() => {
      setupSliderListeners()
      
      if (slider.value) {
        slider.value.update()
      }
    })
    
    watch(() => [enabled, itemsCount], () => {
      nextTick(() => {
        setupSliderListeners()
        if (slider.value) {
          slider.value.update()
        }
      })
    })
    
    const cleanup = setupWheelScrolling()
    
    onUnmounted(() => {
      cleanup?.()
    })
  })

  return {
    container,
    slider,
    currentSlide,
    goToSlide,
  }
}

