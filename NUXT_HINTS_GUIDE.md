# Nuxt Hints - Common Issues and How to View Them

## How to View Nuxt Hints Issues

1. **Open your browser** and navigate to `http://localhost:3000`
2. **Open Nuxt DevTools**:
   - Click the Nuxt icon in the bottom-right corner of your browser
   - Or press `Alt + D` (Windows/Linux) or `Option + D` (Mac)
3. **Navigate to the "Hints" tab** in the Nuxt DevTools panel
4. **Review the issues** - they will be categorized by type (Performance, Security, Accessibility, etc.)

## Common Nuxt Hints Issues (20 issues likely include):

### 1. **Inline Scripts** (CSP warnings)
- **Issue**: Inline scripts without nonce can be flagged by CSP
- **Fix**: Already addressed in `app.vue` - script is wrapped in IIFE

### 2. **Resource Hints**
- **Missing preload/prefetch**: Check if critical resources need preloading
- **Font loading**: The `media: 'print'` strategy might be flagged
- **Solution**: Consider using `rel="preload"` for critical fonts

### 3. **Image Optimization**
- **Missing width/height**: Already fixed - all images have dimensions
- **Missing alt attributes**: Already fixed - all images have alt text
- **Format optimization**: Already using WebP/AVIF

### 4. **Performance Issues**
- **Render-blocking resources**: Check for blocking CSS/JS
- **Large bundle sizes**: Check if code splitting is optimal
- **Third-party scripts**: PostHog, Vercel Live Feedback might be flagged

### 5. **Security Headers**
- **CSP configuration**: Already configured in `server/middleware/security-headers.ts`
- **Missing headers**: Already have X-Frame-Options, COOP, etc.

### 6. **Accessibility**
- **Missing lang attribute**: Already fixed - `lang="nl"` is set
- **Missing ARIA labels**: Check interactive elements
- **Color contrast**: Already addressed in previous fixes

### 7. **SEO**
- **Missing meta tags**: Already using `useSeo` composable
- **Missing structured data**: Already implemented

## Quick Fixes to Try

1. **Add preload for critical fonts**:
```typescript
// In app.vue, add to link array:
{
  rel: 'preload',
  href: 'https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiJ-Ek-_EeA.woff2',
  as: 'font',
  type: 'font/woff2',
  crossorigin: 'anonymous',
}
```

2. **Check for console warnings** in browser DevTools
3. **Review Network tab** for unoptimized resources
4. **Check Performance tab** for render-blocking resources

## Next Steps

1. Open Nuxt DevTools in your browser
2. Go to the "Hints" tab
3. Review each issue and its suggested fix
4. Share the specific issues you see, and I can help fix them

