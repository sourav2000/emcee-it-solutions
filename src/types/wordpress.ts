export interface WpRenderedField {
  rendered: string
}

export interface WpMedia {
  id: number
  source_url: string
  mime_type: string
  media_details?: {
    width?: number
    height?: number
    sizes?: Record<string, { source_url: string; width: number; height: number }>
  }
}

export interface WpAcfImageField {
  ID?: number
  id?: number
  url?: string
  source_url?: string
}

export interface HeroAcfFields {
  hero_title?: string
  hero_description?: string
  feature_1?: string
  feature_2?: string
  feature_3?: string
  feature_4?: string
  badge_text?: string
  badge_link?: string
  primary_button_text?: string
  primary_button_link?: string
  secondary_button_text?: string
  secondary_button_link?: string
  image_badge_text?: string
  hero_video?: number | string | WpAcfImageField | false | null
  hero_video_url?: string
  hero_video_thumbnail?: number | string | WpAcfImageField | false | null
  hero_image?: number | string | WpAcfImageField | false | null
  website?: string
  phone?: string
  email?: string
  contact_website?: string
  contact_phone?: string
  contact_email?: string
}

export interface WpPage {
  id: number
  slug: string
  title: WpRenderedField
  acf?: HeroAcfFields
  meta?: Record<string, unknown>
}

// export interface SiteContactInfo {
//   website: string
//   phone: string
//   email: string
// }

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
  // contact: SiteContactInfo
}

export type HeroDataState =
  | { status: 'loading' }
  | { status: 'error'; message: string }
  | { status: 'success'; data: HeroContent }

export interface FooterAcfFields {
  company_name?: string
  company_description?: string
  facebook_url?: string
  instagram_url?: string
  linkedin_url?: string
  x_twitter_url?: string
  youtube_url?: string
  ai_solutions?: string
  services?: string
  company_links?: string
  popular_cities?: string
}

export interface FooterSocialLinks {
  facebook: string
  instagram: string
  linkedin: string
  xTwitter: string
  youtube: string
}

export interface FooterListItem {
  label: string
  href: string
  bold?: boolean
}

export interface FooterContent {
  companyName: string
  companyDescription: string
  socialLinks: FooterSocialLinks
  aiSolutions: FooterListItem[]
  services: FooterListItem[]
  companyLinks: FooterListItem[]
  popularCities: string[]
}

export interface WpFooterPage {
  id: number
  slug: string
  title: WpRenderedField
  acf?: FooterAcfFields
  meta?: Record<string, unknown>
}

export type FooterDataState =
  | { status: 'loading' }
  | { status: 'ready'; data: FooterContent }
