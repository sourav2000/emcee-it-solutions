import { useEffect, useState } from 'react'
import { fetchHeroContent } from '../api'
import type { HeroDataState } from '../types/wordpress'

export function useHeroData(): HeroDataState {
  const [state, setState] = useState<HeroDataState>({ status: 'loading' })

  useEffect(() => {
    let cancelled = false

    fetchHeroContent()
      .then((data) => {
        if (!cancelled) {
          setState({ status: 'success', data })
        }
      })
      .catch((error: unknown) => {
        if (!cancelled) {
          const message =
            error instanceof Error ? error.message : 'Failed to load hero content.'
          setState({ status: 'error', message })
        }
      })

    return () => {
      cancelled = true
    }
  }, [])

  return state
}
