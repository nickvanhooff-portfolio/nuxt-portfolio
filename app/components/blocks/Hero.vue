<template>
  <section class="hero-section relative min-h-screen flex items-center justify-center overflow-hidden">
    <!-- Animated gradient background -->
    <div class="gradient-orb gradient-orb-1" />
    <div class="gradient-orb gradient-orb-2" />
    <div class="gradient-orb gradient-orb-3" />

    <!-- Subtle code background pattern -->
    <div class="code-background">
      <div v-for="i in 12" :key="i" class="code-line" :style="{ '--delay': `${i * 0.2}s` }">
        <span class="code-comment">//</span>
        <span class="code-text">{{ getCodeSnippet(i) }}</span>
      </div>
    </div>

    <!-- Grid pattern overlay -->
    <div class="absolute inset-0 grid-pattern opacity-5" />
    
    <!-- Circuit/connection lines pattern -->
    <svg class="circuit-pattern" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">
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
      v-if="block.backgroundImage && urlFor" 
      class="absolute inset-0 z-0"
    >
      <img
        :src="urlFor(block.backgroundImage).width(1920).height(1080).url()"
        :alt="block.heading || 'Hero background'"
        class="w-full h-full object-cover opacity-10"
      >
    </div>
    
    <!-- Main content -->
    <div class="container-content relative z-10">
      <div class="max-w-4xl mx-auto text-center">
        
        <!-- Code-style heading -->
        <div class="code-wrapper">
          <div class="code-block">
            <div class="code-line-number">1</div>
            <div class="code-content">
              <span class="code-keyword">const</span>
              <span class="code-space"> </span>
              <span class="code-variable">developer</span>
              <span class="code-space"> </span>
              <span class="code-operator">=</span>
              <span class="code-space"> </span>
              <span class="code-string">'</span>
              <h1 class="hero-title inline">
                {{ block.heading }}
              </h1>
              <span class="code-string">'</span>
              <span class="code-semicolon">;</span>
            </div>
          </div>
        </div>
        
        <!-- Subheading with code-style brackets -->
        <p v-if="block.subheading" class="hero-subheading">
          <span class="code-bracket">{</span>
          <span class="subheading-text">{{ block.subheading }}</span>
          <span class="code-bracket">}</span>
        </p>
        
        <!-- CTA Button styled as code -->
        <div 
          v-if="block.ctaButton?.text && block.ctaButton?.url" 
          class="hero-cta"
        >
          <a 
            :href="block.ctaButton.url"
            class="code-button group"
          >
            <span class="code-keyword">explore</span>
            <span class="code-space"> </span>
            <span class="code-function">(</span>
            <span class="code-string">'{{ block.ctaButton.text }}'</span>
            <span class="code-function">)</span>
            <span class="code-arrow">→</span>
          </a>
        </div>
      </div>
    </div>

    <!-- Floating code snippets (subtle) -->
    <div class="floating-code floating-code-1">
      <span class="text-purple-400">function</span> <span class="text-cyan-400">learn</span>() { }
    </div>
    <div class="floating-code floating-code-2">
      <span class="text-green-400">// building</span> <span class="text-gray-400">amazing things</span>
    </div>
    <div class="floating-code floating-code-3">
      <span class="text-amber-400">let</span> <span class="text-cyan-400">passion</span> = <span class="text-pink-400">true</span>;
    </div>

    <!-- Gradient overlays -->
    <div class="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-primary z-[2] pointer-events-none" />
    <div class="absolute inset-0 bg-gradient-radial from-accent/5 via-transparent to-transparent z-[1] pointer-events-none" />
  </section>
</template>

<script setup lang="ts">
import type { Hero, UrlBuilder } from '~/types/sanity'

interface Props {
  block: Hero
  urlFor: UrlBuilder
}

defineProps<Props>()

const codeSnippets = [
  'Building modern web applications',
  'Learning new technologies',
  'Creating user-friendly interfaces',
  'Solving complex problems',
  'Writing clean code',
  'Exploring frameworks',
  'Designing experiences',
  'Crafting solutions',
  'Developing skills',
  'Making ideas reality',
  'Building the future',
  'Code. Create. Learn.'
]

const getCodeSnippet = (index: number) => {
  return codeSnippets[(index - 1) % codeSnippets.length]
}
</script>

<style scoped>
.hero-section {
  background: linear-gradient(135deg, #0a0a0f 0%, #111827 50%, #0f172a 100%);
  position: relative;
}

/* Animated gradient orbs */
.gradient-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.3;
  animation: float-orb 20s ease-in-out infinite;
}

.gradient-orb-1 {
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, #6366f1 0%, transparent 70%);
  top: -200px;
  left: -200px;
  animation-delay: 0s;
}

.gradient-orb-2 {
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, #8b5cf6 0%, transparent 70%);
  bottom: -150px;
  right: -150px;
  animation-delay: 7s;
}

.gradient-orb-3 {
  width: 350px;
  height: 350px;
  background: radial-gradient(circle, #06b6d4 0%, transparent 70%);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation-delay: 14s;
}

@keyframes float-orb {
  0%, 100% {
    transform: translate(0, 0) scale(1);
  }
  33% {
    transform: translate(30px, -30px) scale(1.1);
  }
  66% {
    transform: translate(-20px, 20px) scale(0.9);
  }
}

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

/* Code background */
.code-background {
  position: absolute;
  inset: 0;
  padding: 40px;
  opacity: 0.08;
  z-index: 0;
  font-family: 'JetBrains Mono', 'Fira Code', monospace;
  font-size: 12px;
  line-height: 2;
  overflow: hidden;
}

.code-line {
  opacity: 0;
  animation: fade-in-line 1s ease-out forwards;
  animation-delay: var(--delay);
}

.code-comment {
  color: #6b7280;
  margin-right: 12px;
}

.code-text {
  color: #9ca3af;
}

@keyframes fade-in-line {
  to {
    opacity: 0.3;
  }
}

/* Code wrapper for heading */
.code-wrapper {
  margin-bottom: 32px;
  animation: fade-in-up 0.8s ease-out;
}

.code-block {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  font-family: 'JetBrains Mono', 'Fira Code', monospace;
  font-size: clamp(0.875rem, 2vw, 1rem);
  text-align: left;
}

.code-line-number {
  color: #6b7280;
  user-select: none;
  min-width: 24px;
  text-align: right;
}

.code-content {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: center;
  gap: 4px;
}

.code-keyword {
  color: #c678dd;
}

.code-variable {
  color: #61afef;
}

.code-operator {
  color: #56b6c2;
}

.code-string {
  color: #98c379;
}

.code-space {
  width: 4px;
}

.code-semicolon {
  color: #abb2bf;
}

.hero-title {
  font-size: clamp(2.5rem, 8vw, 5rem);
  font-weight: 800;
  color: #f8fafc;
  line-height: 1.1;
  letter-spacing: -0.02em;
  display: inline;
  margin: 0 4px;
}

/* Subheading */
.hero-subheading {
  font-size: clamp(1rem, 2.5vw, 1.5rem);
  color: rgba(248, 250, 252, 0.8);
  line-height: 1.6;
  margin: 24px auto 32px;
  max-width: 600px;
  animation: fade-in-up 0.8s ease-out 0.2s both;
}

.code-bracket {
  color: #6366f1;
  font-weight: 600;
  font-size: 1.2em;
  margin: 0 4px;
}

.subheading-text {
  color: rgba(248, 250, 252, 0.9);
}

/* CTA Button */
.hero-cta {
  margin-top: 40px;
  animation: fade-in-up 0.8s ease-out 0.4s both;
}

.code-button {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 16px 32px;
  background: rgba(99, 102, 241, 0.1);
  border: 1px solid rgba(99, 102, 241, 0.3);
  border-radius: 8px;
  font-family: 'JetBrains Mono', 'Fira Code', monospace;
  font-size: clamp(0.875rem, 1.5vw, 1rem);
  text-decoration: none;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.code-button:hover {
  background: rgba(99, 102, 241, 0.2);
  border-color: #6366f1;
  transform: translateY(-2px);
  box-shadow: 0 10px 40px rgba(99, 102, 241, 0.3);
}

.code-function {
  color: #e06c75;
}

.code-arrow {
  color: #22c55e;
  transition: transform 0.3s ease;
  margin-left: 4px;
}

.code-button:hover .code-arrow {
  transform: translateX(4px);
}

/* Floating code snippets */
.floating-code {
  position: absolute;
  font-family: 'JetBrains Mono', 'Fira Code', monospace;
  font-size: 11px;
  padding: 6px 12px;
  background: rgba(17, 24, 39, 0.6);
  border: 1px solid rgba(99, 102, 241, 0.15);
  border-radius: 6px;
  opacity: 0;
  animation: float-in 0.6s ease-out forwards;
  backdrop-filter: blur(8px);
  z-index: 1;
}

.floating-code-1 {
  top: 20%;
  right: 8%;
  animation-delay: 1.2s;
  animation-name: float-in, float-y;
  animation-duration: 0.6s, 8s;
  animation-timing-function: ease-out, ease-in-out;
  animation-fill-mode: forwards, forwards;
  animation-iteration-count: 1, infinite;
  animation-delay: 1.2s, 1.8s;
}

.floating-code-2 {
  bottom: 30%;
  left: 8%;
  animation-delay: 1.6s;
  animation-name: float-in, float-y-reverse;
  animation-duration: 0.6s, 9s;
  animation-timing-function: ease-out, ease-in-out;
  animation-fill-mode: forwards, forwards;
  animation-iteration-count: 1, infinite;
  animation-delay: 1.6s, 2.2s;
}

.floating-code-3 {
  top: 35%;
  left: 5%;
  animation-delay: 2s;
  animation-name: float-in, float-y;
  animation-duration: 0.6s, 7s;
  animation-timing-function: ease-out, ease-in-out;
  animation-fill-mode: forwards, forwards;
  animation-iteration-count: 1, infinite;
  animation-delay: 2s, 2.6s;
}

@keyframes float-in {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 0.5;
    transform: translateY(0);
  }
}

@keyframes float-y {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}

@keyframes float-y-reverse {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(8px); }
}

/* Animations */
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

/* Radial gradient helper */
.bg-gradient-radial {
  background: radial-gradient(circle at center, var(--tw-gradient-from), var(--tw-gradient-via), var(--tw-gradient-to));
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .code-block {
    flex-direction: column;
    gap: 8px;
  }
  
  .code-line-number {
    display: none;
  }
  
  .floating-code {
    display: none;
  }
  
  .code-background {
    padding: 20px;
    font-size: 10px;
  }
  
  .code-button {
    padding: 12px 24px;
  }
}
</style>
