import { useEffect, useState } from 'react'
import { fetchFooterContent } from '../api'
import type { FooterDataState } from '../types/footer'

export function useFooterData(): FooterDataState {
  const [state, setState] = useState<FooterDataState>({ status: 'loading' })

  useEffect(() => {
    let cancelled = false

    fetchFooterContent()
      .then((data) => {
        if (!cancelled) {
          setState({ status: 'success', data })
        }
      })
      .catch((error: unknown) => {
        if (!cancelled) {
          const message =
            error instanceof Error ? error.message : 'Failed to load footer content.'
          setState({ status: 'error', message })
        }
      })

    return () => {
      cancelled = true
    }
  }, [])

  return state
}
