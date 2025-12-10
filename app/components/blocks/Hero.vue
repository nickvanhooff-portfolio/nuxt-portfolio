<template>
  <section 
    :id="$attrs.id as string || 'home'"
    class="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#0a0a0f] via-[#111827] to-[#0f172a]"
    :style="{ scrollMarginTop: '80px' }"
  >
    <!-- Static gradient background -->
    <div class="absolute w-[500px] h-[500px] rounded-full blur-[80px] opacity-30 bg-[radial-gradient(circle,#6366f1_0%,transparent_70%)] -top-[200px] -left-[200px]" />
    <div class="absolute w-[400px] h-[400px] rounded-full blur-[80px] opacity-30 bg-[radial-gradient(circle,#8b5cf6_0%,transparent_70%)] -bottom-[150px] -right-[150px]" />
    <div class="absolute w-[350px] h-[350px] rounded-full blur-[80px] opacity-30 bg-[radial-gradient(circle,#06b6d4_0%,transparent_70%)] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

    <!-- Grid pattern overlay -->
    <div class="absolute inset-0 grid-pattern opacity-5" />
    
    <!-- Circuit/connection lines pattern -->
    <svg class="circuit-pattern" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id="circuitGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#6366f1;stop-opacity:0.1" />
          <stop offset="100%" style="stop-color:#8b5cf6;stop-opacity:0.05" />
        </linearGradient>
      </defs>
      <!-- Subtle connection lines -->
      <path d="M100,200 Q300,150 500,200 T900,200" stroke="url(#circuitGradient)" stroke-width="1" fill="none" opacity="0.3" />
      <path d="M200,400 Q400,350 600,400 T1000,400" stroke="url(#circuitGradient)" stroke-width="1" fill="none" opacity="0.2" />
      <path d="M150,600 Q350,550 550,600 T950,600" stroke="url(#circuitGradient)" stroke-width="1" fill="none" opacity="0.25" />
      <!-- Connection nodes -->
      <circle cx="300" cy="200" r="2" fill="#6366f1" opacity="0.2" />
      <circle cx="600" cy="400" r="2" fill="#8b5cf6" opacity="0.15" />
      <circle cx="550" cy="600" r="2" fill="#6366f1" opacity="0.2" />
    </svg>

    <!-- Optional background image -->
    <div 
      v-if="block.backgroundImage" 
      class="absolute inset-0 z-0"
    >
      <NuxtImg
        :src="urlFor(block.backgroundImage).width(1280).height(720).url()"
        :alt="block.heading || 'Hero background'"
        class="w-full h-full object-cover opacity-10"
        sizes="100vw"
        width="1280"
        height="720"
        format="webp"
        :quality="60"
        loading="eager"
        fetchpriority="high"
        aria-hidden="true"
      />
    </div>
    
    <!-- Main content -->
    <div class="container-content relative z-10">
      <div class="max-w-4xl mx-auto text-center">
        
        <!-- Code-style heading -->
        <div class="mb-8">
          <div class="flex justify-center items-center gap-4 font-mono text-sm md:text-base text-left">
            <div class="text-gray-500 select-none min-w-[24px] text-right">1</div>
            <div class="flex items-center flex-wrap justify-center gap-1">
              <span class="text-[#c678dd]">const</span>
              <span class="w-1" />
              <span class="text-[#61afef]">developer</span>
              <span class="w-1" />
              <span class="text-[#56b6c2]">=</span>
              <span class="w-1" />
              <span class="text-[#98c379]">'</span>
              <h1 class="inline text-[clamp(2.5rem,8vw,5rem)] font-extrabold text-slate-50 leading-tight tracking-tight mx-1">
                {{ block.heading }}
              </h1>
              <span class="text-[#98c379]">'</span>
              <span class="text-[#abb2bf]">;</span>
            </div>
          </div>
        </div>
        
        <!-- Subheading with code-style brackets -->
        <p v-if="block.subheading" class="text-[clamp(1rem,2.5vw,1.5rem)] text-slate-200/80 leading-relaxed my-6 mx-auto max-w-[600px]">
          <span class="text-indigo-500 font-semibold text-[1.2em] mx-1">{</span>
          <span class="text-slate-50/90">{{ block.subheading }}</span>
          <span class="text-indigo-500 font-semibold text-[1.2em] mx-1">}</span>
        </p>
        
        <!-- CTA Button styled as code -->
        <div 
          v-if="block.ctaButton?.text && block.ctaButton?.url" 
          class="mt-10"
        >
          <a 
            :href="block.ctaButton.url"
            :aria-label="`${block.ctaButton.text} - ${block.heading || 'Portfolio'}`"
            class="inline-flex items-center gap-1.5 px-8 py-4 bg-indigo-500/10 border border-indigo-500/30 rounded-lg font-mono text-sm md:text-base no-underline transition-all duration-300 ease-in-out backdrop-blur-sm hover:bg-indigo-500/20 hover:border-indigo-500 hover:-translate-y-0.5 hover:shadow-[0_10px_40px_rgba(99,102,241,0.3)] focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 group"
          >
            <span class="text-[#c678dd]">explore</span>
            <span class="w-1.5" />
            <span class="text-[#e06c75]">(</span>
            <span class="text-[#98c379]">'{{ block.ctaButton.text }}'</span>
            <span class="text-[#e06c75]">)</span>
            <span class="text-green-500 transition-transform duration-300 ease-in-out ml-1 group-hover:translate-x-1">→</span>
          </a>
        </div>
      </div>
    </div>
    
    <!-- Floating code snippets -->
    <div class="absolute top-[20%] right-[8%] font-mono text-[11px] py-1.5 px-3 bg-gray-900/60 border border-indigo-500/15 rounded-md opacity-50 backdrop-blur-sm z-[1]" aria-hidden="true">
      <span class="text-purple-400">function</span> <span class="text-cyan-400">learn</span>() { }
    </div>
    <div class="absolute bottom-[30%] left-[8%] font-mono text-[11px] py-1.5 px-3 bg-gray-900/60 border border-indigo-500/15 rounded-md opacity-50 backdrop-blur-sm z-[1]" aria-hidden="true">
      <span class="text-green-400">// building</span> <span class="text-gray-400">amazing things</span>
    </div>
    <div class="absolute top-[35%] left-[5%] font-mono text-[11px] py-1.5 px-3 bg-gray-900/60 border border-indigo-500/15 rounded-md opacity-50 backdrop-blur-sm z-[1]" aria-hidden="true">
      <span class="text-amber-400">let</span> <span class="text-cyan-400">passion</span> = <span class="text-pink-400">true</span>;
    </div>

    <!-- Gradient overlays -->
    <div class="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-primary z-[2] pointer-events-none" />
    <div class="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-accent/5 via-transparent to-transparent z-[1] pointer-events-none" />
  </section>
</template>

<script setup lang="ts">
import type { Hero } from '~/types/sanity'

interface Props {
  block: Hero
}

defineProps<Props>()

const urlFor = useImageUrl()
</script>

<style scoped>
.circuit-pattern {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  pointer-events: none;
}

/* Grid pattern */
.grid-pattern {
  background-image: 
    linear-gradient(rgba(99, 102, 241, 0.1) 1px, transparent 1px),
    linear-gradient(90deg, rgba(99, 102, 241, 0.1) 1px, transparent 1px);
  background-size: 50px 50px;
}
</style>
