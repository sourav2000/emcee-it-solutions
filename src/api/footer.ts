import { FOOTER_FALLBACK } from '../data/footerFallback'
import { cachedFetch } from '../utils/fetch-cache'
import type {
  FooterAcfFields,
  FooterContent,
  FooterListItem,
  WpFooterPage,
} from '../types/wordpress'
import { wpFetch } from './client'

const FOOTER_PAGE_ID = 66

const FOOTER_LINK_PATHS: Record<string, string> = {
  'AI Chatbots & Virtual Assistants': '/ai-solutions',
  'AI Marketing & Sales Automation': '/ai-solutions',
  'AI Content Automation': '/ai-solutions',
  'Document & Workflow Automation': '/ai-solutions',
  'AI-Powered Analytics & Forecasting': '/ai-solutions',
  'View All AI Solutions': '/ai-solutions',
  'Web Development': '/services',
  'Mobile App Development': '/services',
  'Web3 Development': '/services',
  'CRM/ERP Development': '/services',
  'Whitelabel Solutions': '/whitelabel',
  'Startup Launchpad': '/services',
  'About Us': '/about-us',
  'Contact Us': '/contact-us',
  Blog: '/blog',
  'Privacy Policy': '/privacy-policy',
  'Terms of Service': '/terms-of-service',
  'Cookie Preferences': '/cookie-preferences',
}

function asString(value: unknown): string {
  if (typeof value === 'string') {
    return value.trim()
  }

  if (typeof value === 'number') {
    return String(value)
  }

  return ''
}

function splitTextareaLines(value: unknown): string[] {
  const text = asString(value)
  if (!text) {
    return []
  }

  return text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
}

function extractAcfFields(page: WpFooterPage): FooterAcfFields {
  if (page.acf && typeof page.acf === 'object') {
    return page.acf
  }

  const meta = page.meta ?? {}
  const acfFromMeta: FooterAcfFields = {}

  for (const [key, value] of Object.entries(meta)) {
    if (key.startsWith('_')) {
      continue
    }

    if (
      key === 'company_name' ||
      key === 'company_description' ||
      key.endsWith('_url') ||
      key === 'ai_solutions' ||
      key === 'services' ||
      key === 'company_links' ||
      key === 'popular_cities'
    ) {
      ;(acfFromMeta as Record<string, unknown>)[key] = value
    }
  }

  return acfFromMeta
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
    href = FOOTER_LINK_PATHS[label] ?? '#'
  }

  if (!bold && label === 'View All AI Solutions') {
    bold = true
  }

  return { label, href, bold: bold || undefined }
}

function buildListItems(
  lines: string[],
  fallbackItems: FooterListItem[],
): FooterListItem[] {
  if (lines.length === 0) {
    return fallbackItems
  }

  return lines.map((line) => parseListItem(line))
}

function buildFooterContent(acf: FooterAcfFields): FooterContent {
  const aiLines = splitTextareaLines(acf.ai_solutions)
  const serviceLines = splitTextareaLines(acf.services)
  const companyLines = splitTextareaLines(acf.company_links)
  const cityLines = splitTextareaLines(acf.popular_cities)

  return {
    companyName: asString(acf.company_name) || FOOTER_FALLBACK.companyName,
    companyDescription:
      asString(acf.company_description) || FOOTER_FALLBACK.companyDescription,
    socialLinks: {
      facebook: asString(acf.facebook_url) || FOOTER_FALLBACK.socialLinks.facebook,
      instagram: asString(acf.instagram_url) || FOOTER_FALLBACK.socialLinks.instagram,
      linkedin: asString(acf.linkedin_url) || FOOTER_FALLBACK.socialLinks.linkedin,
      xTwitter: asString(acf.x_twitter_url) || FOOTER_FALLBACK.socialLinks.xTwitter,
      youtube: asString(acf.youtube_url) || FOOTER_FALLBACK.socialLinks.youtube,
    },
    aiSolutions: buildListItems(aiLines, FOOTER_FALLBACK.aiSolutions),
    services: buildListItems(serviceLines, FOOTER_FALLBACK.services),
    companyLinks: buildListItems(companyLines, FOOTER_FALLBACK.companyLinks),
    popularCities:
      cityLines.length > 0 ? cityLines : FOOTER_FALLBACK.popularCities,
  }
}

export function fetchFooterPage(): Promise<WpFooterPage> {
  return wpFetch<WpFooterPage>(`/pages/${FOOTER_PAGE_ID}?acf_format=standard`)
}

export function fetchFooterContent(): Promise<FooterContent> {
  return cachedFetch('footer-content', async () => {
    const page = await fetchFooterPage()

    if (!page) {
      throw new Error('Footer settings page not found in WordPress.')
    }

    const acf = extractAcfFields(page)
    return buildFooterContent(acf)
  })
}
