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
export interface TechItem {
  _id: string
  _type: 'techItem'
  name: string
  icon?: SanityImageAsset
  category: 'languages' | 'frameworks' | 'tools'
  url?: string
}

export interface TechStack extends SanityBlock {
  _type: 'techStack'
  heading?: string
  description?: string
  techItems?: TechItem[]
  showAllCategories?: boolean
  layout?: 'grid' | 'list'
  backgroundColor?: 'white' | 'gray' | 'primary'
}

// ImageText type
export interface ImageText extends SanityBlock {
  _type: 'imageText'
  image: SanityImageAsset
  altText: string
  content?: Array<Record<string, unknown>>
  layout?: 'image-left' | 'image-right' | 'image-top'
  backgroundColor?: 'white' | 'gray' | 'primary'
}

// Contact type
export interface ContactSocialLink {
  platform: 'linkedin' | 'github' | 'twitter' | 'instagram' | 'facebook' | 'website' | 'other'
  url: string
  label?: string
}

export interface ContactInfo {
  email?: string
  phone?: string
  location?: string
  socialLinks?: ContactSocialLink[]
}

export interface Contact extends SanityBlock {
  _type: 'contact'
  heading?: string
  description?: string
  showContactForm?: boolean
  showContactInfo?: boolean
  contactInfo?: ContactInfo
  layout?: 'form-left' | 'form-right' | 'form-only' | 'info-only'
  formAction?: string
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

