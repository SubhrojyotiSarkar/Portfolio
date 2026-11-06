import { m } from 'framer-motion'
import type { ReactNode } from 'react'
import { fadeUp, stagger } from '../lib/motion'

export interface TimelineEntry {
  id: string
  title: string
  subtitle: string
  period: string
  meta?: string
  icon?: ReactNode
  children?: ReactNode
}

/** Vertical timeline with a rail and dated entries. */
export function Timeline({ entries }: { entries: TimelineEntry[] }) {
  return (
    <m.ol
      variants={stagger(0.1)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '0px 0px -60px 0px' }}
      className="relative space-y-10 border-l border-line pl-8 sm:pl-10"
    >
      {entries.map((entry) => (
        <m.li key={entry.id} variants={fadeUp} className="relative">
          <span
            aria-hidden="true"
            className="absolute -left-[calc(2rem+0.5px)] top-0.5 flex size-7 -translate-x-1/2 items-center justify-center rounded-full border border-line-strong bg-surface text-accent sm:-left-[calc(2.5rem+0.5px)]"
          >
            {entry.icon ?? <span className="size-1.5 rounded-full bg-accent" />}
          </span>

          <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
            <h3 className="text-lg font-semibold tracking-tight text-fg">{entry.title}</h3>
            <p className="shrink-0 font-mono text-xs text-fg-subtle">{entry.period}</p>
          </div>
          <p className="mt-1 text-sm text-fg-muted">
            {entry.subtitle}
            {entry.meta && <span className="text-fg-subtle"> · {entry.meta}</span>}
          </p>
          {entry.children && <div className="mt-4">{entry.children}</div>}
        </m.li>
      ))}
    </m.ol>
  )
}
