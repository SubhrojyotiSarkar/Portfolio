import type { ReactNode } from 'react'
import { cn } from '../lib/cn'

interface SectionProps {
  id?: string
  children: ReactNode
  className?: string
  'aria-labelledby'?: string
}

/** Standard vertical rhythm and width for page sections. */
export function Section({ id, children, className, ...rest }: SectionProps) {
  return (
    <section id={id} className={cn('py-20 sm:py-28', className)} aria-labelledby={rest['aria-labelledby']}>
      <div className="container-page">{children}</div>
    </section>
  )
}
