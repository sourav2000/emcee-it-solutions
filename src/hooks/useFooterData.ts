import { useEffect, useState } from 'react'
import { fetchFooterContent } from '../api'
import { FOOTER_FALLBACK } from '../data/footerFallback'
import type { FooterDataState } from '../types/wordpress'

export function useFooterData(): FooterDataState {
  const [state, setState] = useState<FooterDataState>({ status: 'loading' })

  useEffect(() => {
    let cancelled = false

    fetchFooterContent()
      .then((data) => {
        if (!cancelled) {
          setState({ status: 'ready', data })
        }
      })
      .catch(() => {
        if (!cancelled) {
          setState({ status: 'ready', data: FOOTER_FALLBACK })
        }
      })

    return () => {
      cancelled = true
    }
  }, [])

  return state
}
