import type { ReactNode } from 'react'
import { Link, type To } from 'react-router'
import { cn } from '../lib/cn'
import { externalLinkProps } from '../lib/site'

type Variant = 'primary' | 'secondary' | 'ghost'
type Size = 'sm' | 'md'

const base =
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg font-medium transition-colors duration-200 select-none'

const variants: Record<Variant, string> = {
  primary: 'bg-fg text-bg hover:bg-white',
  secondary: 'border border-line-strong bg-surface-2 text-fg hover:border-fg-subtle hover:bg-elevated',
  ghost: 'text-fg-muted hover:bg-surface-2 hover:text-fg',
}

const sizes: Record<Size, string> = {
  sm: 'h-9 px-3.5 text-sm',
  md: 'h-11 px-5 text-[0.9375rem]',
}

interface CommonProps {
  children: ReactNode
  variant?: Variant
  size?: Size
  className?: string
  'aria-label'?: string
}

type ButtonLinkProps = CommonProps &
  (
    | { to: To; href?: never; download?: never }
    | { href: string; to?: never; download?: string }
  )

/**
 * A link styled as a button.
 * - `to`: internal route (React Router)
 * - `href`: external URL (opens in a new tab safely) or a file with `download`
 */
export function ButtonLink({ children, variant = 'primary', size = 'md', className, ...rest }: ButtonLinkProps) {
  const classes = cn(base, variants[variant], sizes[size], className)

  if (rest.to !== undefined) {
    return (
      <Link to={rest.to} className={classes} aria-label={rest['aria-label']}>
        {children}
      </Link>
    )
  }

  const isFile = rest.download !== undefined
  const isExternal = /^https?:\/\//.test(rest.href)

  return (
    <a
      href={rest.href}
      className={classes}
      aria-label={rest['aria-label']}
      {...(isFile ? { download: rest.download } : isExternal ? externalLinkProps : {})}
    >
      {children}
    </a>
  )
}
