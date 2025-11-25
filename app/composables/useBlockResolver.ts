/**
 * Composable for automatically resolving Sanity block types to Vue components
 * Based on Nuxt 4 component auto-import patterns
 */
export function useBlockResolver() {
  /**
   * Resolves a block type to its corresponding Vue component
   * Uses Nuxt's auto-import system for dynamic component resolution
   * @param blockType - The Sanity block type (e.g., 'heroBlock', 'textBlock')
   * @returns The resolved component or null if not found
   */
  const resolveBlockComponent = (blockType: string) => {
    try {
      // Convert blockType from camelCase to PascalCase
      // e.g., 'heroBlock' -> 'HeroBlock'
      const componentName = blockType
        .split(/(?=[A-Z])/)
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join('')

      // Try to resolve component using Nuxt's resolveComponent
      // Pattern: components/blocks/{ComponentName}.vue
      // Note: resolveComponent is auto-imported by Nuxt
      const resolved = resolveComponent(`blocks/${componentName}`)
      
      return resolved
    } catch {
      // Component not found, return null to use fallback
      // This is expected for unsupported block types
      return null
    }
  }

  /**
   * Gets the component name for a block type
   * Used for debugging and fallback rendering
   */
  const getBlockComponentName = (blockType: string): string => {
    return blockType
      .split(/(?=[A-Z])/)
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join('')
  }

  return {
    resolveBlockComponent,
    getBlockComponentName,
  }
}
