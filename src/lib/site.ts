import { profile } from '../data/profile'

export const SITE_TITLE = `${profile.name} · Software Engineer — AI & Backend`
export const SITE_DESCRIPTION =
  'Portfolio of Subhrojyoti Sarkar, a Computer Science undergraduate at VIT-AP building AI-powered applications and backend systems: hybrid-search RAG, ML-based resume matching and NLP.'

/** Props for any link that leaves the site. */
export const externalLinkProps = { target: '_blank', rel: 'noopener noreferrer' } as const
