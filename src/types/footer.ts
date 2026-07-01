export interface StrapiFooterPage {
  id: number
  CompanyName?: string
  CompanyDescription?: string
  FacebookURL?: string
  InstagramURL?: string
  LinkedInURL?: string
  TwitterURL?: string
  YouTubeURL?: string
  AISolutions?: string
  Services?: string
  CompanyLinks?: string
  PopularCities?: string
}

export interface StrapiFooterPageResponse {
  data: StrapiFooterPage | null
  meta: Record<string, unknown>
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

export type FooterDataState =
  | { status: 'loading' }
  | { status: 'error'; message: string }
  | { status: 'success'; data: FooterContent }
