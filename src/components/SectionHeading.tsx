import type { ReactNode } from 'react'
import { Reveal } from './Reveal'

interface SectionHeadingProps {
  id: string
  /** Small numbered label, e.g. "01". */
  index?: string
  eyebrow: string
  title: ReactNode
  description?: ReactNode
}

export function SectionHeading({ id, index, eyebrow, title, description }: SectionHeadingProps) {
  return (
    <Reveal className="mb-12 max-w-2xl sm:mb-14">
      <p className="mb-4 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.18em] text-accent">
        {index && <span className="text-fg-subtle">{index}</span>}
        <span aria-hidden="true" className="h-px w-8 bg-accent-muted" />
        {eyebrow}
      </p>
      <h2 id={id} className="text-3xl font-semibold tracking-tight text-fg text-balance sm:text-4xl">
        {title}
      </h2>
      {description && <p className="mt-4 text-base leading-relaxed text-fg-muted sm:text-lg">{description}</p>}
    </Reveal>
  )
}
