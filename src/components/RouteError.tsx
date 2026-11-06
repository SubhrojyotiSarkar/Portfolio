import { isRouteErrorResponse, useRouteError } from 'react-router'

/**
 * Last-resort error screen (e.g. a lazily loaded chunk failed after a
 * redeploy). Kept dependency-free so it renders even if the layout broke.
 */
export function RouteError() {
  const error = useRouteError()
  const message = isRouteErrorResponse(error)
    ? `${error.status} ${error.statusText}`
    : 'Something went wrong while loading this page.'

  return (
    <main className="container-page flex min-h-dvh flex-col items-start justify-center py-16">
      <p className="font-mono text-sm text-accent">Error</p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight text-fg sm:text-4xl">{message}</h1>
      <p className="mt-4 max-w-md text-fg-muted">Reloading usually fixes this.</p>
      <div className="mt-8 flex gap-3">
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="inline-flex h-11 items-center rounded-lg bg-fg px-5 text-[0.9375rem] font-medium text-bg hover:bg-white"
        >
          Reload
        </button>
        <a
          href="/"
          className="inline-flex h-11 items-center rounded-lg border border-line-strong px-5 text-[0.9375rem] font-medium text-fg hover:bg-surface-2"
        >
          Go home
        </a>
      </div>
    </main>
  )
}
