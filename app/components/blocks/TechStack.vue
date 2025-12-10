<template>
  <section 
    :id="$attrs.id as string || 'tech-stack'"
    class="section-spacing relative overflow-hidden"
    :class="backgroundColorClass"
    :style="{ scrollMarginTop: '80px' }"
  >
    <!-- Animated background gradient -->
    <div class="absolute inset-0 opacity-30">
      <div class="absolute inset-0 bg-gradient-to-br from-accent/20 via-primary/10 to-accent/20 animate-gradient-shift" />
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(0,102,255,0.15),transparent_50%)]" />
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(0,102,255,0.1),transparent_50%)]" />
    </div>

    <div class="container-custom relative z-10">
      <div class="max-w-6xl mx-auto space-y-12 md:space-y-16">
        <!-- Heading with animation -->
        <div 
          v-if="block.heading || block.description"
          class="text-center space-y-6 animate-fade-in-up"
        >
          <h2 
            v-if="block.heading" 
            class="text-section-mobile md:text-section text-primary font-title font-bold relative inline-block"
          >
            <span class="relative z-10">{{ block.heading }}</span>
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
        
        <!-- Tech Stack Categories with modern cards -->
        <div 
          v-if="groupedCategories && groupedCategories.length > 0"
          :class="layoutClass"
        >
          <div
            v-for="(category, categoryIndex) in groupedCategories"
            :key="category.category"
            class="tech-category-card group"
            :style="{ animationDelay: `${categoryIndex * 0.1}s` }"
          >
            <!-- Category header with glassmorphism -->
            <div class="category-header">
              <h3 
                class="text-xl md:text-2xl font-title font-semibold text-primary relative"
              >
                <span class="relative z-10">{{ category.categoryName }}</span>
                <span 
                  class="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-accent to-accent/50 group-hover:w-full transition-all duration-500 ease-out"
                />
              </h3>
            </div>
            
            <!-- Tech items with 3D cards -->
            <div 
              :class="itemsContainerClass"
            >
              <component
                :is="item.url ? 'a' : 'div'"
                v-for="(item, itemIndex) in category.items"
                :key="item._id"
                :href="item.url"
                :target="item.url ? '_blank' : undefined"
                :rel="item.url ? 'noopener noreferrer' : undefined"
                class="tech-item-card"
                :class="item.url ? 'cursor-pointer' : 'cursor-default'"
                :style="{ animationDelay: `${(categoryIndex * 0.1) + (itemIndex * 0.05)}s` }"
                @mouseenter="handleMouseEnter"
                @mousemove="handleMouseMove($event, itemIndex)"
                @mouseleave="handleMouseLeave"
              >
                <!-- Glow effect -->
                <div class="tech-item-glow" />
                
                <!-- Content -->
                <div class="tech-item-content">
                  <div 
                    v-if="item.icon" 
                    class="tech-item-icon"
                  >
                    <NuxtImg
                      :src="urlFor(item.icon).width(40).height(40).url()"
                      :alt="`${item.name} icon`"
                      class="w-10 h-10 object-contain"
                      sizes="40px"
                      width="40"
                      height="40"
                      format="webp"
                      loading="lazy"
                    />
                  </div>
                  <span class="tech-item-name">{{ item.name }}</span>
                </div>

                <!-- Shine effect on hover -->
                <div class="tech-item-shine" />
              </component>
            </div>
          </div>
        </div>
        
        <!-- Empty state -->
        <div 
          v-else 
          class="text-center py-16 animate-fade-in-up"
        >
          <p class="text-primary/60">No tech stack items configured.</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { TechStack, TechItem } from '~/types/sanity'

interface Props {
  block: TechStack
}

const props = defineProps<Props>()

const urlFor = useImageUrl()

const categoryLabels: Record<string, string> = {
  languages: 'Programmeertalen',
  frameworks: 'Frameworks & Libraries',
  tools: 'Tools, Platforms & Databases',
}

const layout = computed(() => props.block.layout || 'grid')

// Fetch all tech items if showAllCategories is enabled
const allTechItems = ref<TechItem[]>([])

onMounted(async () => {
  if (props.block.showAllCategories) {
    try {
      const runtime = useRuntimeConfig()
      const { createClient } = await import('@sanity/client')
      const groq = (await import('groq')).default
      
      const client = createClient({
        projectId: String(runtime.public.NUXT_PUBLIC_SANITY_PROJECT_ID || ''),
        dataset: String(runtime.public.NUXT_PUBLIC_SANITY_DATASET || 'production'),
        apiVersion: '2025-07-16',
        useCdn: true,
      })
      
      const query = groq`*[_type == "techItem"] | order(name asc) {
        _id,
        name,
        icon,
        category,
        url
      }`
      
      const items = await client.fetch<TechItem[]>(query)
      allTechItems.value = items
    } catch (error) {
      console.error('Failed to fetch all tech items:', error)
    }
  }
})

// Group tech items by category
const groupedCategories = computed(() => {
  // Use all items if showAllCategories is enabled, otherwise use selected items
  const itemsToUse = props.block.showAllCategories 
    ? allTechItems.value 
    : (props.block.techItems || [])

  if (itemsToUse.length === 0) {
    // If showAllCategories is enabled, show empty categories
    if (props.block.showAllCategories) {
      return Object.entries(categoryLabels).map(([category, categoryName]) => ({
        category,
        categoryName,
        items: [] as TechItem[],
      }))
    }
    return []
  }

  // Filter out references that weren't expanded (shouldn't happen, but safety check)
  const items = itemsToUse.filter((item): item is TechItem => 
    typeof item === 'object' && '_id' in item && 'category' in item
  ) as TechItem[]

  // Group by category
  const grouped = items.reduce((acc, item) => {
    const category = item.category || 'tools'
    if (!acc[category]) {
      acc[category] = []
    }
    acc[category].push(item)
    return acc
  }, {} as Record<string, TechItem[]>)

  // Convert to array with category names, including empty categories if showAllCategories is enabled
  const allCategories = Object.keys(categoryLabels)
  const result = allCategories.map((category) => ({
    category,
    categoryName: categoryLabels[category] || category,
    items: (grouped[category] || []).sort((a, b) => a.name.localeCompare(b.name)),
  }))

  // Filter out empty categories if showAllCategories is disabled
  if (!props.block.showAllCategories) {
    return result.filter((cat) => cat.items.length > 0)
  }

  return result
})

const layoutClass = computed(() => {
  if (layout.value === 'list') {
    return 'space-y-8'
  }
  // Grid layout
  return 'grid gap-6 md:gap-8 md:grid-cols-2 lg:grid-cols-3'
})

const itemsContainerClass = computed(() => {
  if (layout.value === 'list') {
    return 'flex flex-wrap gap-4'
  }
  // Grid layout
  return 'flex flex-wrap gap-4 justify-center'
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

// 3D tilt effect handlers
const handleMouseEnter = (event: MouseEvent) => {
  const target = event.currentTarget as HTMLElement
  if (target) {
    target.style.transition = 'transform 0.1s ease-out'
  }
}

const handleMouseMove = (event: MouseEvent, _index: number) => {
  const target = event.currentTarget as HTMLElement
  if (!target) return

  const rect = target.getBoundingClientRect()
  const x = event.clientX - rect.left
  const y = event.clientY - rect.top
  
  const centerX = rect.width / 2
  const centerY = rect.height / 2
  
  const rotateX = ((y - centerY) / centerY) * -8
  const rotateY = ((x - centerX) / centerX) * 8
  
  target.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`
  
  // Update glow position
  const glow = target.querySelector('.tech-item-glow') as HTMLElement
  if (glow) {
    const glowX = (x / rect.width) * 100
    const glowY = (y / rect.height) * 100
    glow.style.background = `radial-gradient(circle at ${glowX}% ${glowY}%, rgba(0, 102, 255, 0.4), transparent 70%)`
  }
}

const handleMouseLeave = (event: MouseEvent) => {
  const target = event.currentTarget as HTMLElement
  if (target) {
    target.style.transition = 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)'
    target.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)'
  }
}
</script>

<style scoped>
/* Fade in up animation */
@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fade-in-up 0.8s ease-out forwards;
  opacity: 0;
}

/* Gradient shift animation */
@keyframes gradient-shift {
  0%, 100% {
    transform: translate(0, 0) scale(1);
  }
  50% {
    transform: translate(20px, -20px) scale(1.1);
  }
}

.animate-gradient-shift {
  animation: gradient-shift 20s ease-in-out infinite;
}

/* Tech category card */
.tech-category-card {
  @apply relative p-6 md:p-8 rounded-2xl backdrop-blur-sm;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  animation: fade-in-up 0.8s ease-out forwards;
  opacity: 0;
  transition: all 0.3s ease;
}

.tech-category-card:hover {
  transform: translateY(-4px);
  box-shadow: 
    0 12px 40px rgba(0, 102, 255, 0.15),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
  border-color: rgba(0, 102, 255, 0.3);
}

.category-header {
  @apply mb-6 pb-4;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

/* Tech item card with 3D effect */
.tech-item-card {
  @apply relative cursor-pointer;
  animation: fade-in-up 0.6s ease-out forwards;
  opacity: 0;
  transform-style: preserve-3d;
}

.tech-item-glow {
  @apply absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300;
  pointer-events: none;
  z-index: 0;
}

.tech-item-card:hover .tech-item-glow {
  opacity: 1;
}

.tech-item-content {
  @apply relative z-10 flex items-center gap-3 px-4 py-3 rounded-xl;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.9) 100%);
  border: 1px solid rgba(0, 0, 0, 0.05);
  box-shadow: 
    0 4px 12px rgba(0, 0, 0, 0.08),
    0 2px 4px rgba(0, 0, 0, 0.04);
  transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);
  backdrop-filter: blur(10px);
}

.tech-item-card:hover .tech-item-content {
  background: linear-gradient(135deg, rgba(255, 255, 255, 1) 0%, rgba(240, 248, 255, 0.95) 100%);
  border-color: rgba(0, 102, 255, 0.2);
  box-shadow: 
    0 8px 24px rgba(0, 102, 255, 0.2),
    0 4px 8px rgba(0, 102, 255, 0.1);
}

.tech-item-icon {
  @apply flex-shrink-0;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
  transition: transform 0.3s ease;
}

.tech-item-card:hover .tech-item-icon {
  transform: scale(1.1) rotate(5deg);
}

.tech-item-name {
  @apply text-sm font-semibold text-primary;
  letter-spacing: 0.02em;
  transition: color 0.3s ease;
}

.tech-item-card:hover .tech-item-name {
  @apply text-accent;
  background: linear-gradient(135deg, #0066FF 0%, #3385FF 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Shine effect */
.tech-item-shine {
  @apply absolute inset-0 rounded-xl opacity-0 pointer-events-none;
  background: linear-gradient(
    135deg,
    transparent 0%,
    rgba(255, 255, 255, 0.3) 50%,
    transparent 100%
  );
  transform: translateX(-100%) skewX(-20deg);
  transition: all 0.6s ease;
  z-index: 20;
}

.tech-item-card:hover .tech-item-shine {
  opacity: 1;
  transform: translateX(200%) skewX(-20deg);
  transition: transform 0.6s ease;
}

/* Dark mode adjustments for primary background */
.bg-primary .tech-item-content {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.1) 100%);
  border-color: rgba(255, 255, 255, 0.1);
}

.bg-primary .tech-item-card:hover .tech-item-content {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.15) 100%);
  border-color: rgba(255, 255, 255, 0.2);
}

.bg-primary .tech-item-name {
  @apply text-neutral;
}

.bg-primary .tech-item-card:hover .tech-item-name {
  @apply text-neutral;
  background: linear-gradient(135deg, #ffffff 0%, #e0f2fe 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .tech-category-card {
    @apply p-4;
  }
  
  .tech-item-content {
    @apply px-3 py-2;
  }
  
  .tech-item-icon {
    @apply w-8 h-8;
  }
  
  .tech-item-name {
    @apply text-xs;
  }
}
</style>
