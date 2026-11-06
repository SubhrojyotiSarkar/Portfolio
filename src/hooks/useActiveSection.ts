import { useEffect, useState } from 'react'

/**
 * Returns the id of the section currently crossing the upper-middle band
 * of the viewport. Pass `enabled: false` on pages without those sections.
 */
export function useActiveSection<T extends string>(ids: readonly T[], enabled: boolean): T | null {
  const [active, setActive] = useState<T | null>(null)

  useEffect(() => {
    if (!enabled) return

    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting)
        if (visible.length > 0) setActive(visible[0].target.id as T)
      },
      { rootMargin: '-35% 0px -60% 0px' },
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [ids, enabled])

  return enabled ? active : null
}
