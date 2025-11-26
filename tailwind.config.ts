import type { Config } from 'tailwindcss'

export default {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
    './error.vue',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0E0E0E',
          light: '#1A1A1A',
        },
        accent: {
          DEFAULT: '#0066FF',
          dark: '#0052CC',
          light: '#3385FF',
        },
        neutral: {
          DEFAULT: '#FFFFFF',
          light: '#F7F7F7',
          gray: '#D9D9D9',
          dark: '#9CA3AF',
        },
      },
      fontFamily: {
        title: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        body: ['system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      fontSize: {
        'hero': ['72px', { lineHeight: '1.1', fontWeight: '700' }],
        'hero-mobile': ['48px', { lineHeight: '1.1', fontWeight: '700' }],
        'section': ['40px', { lineHeight: '1.2', fontWeight: '700' }],
        'section-mobile': ['32px', { lineHeight: '1.2', fontWeight: '700' }],
        'body': ['18px', { lineHeight: '1.6', fontWeight: '400' }],
        'body-mobile': ['16px', { lineHeight: '1.6', fontWeight: '400' }],
        'ui': ['16px', { lineHeight: '1.5', fontWeight: '400' }],
        'ui-small': ['14px', { lineHeight: '1.5', fontWeight: '400' }],
      },
      maxWidth: {
        'container': '1200px',
      },
      spacing: {
        'section': '80px',
        'section-mobile': '48px',
      },
      borderRadius: {
        'button': '10px',
        'card': '16px',
        'badge': '9999px',
      },
      transitionDuration: {
        'default': '200ms',
        'fast': '150ms',
        'slow': '300ms',
      },
      transitionTimingFunction: {
        'default': 'ease-out',
      },
      boxShadow: {
        'card': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',
        'card-hover': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
        'glow': '0 0 20px rgba(0, 102, 255, 0.3)',
      },
    },
  },
  plugins: [],
} satisfies Config

