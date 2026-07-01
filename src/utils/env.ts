export function getApiUrl(): string {
  const apiUrl = import.meta.env.VITE_API_URL

  if (!apiUrl) {
    throw new Error(
      'VITE_API_URL is not set. Add it to your .env file (e.g. VITE_API_URL=http://localhost:1337/api).',
    )
  }

  return apiUrl.replace(/\/$/, '')
}

export function getStrapiAssetUrl(relativePath: string): string {
  return `${import.meta.env.VITE_API_URL.replace('/api', '')}${relativePath}`
}

export function getWpJsonRoot(): string {
  return getApiUrl().replace(/\/wp\/v2\/?$/, '')
}
