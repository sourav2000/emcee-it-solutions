import { getApiUrl, getWpJsonRoot } from '../utils/env'

export async function wpFetch<T>(path: string): Promise<T> {
  const baseUrl = getApiUrl()
  const response = await fetch(`${baseUrl}${path}`)

  if (!response.ok) {
    throw new Error(`WordPress API error (${response.status}): ${path}`)
  }

  return response.json() as Promise<T>
}

export async function wpJsonFetch<T>(path: string): Promise<T> {
  const root = getWpJsonRoot()
  const response = await fetch(`${root}${path}`)

  if (!response.ok) {
    throw new Error(`WordPress API error (${response.status}): ${path}`)
  }

  return response.json() as Promise<T>
}
