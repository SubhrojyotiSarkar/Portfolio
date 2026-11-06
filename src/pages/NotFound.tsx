import { ArrowLeft } from 'lucide-react'
import { ButtonLink } from '../components/Button'
import { useDocumentMeta } from '../hooks/useDocumentMeta'

interface NotFoundProps {
  title?: string
  message?: string
}

export default function NotFound({
  title = 'Page not found',
  message = "The page you're looking for doesn't exist or has moved.",
}: NotFoundProps) {
  useDocumentMeta({ title, description: message })

  return (
    <section className="container-page flex min-h-[75vh] flex-col items-start justify-center pt-24 pb-16">
      <p className="font-mono text-sm text-accent">404</p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight text-fg sm:text-5xl">{title}</h1>
      <p className="mt-4 max-w-md text-lg text-fg-muted">{message}</p>
      <div className="mt-8 flex flex-wrap gap-3">
        <ButtonLink to="/">
          <ArrowLeft size={17} aria-hidden="true" />
          Back to home
        </ButtonLink>
        <ButtonLink to={{ pathname: '/', hash: '#projects' }} variant="secondary">
          View projects
        </ButtonLink>
      </div>
    </section>
  )
}
