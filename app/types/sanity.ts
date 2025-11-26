/**
 * Type definitions for Sanity CMS content
 * Based on official Sanity documentation
 */

import type { SanityImageSource } from '@sanity/image-url/lib/types/types'
import type { Component } from 'vue'

// Base Sanity image reference
export interface SanityImageAsset {
  _type: 'reference' | 'image'
  asset?: {
    _type: 'reference'
    _ref: string
  }
  [key: string]: unknown
}

// Base Sanity block structure
export interface SanityBlock {
  _type: string
  _key?: string
  _id?: string
  [key: string]: unknown
}

// Hero type
export interface Hero extends SanityBlock {
  _type: 'hero'
  heading: string
  subheading?: string
  backgroundImage?: SanityImageAsset
  ctaButton?: {
    text: string
    url: string
  }
}

// Text type
export interface Text extends SanityBlock {
  _type: 'richText'
  heading?: string
  content?: Array<Record<string, unknown>>
  textAlignment?: 'left' | 'center' | 'right'
  backgroundColor?: 'white' | 'gray' | 'primary'
}

// Image type
export interface Image extends SanityBlock {
  _type: 'contentImage'
  image: SanityImageAsset
  altText: string
  caption?: string
  imageSize?: 'small' | 'medium' | 'large' | 'full'
  imageAlignment?: 'left' | 'center' | 'right'
}

// Projects type
export interface Projects extends SanityBlock {
  _type: 'projects'
  title?: string
  maxProjects?: number
  showAllProjects?: boolean
  filterByStatus?: 'all' | 'completed' | 'in-progress' | 'school-project'
}

// Tech Stack type
export interface TechStackItem {
  name: string
  icon?: SanityImageAsset
}

export interface TechStackCategory {
  categoryName: string
  items: TechStackItem[]
}

export interface TechStack extends SanityBlock {
  _type: 'techStack'
  heading?: string
  description?: string
  categories: TechStackCategory[]
  layout?: 'grid' | 'list'
  backgroundColor?: 'white' | 'gray' | 'primary'
}

// URL builder function type
export type UrlBuilder = (source: SanityImageSource) => {
  width: (width: number) => {
    height: (height: number) => {
      url: () => string
    }
    url: () => string
  }
  url: () => string
}

// Block component props interface
export interface BlockComponentProps {
  block: SanityBlock
  urlFor?: UrlBuilder
}

// Component type for block mapping
export type BlockComponent = Component<BlockComponentProps>

