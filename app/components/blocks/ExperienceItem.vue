<template>
  <div>
    <!-- Vertical Layout -->
    <article
      v-if="layout === 'vertical' || !layout"
      class="relative animate-fade-in-up"
      :style="{ animationDelay: `${index * 0.1}s` }"
    >
      <!-- Timeline dot -->
      <div 
        class="absolute left-4 md:left-1/2 top-8 w-6 h-6 rounded-full bg-accent z-20 border-[4px] -translate-x-1/2 md:-translate-x-1/2 shadow-lg"
        :class="backgroundColor === 'primary' ? 'border-primary' : 'border-white'"
      >
        <div class="absolute inset-0 rounded-full bg-accent/50 blur-sm" />
      </div>

      <!-- Content card -->
      <div 
        class="relative ml-12 md:ml-0 md:max-w-[calc(50%-3rem)] p-8 md:p-10 rounded-2xl"
        :class="[
          index % 2 === 0 ? 'md:ml-auto md:pl-10 md:pr-4' : 'md:mr-auto md:pr-10 md:pl-4',
          backgroundColor === 'primary' 
            ? 'bg-white/10 border border-white/15' 
            : 'bg-white/98 border border-black/8',
          'shadow-[0_4px_16px_rgba(0,0,0,0.08),0_2px_8px_rgba(0,0,0,0.04)]'
        ]"
      >
        <ExperienceItemContent 
          :experience="experience"
          :index="index"
          :backgroundColor="backgroundColor"
          :layout="layout"
        />
      </div>
    </article>

    <!-- Horizontal Layout -->
    <article
      v-else
      class="keen-slider__slide relative pt-6"
    >
      <!-- Timeline dot with connecting line -->
      <div class="absolute top-12 left-0 right-0 flex items-center justify-center z-20">
        <div 
          class="absolute top-0 -bottom-10 w-[2px]"
          :class="backgroundColor === 'primary' ? 'bg-white/30' : 'bg-neutral-gray/50'"
        />
        <div 
          class="w-7 h-7 rounded-full bg-accent z-20 border-[4px] shadow-xl relative transition-all duration-300"
          :class="backgroundColor === 'primary' ? 'border-primary' : 'border-white'"
        >
          <div class="absolute inset-0 rounded-full bg-accent/60 blur-md -z-10" />
          <div class="absolute inset-2 rounded-full bg-accent" />
        </div>
      </div>

      <!-- Content card -->
      <div 
        class="relative mt-12 rounded-2xl p-6 h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
        :class="[
          backgroundColor === 'primary' 
            ? 'bg-white/10 border border-white/15 hover:bg-white/15 hover:border-white/25' 
            : 'bg-white border border-black/8 hover:border-accent/40',
          'shadow-[0_4px_12px_rgba(0,0,0,0.08),0_2px_4px_rgba(0,0,0,0.04)]',
          'min-h-[280px] flex flex-col'
        ]"
      >
        <ExperienceItemContent 
          :experience="experience"
          :index="index"
          :backgroundColor="backgroundColor"
          :layout="layout"
        />
      </div>
    </article>
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
</script>


