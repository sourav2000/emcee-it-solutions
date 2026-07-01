export interface StrapiMedia {
  id: number
  url: string
  alternativeText?: string | null
  width?: number
  height?: number
}

export interface StrapiHomePage {
  id: number
  HeroTitle?: string
  HeroDescription?: string
  FeatureList?: string
  BadgeText?: string
  ImageBadgeText?: string
  PrimaryButtonText?: string
  SecondaryButtonText?: string
  heroVideoUrl?: string
  VideoThumbnail?: StrapiMedia | null
}

export interface StrapiHomePageResponse {
  data: StrapiHomePage | null
  meta: Record<string, unknown>
}

export interface HeroContent {
  title: string
  description: string
  features: string[]
  badgeText: string
  badgeLink: string
  primaryButtonText: string
  primaryButtonLink: string
  secondaryButtonText: string
  secondaryButtonLink: string
  imageBadgeText: string
  imageUrl: string | null
  videoUrl: string | null
}

export type HeroDataState =
  | { status: 'loading' }
  | { status: 'error'; message: string }
  | { status: 'success'; data: HeroContent }
