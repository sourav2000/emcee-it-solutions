import { cachedFetch } from '../utils/fetch-cache'
import type { WpMedia } from '../types/wordpress'
import { wpFetch } from './client'

export function fetchMediaById(id: number): Promise<WpMedia> {
  return cachedFetch(`media:${id}`, () => wpFetch<WpMedia>(`/media/${id}`))
}
