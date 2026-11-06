import { useEffect } from 'react'
import { useLocation } from 'react-router'

/**
 * Router-aware scrolling: scrolls to `#hash` targets (also after
 * navigating from another page) and to the top on plain route changes.
 */
export function useScrollManager() {
  const { pathname, hash, key } = useLocation()

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: 'instant' })
      return
    }

    const id = decodeURIComponent(hash.slice(1))
    // Wait a frame so freshly mounted (or lazily loaded) content exists.
    const frame = requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ block: 'start' })
    })
    return () => cancelAnimationFrame(frame)
  }, [pathname, hash, key])
}
