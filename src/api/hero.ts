import { cachedFetch } from '../utils/fetch-cache'
import type {
  HeroAcfFields,
  HeroContent,
  WpAcfImageField,
  WpPage,
} from '../types/wordpress'
import { wpFetch } from './client'
import { fetchMediaById } from './media'

export function fetchHomePage(): Promise<WpPage[]> {
  return wpFetch<WpPage[]>('/pages?slug=home&acf_format=standard')
}

function stripHtml(value: string): string {
  return value.replace(/<[^>]*>/g, '').trim()
}

function asString(value: unknown): string {
  if (typeof value === 'string') {
    return stripHtml(value)
  }

  if (typeof value === 'number') {
    return String(value)
  }

  return ''
}

function resolveMediaId(value: unknown): number | null {
  if (typeof value === 'number' && value > 0) {
    return value
  }

  if (typeof value === 'string' && /^\d+$/.test(value)) {
    return Number.parseInt(value, 10)
  }

  if (value && typeof value === 'object') {
    const media = value as WpAcfImageField
    if (typeof media.ID === 'number' && media.ID > 0) {
      return media.ID
    }
    if (typeof media.id === 'number' && media.id > 0) {
      return media.id
    }
  }

  return null
}

function resolveMediaUrl(value: unknown): string | null {
  if (value && typeof value === 'object') {
    const media = value as WpAcfImageField
    return media.url ?? media.source_url ?? null
  }

  return null
}

function extractAcfFields(page: WpPage): HeroAcfFields {
  if (page.acf && typeof page.acf === 'object') {
    return page.acf
  }

  const meta = page.meta ?? {}
  const acfFromMeta: HeroAcfFields = {}

  for (const [key, value] of Object.entries(meta)) {
    if (key.startsWith('_')) {
      continue
    }

    if (
      key.startsWith('hero_') ||
      key.startsWith('feature_') ||
      key.startsWith('badge_') ||
      key.startsWith('primary_') ||
      key.startsWith('secondary_') ||
      key.startsWith('image_') ||
      key.startsWith('contact_') ||
      key === 'website' ||
      key === 'phone' ||
      key === 'email'
    ) {
      ;(acfFromMeta as Record<string, unknown>)[key] = value
    }
  }

  return acfFromMeta
}

async function resolveVideoUrl(field: unknown): Promise<string | null> {
  const mediaId = resolveMediaId(field)
  if (mediaId) {
    const media = await fetchMediaById(mediaId)
    return media.source_url
  }

  return resolveMediaUrl(field)
}

async function resolveImageUrl(
  thumbnailField: unknown,
  imageField: unknown,
  videoField: unknown,
): Promise<string | null> {
  const thumbnailUrl = await resolveMediaUrlFromField(thumbnailField)
  if (thumbnailUrl) {
    return thumbnailUrl
  }

  const imageUrl = await resolveMediaUrlFromField(imageField)
  if (imageUrl) {
    return imageUrl
  }

  const videoId = resolveMediaId(videoField)
  if (!videoId) {
    return null
  }

  const videoMedia = await fetchMediaById(videoId)
  const poster =
    videoMedia.media_details?.sizes?.medium?.source_url ??
    videoMedia.media_details?.sizes?.large?.source_url

  return poster ?? null
}

async function resolveMediaUrlFromField(field: unknown): Promise<string | null> {
  const directUrl = resolveMediaUrl(field)
  if (directUrl) {
    return directUrl
  }

  const mediaId = resolveMediaId(field)
  if (!mediaId) {
    return null
  }

  const media = await fetchMediaById(mediaId)
  return media.source_url
}

function buildFeatures(acf: HeroAcfFields): string[] {
  return [acf.feature_1, acf.feature_2, acf.feature_3, acf.feature_4]
    .map((feature) => asString(feature))
    .filter(Boolean)
}

export function fetchHeroContent(): Promise<HeroContent> {
  return cachedFetch('hero-content', async () => {
    const pages = await fetchHomePage()
    const page = pages[0]

    if (!page) {
      throw new Error('Home page not found in WordPress.')
    }

    const acf = extractAcfFields(page)
    const heroVideoUrl = asString(acf.hero_video_url)
    const [imageUrl, videoUrl] = await Promise.all([
      resolveImageUrl(acf.hero_video_thumbnail, acf.hero_image, acf.hero_video),
      heroVideoUrl ? Promise.resolve(heroVideoUrl) : resolveVideoUrl(acf.hero_video),
    ])

    return {
      title: asString(acf.hero_title) || stripHtml(page.title.rendered),
      description: asString(acf.hero_description),
      features: buildFeatures(acf),
      badgeText: asString(acf.badge_text),
      badgeLink: asString(acf.badge_link),
      primaryButtonText: asString(acf.primary_button_text),
      primaryButtonLink: asString(acf.primary_button_link),
      secondaryButtonText: asString(acf.secondary_button_text),
      secondaryButtonLink: asString(acf.secondary_button_link),
      imageBadgeText: asString(acf.image_badge_text),
      imageUrl,
      videoUrl,
    }
  })
}
