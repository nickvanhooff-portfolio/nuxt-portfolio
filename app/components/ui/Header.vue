<template>
  <header
    ref="headerRef"
    class="fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out"
    :class="{ 'shadow-lg': isScrolled }"
  >
    <!-- Background blur effect -->
    <div
      class="absolute inset-0 backdrop-blur-md transition-all duration-300 bg-white"
      :style="isScrolled ? 'background-color: rgba(255, 255, 255, 0.95);' : 'background-color: rgba(255, 255, 255, 0.85);'"
    />
    
    <!-- Gradient accent line -->
    <div
      class="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-accent to-transparent transition-opacity duration-300"
      :class="isScrolled ? 'opacity-100' : 'opacity-0'"
    />
    
    <nav class="relative">
      <div class="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between py-4 md:py-5 relative z-10">
        <!-- Logo/Brand -->
        <NuxtLink
          to="/"
          class="relative flex items-center group"
          @click="closeMobileMenu"
        >
          <div class="relative">
            <div class="absolute inset-0 rounded-lg blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-300" style="background: radial-gradient(circle, #0066FF 0%, transparent 70%);" />
            <span class="text-xl md:text-2xl font-title font-bold text-primary relative z-10 tracking-tight transition-transform duration-300 group-hover:scale-105">
              <span class="text-accent font-bold">&lt;</span>
              Portfolio
              <span class="text-accent font-bold">/&gt;</span>
            </span>
          </div>
        </NuxtLink>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center gap-8">
          <a
            v-for="link in navLinks"
            :key="link.path"
            :href="link.path === '/' ? '#' : `#${link.id}`"
            class="group relative text-sm font-medium text-primary/70 transition-all duration-300 ease-out py-2 cursor-pointer"
            :class="isActiveRoute(link.path) ? 'text-primary' : 'hover:text-primary'"
            @click.prevent="scrollToSection(link.id)"
          >
            <span class="relative z-10">{{ link.label }}</span>
            <span
              class="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-accent to-accent-light transition-all duration-300 ease-out"
              :class="isActiveRoute(link.path) ? 'w-full' : 'w-0 group-hover:w-full'"
            />
          </a>
        </div>

        <!-- Mobile Menu Button -->
        <button
          class="md:hidden relative w-10 h-10 flex flex-col justify-center items-center bg-transparent border-none cursor-pointer z-50"
          aria-label="Toggle menu"
          @click="toggleMobileMenu"
        >
          <span
            class="absolute w-6 h-0.5 bg-primary transition-all duration-300 ease-out"
            :class="isMobileMenuOpen ? 'translate-y-0 rotate-45' : '-translate-y-1.5'"
          />
          <span
            class="absolute w-6 h-0.5 bg-primary transition-all duration-300 ease-out"
            :class="isMobileMenuOpen ? 'opacity-0' : 'opacity-100'"
          />
          <span
            class="absolute w-6 h-0.5 bg-primary transition-all duration-300 ease-out"
            :class="isMobileMenuOpen ? 'translate-y-0 -rotate-45' : 'translate-y-1.5'"
          />
        </button>
      </div>

      <!-- Mobile Navigation — full-screen overlay -->
      <Transition
        enter-active-class="transition-all duration-400 ease-out"
        enter-from-class="opacity-0 scale-[0.98]"
        enter-to-class="opacity-100 scale-100"
        leave-active-class="transition-all duration-300 ease-in"
        leave-from-class="opacity-100 scale-100"
        leave-to-class="opacity-0 scale-[0.98]"
      >
        <div
          v-if="isMobileMenuOpen"
          class="md:hidden fixed inset-0 z-40 bg-neutral flex flex-col"
        >
          <!-- Top bar: logo + close -->
          <div class="flex items-center justify-between px-6 py-4 border-b border-neutral-gray/30">
            <span class="text-xl font-title font-bold text-primary tracking-tight">
              <span class="text-accent font-bold">&lt;</span>Portfolio<span class="text-accent font-bold">/&gt;</span>
            </span>
            <button
              class="w-10 h-10 flex items-center justify-center text-primary/60 hover:text-primary transition-colors"
              aria-label="Sluit menu"
              @click="closeMobileMenu"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
                <line x1="4" y1="4" x2="16" y2="16" />
                <line x1="16" y1="4" x2="4" y2="16" />
              </svg>
            </button>
          </div>

          <!-- Nav links -->
          <nav class="flex-1 flex flex-col justify-center px-8 gap-1">
            <a
              v-for="(link, index) in navLinks"
              :key="link.path"
              :href="link.path === '/' ? '#' : `#${link.id}`"
              class="mobile-nav-item group flex items-baseline gap-4 py-3 cursor-pointer"
              :style="{ animationDelay: `${0.05 + index * 0.06}s` }"
              :class="isActiveRoute(link.path) ? 'text-accent' : 'text-primary'"
              @click.prevent="scrollToSection(link.id); closeMobileMenu()"
            >
              <span class="font-mono text-xs text-accent/60 tabular-nums w-6 flex-shrink-0 group-hover:text-accent transition-colors duration-200">
                {{ String(index + 1).padStart(2, '0') }}
              </span>
              <span class="font-title font-bold text-[2.6rem] leading-none tracking-tight transition-colors duration-200 group-hover:text-accent">
                {{ link.label }}
              </span>
            </a>
          </nav>

          <!-- Bottom accent line -->
          <div class="mx-8 mb-10 h-px bg-gradient-to-r from-accent/40 via-accent to-accent/40" />
        </div>
      </Transition>
    </nav>
  </header>
</template>

<script setup lang="ts">
const headerRef = ref<HTMLElement | null>(null)
const isScrolled = ref(false)
const isMobileMenuOpen = ref(false)

const navLinks = [
  { label: 'Home', path: '/', id: 'home' },
  { label: 'Projects', path: '/projects', id: 'projects' },
  { label: 'Tech Stack', path: '/tech-stack', id: 'tech-stack' },
  { label: 'About', path: '/about', id: 'about' },
  { label: 'Contact', path: '/contact', id: 'contact' },
]

const isActiveRoute = (path: string) => {
  const route = useRoute()
  if (path === '/') {
    return route.path === '/'
  }
  return route.path.startsWith(path)
}

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
  if (isMobileMenuOpen.value) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
  document.body.style.overflow = ''
}

const scrollToSection = (id: string) => {
  const route = useRoute()
  
  // If we're not on the home page, navigate there first
  if (route.path !== '/') {
    navigateTo('/')
    // Wait for navigation, then scroll
    nextTick(() => {
      setTimeout(() => scrollToId(id), 100)
    })
  } else {
    scrollToId(id)
  }
}

const scrollToId = (id: string) => {
  const element = document.getElementById(id)
  if (element) {
    const headerHeight = headerRef.value?.offsetHeight || 80
    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
    const offsetPosition = elementPosition - headerHeight

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    })
  }
}

onMounted(() => {
  const handleScroll = () => {
    isScrolled.value = window.scrollY > 20
  }

  window.addEventListener('scroll', handleScroll, { passive: true })
  
  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
  })
})

watch(() => useRoute().path, () => {
  closeMobileMenu()
})
</script>

<style scoped>
/* Mobile nav item stagger entrance */
@keyframes navItemIn {
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.mobile-nav-item {
  opacity: 0;
  animation: navItemIn 0.35s ease-out forwards;
}
</style>

