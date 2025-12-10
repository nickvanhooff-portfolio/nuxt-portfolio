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
            :aria-current="isActiveRoute(link.path) ? 'page' : undefined"
            class="group relative text-sm font-medium text-primary/70 transition-all duration-300 ease-out py-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 rounded"
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
          class="md:hidden relative w-10 h-10 flex flex-col justify-center items-center bg-transparent border-none cursor-pointer z-50 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 rounded"
          :aria-label="isMobileMenuOpen ? 'Close menu' : 'Open menu'"
          :aria-expanded="isMobileMenuOpen"
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

      <!-- Mobile Navigation -->
      <Transition
        enter-active-class="transition-all duration-300 ease-out"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition-all duration-300 ease-out"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-if="isMobileMenuOpen"
          class="md:hidden fixed inset-0 z-40"
        >
          <div
            class="absolute inset-0 bg-primary/20 backdrop-blur-sm"
            @click="closeMobileMenu"
          />
          <div
            class="absolute top-20 left-0 right-0 bg-white border-t border-neutral-gray shadow-xl flex flex-col py-6 animate-slide-down"
          >
            <a
              v-for="link in navLinks"
              :key="link.path"
              :href="link.path === '/' ? '#' : `#${link.id}`"
              :aria-current="isActiveRoute(link.path) ? 'page' : undefined"
              class="px-6 py-4 text-base font-medium text-primary transition-colors duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent focus:ring-inset"
              :class="isActiveRoute(link.path) ? 'bg-neutral-light text-accent border-l-3 border-accent' : 'border-l-3 border-transparent hover:bg-neutral-light hover:text-accent hover:border-accent'"
              @click.prevent="scrollToSection(link.id); closeMobileMenu()"
            >
              {{ link.label }}
            </a>
          </div>
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
/* Custom animations */
@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-slide-down {
  animation: slideDown 0.3s ease-out;
}

/* Custom border-left width */
.border-l-3 {
  border-left-width: 3px;
}
</style>

