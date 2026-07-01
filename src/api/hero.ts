import type { HeroContent, StrapiHomePageResponse } from '../types/hero'
import { getStrapiAssetUrl } from '../utils/env'
import { cachedFetch } from '../utils/fetch-cache'
import { apiFetch } from './client'

function asString(value: unknown): string {
  if (typeof value === 'string') {
    return value.trim()
  }

  if (typeof value === 'number') {
    return String(value)
  }

  return ''
}

function parseFeatureList(value: string): string[] {
  return value
    .split(/[,\n]+/)
    .map((feature) => feature.trim())
    .filter(Boolean)
}

function mapHomePageToHeroContent(data: StrapiHomePageResponse['data']): HeroContent {
  if (!data) {
    throw new Error('Home page not found.')
  }

  const thumbnailUrl = data.VideoThumbnail?.url
    ? getStrapiAssetUrl(data.VideoThumbnail.url)
    : null

  return {
    title: asString(data.HeroTitle),
    description: asString(data.HeroDescription),
    features: parseFeatureList(asString(data.FeatureList)),
    badgeText: asString(data.BadgeText),
    badgeLink: '',
    primaryButtonText: asString(data.PrimaryButtonText),
    primaryButtonLink: '',
    secondaryButtonText: asString(data.SecondaryButtonText),
    secondaryButtonLink: '',
    imageBadgeText: asString(data.ImageBadgeText),
    imageUrl: thumbnailUrl,
    videoUrl: asString(data.heroVideoUrl) || null,
  }
}

export function fetchHeroContent(): Promise<HeroContent> {
  return cachedFetch('hero-content', async () => {
    const response = await apiFetch<StrapiHomePageResponse>('/home-page?populate=*')
    return mapHomePageToHeroContent(response.data)
  })
}
