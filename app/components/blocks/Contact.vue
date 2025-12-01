<template>
  <section 
    :id="$attrs.id as string || 'contact'"
    class="section-spacing relative overflow-hidden"
    :class="backgroundColorClass"
    :style="{ scrollMarginTop: '80px' }"
  >
    <!-- Background gradient -->
    <div class="absolute inset-0 opacity-30">
      <div class="absolute inset-0 bg-gradient-to-br from-accent/20 via-primary/10 to-accent/20" />
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
        
        <!-- Content Grid -->
        <div 
          class="grid gap-8 md:gap-12"
          :class="layoutClass"
        >
          <!-- Contact Form Card -->
          <div 
            v-if="showForm"
            class="relative p-6 md:p-8 rounded-2xl backdrop-blur-sm bg-gradient-to-br from-white/10 to-white/5 border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.1)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,102,255,0.15),inset_0_1px_0_rgba(255,255,255,0.2)] hover:border-accent/30 group animate-fade-in-up"
            :style="{ animationDelay: '0.1s' }"
          >
            <div class="relative z-10">
              <h3 class="text-xl md:text-2xl font-title font-semibold text-primary mb-6 relative">
                <span class="relative z-10">Stuur een bericht</span>
                <span 
                  class="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-accent to-accent/50 group-hover:w-full transition-all duration-500 ease-out"
                />
              </h3>
              <form
                :action="block.formAction || '#'"
                method="POST"
                class="space-y-5"
                @submit.prevent="handleSubmit"
              >
                <div class="space-y-2">
                  <label 
                    for="name"
                    class="block text-sm font-medium text-primary/80"
                  >
                    Naam *
                  </label>
                  <input
                    id="name"
                    v-model="formData.name"
                    type="text"
                    name="name"
                    required
                    class="w-full px-4 py-3 rounded-xl border border-black/10 bg-white/5 text-primary placeholder-primary/40 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent/50 focus:bg-white/8 focus:shadow-[0_0_0_3px_rgba(0,102,255,0.1)]"
                    placeholder="Je naam"
                  />
                </div>
                
                <div class="space-y-2">
                  <label 
                    for="email"
                    class="block text-sm font-medium text-primary/80"
                  >
                    Email *
                  </label>
                  <input
                    id="email"
                    v-model="formData.email"
                    type="email"
                    name="email"
                    required
                    class="w-full px-4 py-3 rounded-xl border border-black/10 bg-white/5 text-primary placeholder-primary/40 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent/50 focus:bg-white/8 focus:shadow-[0_0_0_3px_rgba(0,102,255,0.1)]"
                    placeholder="je@email.com"
                  />
                </div>
                
                <div class="space-y-2">
                  <label 
                    for="message"
                    class="block text-sm font-medium text-primary/80"
                  >
                    Bericht *
                  </label>
                  <textarea
                    id="message"
                    v-model="formData.message"
                    name="message"
                    required
                    rows="6"
                    class="w-full px-4 py-3 rounded-xl border border-black/10 bg-white/5 text-primary placeholder-primary/40 transition-all duration-200 resize-y focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent/50 focus:bg-white/8 focus:shadow-[0_0_0_3px_rgba(0,102,255,0.1)]"
                    placeholder="Je bericht..."
                  />
                </div>
                
                <button
                  type="submit"
                  :disabled="isSubmitting"
                  class="relative px-8 py-3 rounded-xl font-semibold text-neutral transition-all duration-300 overflow-hidden bg-gradient-to-r from-accent to-accent-dark shadow-[0_4px_16px_rgba(0,102,255,0.3),0_2px_4px_rgba(0,102,255,0.2)] hover:shadow-[0_8px_24px_rgba(0,102,255,0.4),0_4px_8px_rgba(0,102,255,0.3)] hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                >
                  <span v-if="!isSubmitting">Verstuur</span>
                  <span v-else>Verzenden...</span>
                </button>
                
                <div 
                  v-if="submitMessage"
                  class="px-4 py-3 rounded-xl text-sm font-medium"
                  :class="submitMessageType === 'success' ? 'bg-green-500/10 text-green-600 border border-green-500/20' : 'bg-red-500/10 text-red-600 border border-red-500/20'"
                >
                  {{ submitMessage }}
                </div>
              </form>
            </div>
          </div>
          
          <!-- Contact Info Card -->
          <div 
            v-if="showInfo"
            class="relative p-6 md:p-8 rounded-2xl backdrop-blur-sm bg-gradient-to-br from-white/10 to-white/5 border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.1)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,102,255,0.15),inset_0_1px_0_rgba(255,255,255,0.2)] hover:border-accent/30 group animate-fade-in-up"
            :style="{ animationDelay: '0.2s' }"
          >
            <div class="relative z-10">
              <h3 class="text-xl md:text-2xl font-title font-semibold text-primary mb-6 relative">
                <span class="relative z-10">Contactinformatie</span>
                <span 
                  class="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-accent to-accent/50 group-hover:w-full transition-all duration-500 ease-out"
                />
              </h3>
              
              <div class="space-y-5">
                <!-- Email -->
                <div 
                  v-if="block.contactInfo?.email"
                  class="flex items-start gap-4 p-4 rounded-xl transition-all duration-200 bg-white/3 border border-black/5 hover:bg-white/6 hover:border-accent/20 hover:translate-x-1 group/item"
                >
                  <div class="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-200 bg-gradient-to-br from-accent/15 to-accent/10 border border-accent/20 group-hover/item:scale-105 group-hover/item:shadow-[0_4px_12px_rgba(0,102,255,0.2)]">
                    <svg class="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div class="flex-1">
                    <p class="text-xs font-medium text-primary/60 mb-1 uppercase tracking-wide">Email</p>
                    <a 
                      :href="`mailto:${block.contactInfo.email}`"
                      class="text-base font-medium text-primary hover:text-accent transition-colors duration-200 inline-flex items-center gap-2 group-hover/item:translate-x-1"
                    >
                      {{ block.contactInfo.email }}
                      <svg class="w-4 h-4 opacity-0 group-hover/item:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </a>
                  </div>
                </div>
                
                <!-- Phone -->
                <div 
                  v-if="block.contactInfo?.phone"
                  class="flex items-start gap-4 p-4 rounded-xl transition-all duration-200 bg-white/3 border border-black/5 hover:bg-white/6 hover:border-accent/20 hover:translate-x-1 group/item"
                >
                  <div class="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-200 bg-gradient-to-br from-accent/15 to-accent/10 border border-accent/20 group-hover/item:scale-105 group-hover/item:shadow-[0_4px_12px_rgba(0,102,255,0.2)]">
                    <svg class="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div class="flex-1">
                    <p class="text-xs font-medium text-primary/60 mb-1 uppercase tracking-wide">Telefoon</p>
                    <a 
                      :href="`tel:${block.contactInfo.phone}`"
                      class="text-base font-medium text-primary hover:text-accent transition-colors duration-200 inline-flex items-center gap-2 group-hover/item:translate-x-1"
                    >
                      {{ block.contactInfo.phone }}
                      <svg class="w-4 h-4 opacity-0 group-hover/item:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </a>
                  </div>
                </div>
                
                <!-- Location -->
                <div 
                  v-if="block.contactInfo?.location"
                  class="flex items-start gap-4 p-4 rounded-xl transition-all duration-200 bg-white/3 border border-black/5 hover:bg-white/6 hover:border-accent/20 hover:translate-x-1 group/item"
                >
                  <div class="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-200 bg-gradient-to-br from-accent/15 to-accent/10 border border-accent/20 group-hover/item:scale-105 group-hover/item:shadow-[0_4px_12px_rgba(0,102,255,0.2)]">
                    <svg class="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div class="flex-1">
                    <p class="text-xs font-medium text-primary/60 mb-1 uppercase tracking-wide">Locatie</p>
                    <p class="text-base font-medium text-primary">
                      {{ block.contactInfo.location }}
                    </p>
                  </div>
                </div>
                
                <!-- Social Links -->
                <div 
                  v-if="block.contactInfo?.socialLinks && block.contactInfo.socialLinks.length > 0"
                  class="pt-6 border-t border-primary/10"
                >
                  <p class="text-xs font-medium text-primary/60 mb-4 uppercase tracking-wide">Volg mij</p>
                  <div class="flex flex-wrap gap-3">
                    <a
                      v-for="(link, index) in block.contactInfo.socialLinks"
                      :key="index"
                      :href="link.url"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="relative flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-all duration-200 overflow-hidden bg-white/5 border border-black/10 text-primary hover:text-accent hover:border-accent/30 hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(0,102,255,0.15)] group/link"
                      :title="getSocialLabel(link)"
                    >
                    <!-- LinkedIn Icon -->
                    <svg 
                      v-if="link.platform === 'linkedin'"
                      class="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                    <!-- GitHub Icon -->
                    <svg 
                      v-else-if="link.platform === 'github'"
                      class="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                    <!-- Twitter Icon -->
                    <svg 
                      v-else-if="link.platform === 'twitter'"
                      class="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                    </svg>
                    <!-- Instagram Icon -->
                    <svg 
                      v-else-if="link.platform === 'instagram'"
                      class="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                    <!-- Facebook Icon -->
                    <svg 
                      v-else-if="link.platform === 'facebook'"
                      class="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                    <!-- Website/Other Icon -->
                    <svg 
                      v-else
                      class="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                    </svg>
                      <span class="text-sm font-medium relative z-10">{{ getSocialLabel(link) }}</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { Contact } from '~/types/sanity'

interface Props {
  block: Contact
}

const props = defineProps<Props>()

const formData = ref({
  name: '',
  email: '',
  message: '',
})

const isSubmitting = ref(false)
const submitMessage = ref('')
const submitMessageType = ref<'success' | 'error'>('success')

const showForm = computed(() => {
  return props.block.showContactForm !== false
})

const showInfo = computed(() => {
  return props.block.showContactInfo !== false && 
         (props.block.contactInfo?.email || 
          props.block.contactInfo?.phone || 
          props.block.contactInfo?.location || 
          (props.block.contactInfo?.socialLinks && props.block.contactInfo.socialLinks.length > 0))
})

const layoutClass = computed(() => {
  if (!showForm.value && showInfo.value) {
    return 'grid-cols-1 max-w-2xl mx-auto'
  }
  if (showForm.value && !showInfo.value) {
    return 'grid-cols-1 max-w-2xl mx-auto'
  }
  
  switch (props.block.layout) {
    case 'form-right':
      return 'md:grid-cols-[1fr,1fr]'
    case 'form-only':
      return 'grid-cols-1 max-w-2xl mx-auto'
    case 'info-only':
      return 'grid-cols-1 max-w-2xl mx-auto'
    default: // form-left
      return 'md:grid-cols-[1fr,1fr]'
  }
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

const handleSubmit = async (event: Event) => {
  event.preventDefault()
  isSubmitting.value = true
  submitMessage.value = ''
  
  try {
    if (props.block.formAction) {
      // If form action is provided, submit to external URL (Formspree, Netlify Forms, etc.)
      const form = event.target as HTMLFormElement
      const formDataObj = new FormData(form)
      
      const response = await fetch(props.block.formAction, {
        method: 'POST',
        body: formDataObj,
      })
      
      if (response.ok) {
        submitMessage.value = 'Bedankt! Je bericht is verzonden.'
        submitMessageType.value = 'success'
        formData.value = { name: '', email: '', message: '' }
      } else {
        throw new Error('Form submission failed')
      }
    } else {
      // Submit to Sanity via our API route
      const response = await $fetch('/api/contact/submit', {
        method: 'POST',
        body: {
          name: formData.value.name,
          email: formData.value.email,
          message: formData.value.message,
        },
      })
      
      if (response.success) {
        submitMessage.value = 'Bedankt! Je bericht is verzonden en opgeslagen.'
        submitMessageType.value = 'success'
        formData.value = { name: '', email: '', message: '' }
      } else {
        throw new Error('Form submission failed')
      }
    }
  } catch (error: any) {
    submitMessage.value = error.data?.message || 'Er ging iets mis. Probeer het later opnieuw.'
    submitMessageType.value = 'error'
  } finally {
    isSubmitting.value = false
  }
}

const getSocialLabel = (link: { platform: string; label?: string }) => {
  if (link.platform === 'other' && link.label) {
    return link.label
  }
  const labels: Record<string, string> = {
    linkedin: 'LinkedIn',
    github: 'GitHub',
    twitter: 'Twitter',
    instagram: 'Instagram',
    facebook: 'Facebook',
    website: 'Website',
  }
  return labels[link.platform] || link.platform
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

</style>

