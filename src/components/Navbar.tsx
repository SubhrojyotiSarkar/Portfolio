import { AnimatePresence, m } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router'
import { navItems, profile } from '../data/profile'
import { useActiveSection } from '../hooks/useActiveSection'
import { useScrolled } from '../hooks/useScrolled'
import { cn } from '../lib/cn'
import { easeOutSoft } from '../lib/motion'
import type { SectionId } from '../types'

const sectionIds = navItems.map((item) => item.id)

export function Navbar() {
  const { pathname } = useLocation()
  const isHome = pathname === '/'
  const active = useActiveSection<SectionId>(sectionIds, isHome)
  const scrolled = useScrolled()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    const onResize = () => {
      if (window.innerWidth >= 768) setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('resize', onResize)
    }
  }, [open])

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color] duration-300',
        scrolled || open ? 'border-line bg-bg/85 backdrop-blur-md' : 'border-transparent bg-transparent',
      )}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded-md focus:bg-fg focus:px-3 focus:py-2 focus:text-sm focus:text-bg"
      >
        Skip to content
      </a>

      <nav aria-label="Primary" className="container-page flex h-16 items-center justify-between">
        <Link
          to={{ pathname: '/', hash: '#home' }}
          onClick={() => setOpen(false)}
          className="group flex items-center gap-2.5"
          aria-label={`${profile.name}, home`}
        >
          <span
            aria-hidden="true"
            className="flex size-8 items-center justify-center rounded-md border border-line-strong bg-surface font-mono text-[0.8rem] font-bold tracking-tight text-fg transition-colors group-hover:border-accent-muted"
          >
            S<span className="text-accent">S</span>
          </span>
          <span className="hidden text-sm font-medium text-fg sm:inline">{profile.name}</span>
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => {
            const isActive = active === item.id
            return (
              <li key={item.id}>
                <Link
                  to={{ pathname: '/', hash: `#${item.id}` }}
                  aria-current={isActive ? 'location' : undefined}
                  className={cn(
                    'relative rounded-md px-3 py-2 text-sm transition-colors',
                    isActive ? 'text-fg' : 'text-fg-muted hover:text-fg',
                  )}
                >
                  {item.label}
                  <span
                    aria-hidden="true"
                    className={cn(
                      'absolute inset-x-3 -bottom-0.5 h-px origin-center bg-accent transition-transform duration-300',
                      isActive ? 'scale-x-100' : 'scale-x-0',
                    )}
                  />
                </Link>
              </li>
            )
          })}
        </ul>

        <button
          type="button"
          className="inline-flex size-10 items-center justify-center rounded-lg text-fg-muted transition-colors hover:bg-surface-2 hover:text-fg md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
        </button>
      </nav>

      <AnimatePresence initial={false}>
        {open && (
          <m.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: easeOutSoft }}
            className="overflow-hidden border-t border-line md:hidden"
          >
            <ul className="container-page flex flex-col py-3">
              {navItems.map((item) => {
                const isActive = active === item.id
                return (
                  <li key={item.id}>
                    <Link
                      to={{ pathname: '/', hash: `#${item.id}` }}
                      onClick={() => setOpen(false)}
                      aria-current={isActive ? 'location' : undefined}
                      className={cn(
                        'flex items-center justify-between rounded-md px-2 py-3 text-base transition-colors',
                        isActive ? 'text-fg' : 'text-fg-muted hover:text-fg',
                      )}
                    >
                      {item.label}
                      {isActive && <span className="size-1.5 rounded-full bg-accent" aria-hidden="true" />}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </m.div>
        )}
      </AnimatePresence>
    </header>
  )
}
