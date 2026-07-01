export function getApiUrl(): string {
  const apiUrl = import.meta.env.VITE_API_URL

  if (!apiUrl) {
    throw new Error(
      'VITE_API_URL is not set. Add it to your .env file (e.g. VITE_API_URL=http://localhost/wordpress/wp-json/wp/v2).',
    )
  }

  return apiUrl.replace(/\/$/, '')
}

export function getWpJsonRoot(): string {
  return getApiUrl().replace(/\/wp\/v2\/?$/, '')
}
