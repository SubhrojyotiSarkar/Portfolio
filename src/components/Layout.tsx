import { m } from 'framer-motion'
import { Suspense } from 'react'
import { Outlet, useLocation } from 'react-router'
import { useScrollManager } from '../hooks/useScrollManager'
import { Footer } from './Footer'
import { Navbar } from './Navbar'

function PageFallback() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center" role="status">
      <span aria-hidden="true" className="size-5 animate-spin rounded-full border-2 border-line-strong border-t-accent" />
      <span className="sr-only">Loading page</span>
    </div>
  )
}

export function Layout() {
  const { pathname } = useLocation()
  useScrollManager()

  return (
    <div className="flex min-h-dvh flex-col">
      <Navbar />
      <m.main
        id="main"
        key={pathname}
        tabIndex={-1}
        className="flex-1 outline-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.35 }}
      >
        <Suspense fallback={<PageFallback />}>
          <Outlet />
        </Suspense>
      </m.main>
      <Footer />
    </div>
  )
}
