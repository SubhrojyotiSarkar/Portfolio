import { useEffect } from 'react'
import { SITE_DESCRIPTION, SITE_TITLE } from '../lib/site'

interface DocumentMeta {
  title?: string
  description?: string
}

function setMeta(selector: string, value: string) {
  document.head.querySelector<HTMLMetaElement>(selector)?.setAttribute('content', value)
}

/** Updates the document title and description tags for the current route. */
export function useDocumentMeta({ title, description }: DocumentMeta) {
  useEffect(() => {
    const fullTitle = title ? `${title} · Subhrojyoti Sarkar` : SITE_TITLE
    const desc = description ?? SITE_DESCRIPTION

    document.title = fullTitle
    setMeta('meta[name="description"]', desc)
    setMeta('meta[property="og:title"]', fullTitle)
    setMeta('meta[property="og:description"]', desc)
    setMeta('meta[name="twitter:title"]', fullTitle)
    setMeta('meta[name="twitter:description"]', desc)
  }, [title, description])
}
