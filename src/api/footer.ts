import type {
  FooterContent,
  FooterListItem,
  StrapiFooterPageResponse,
} from '../types/footer'
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

function splitLines(value: unknown): string[] {
  const text = asString(value)
  if (!text) {
    return []
  }

  return text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
}

function parseListItem(line: string): FooterListItem {
  let label = line
  let bold = false

  const boldMatch = line.match(/^\*\*(.+)\*\*$/)
  if (boldMatch) {
    bold = true
    label = boldMatch[1].trim()
  }

  const pipeIndex = label.indexOf('|')
  let href: string
  if (pipeIndex !== -1) {
    href = label.slice(pipeIndex + 1).trim()
    label = label.slice(0, pipeIndex).trim()
  } else {
    href = '#'
  }

  return { label, href, bold: bold || undefined }
}

function buildListItems(lines: string[]): FooterListItem[] {
  return lines.map(parseListItem)
}

function mapFooterPageToContent(
  data: StrapiFooterPageResponse['data'],
): FooterContent {
  if (!data) {
    throw new Error('Footer page not found.')
  }

  return {
    companyName: asString(data.CompanyName),
    companyDescription: asString(data.CompanyDescription),
    socialLinks: {
      facebook: asString(data.FacebookURL),
      instagram: asString(data.InstagramURL),
      linkedin: asString(data.LinkedInURL),
      xTwitter: asString(data.TwitterURL),
      youtube: asString(data.YouTubeURL),
    },
    aiSolutions: buildListItems(splitLines(data.AISolutions)),
    services: buildListItems(splitLines(data.Services)),
    companyLinks: buildListItems(splitLines(data.CompanyLinks)),
    popularCities: splitLines(data.PopularCities),
  }
}

export function fetchFooterContent(): Promise<FooterContent> {
  return cachedFetch('footer-content', async () => {
    const response = await apiFetch<StrapiFooterPageResponse>(
      '/footer-page?populate=*',
    )
    return mapFooterPageToContent(response.data)
  })
}
