import { ArrowLeft, ArrowRight, Check } from 'lucide-react'
import type { ReactNode } from 'react'
import { Link, useParams } from 'react-router'
import { ArchitectureDiagram } from '../components/ArchitectureDiagram'
import { ProjectLinks } from '../components/ProjectLinks'
import { ProjectMetrics } from '../components/ProjectMetrics'
import { Reveal } from '../components/Reveal'
import { TechList } from '../components/TechTag'
import { getProjectBySlug, projects } from '../data/projects'
import { useDocumentMeta } from '../hooks/useDocumentMeta'
import type { Project } from '../types'
import NotFound from './NotFound'

interface DetailSection {
  id: string
  title: string
  content: ReactNode
}

function Paragraphs({ items }: { items: string[] }) {
  return (
    <div className="space-y-4">
      {items.map((text) => (
        <p key={text.slice(0, 40)} className="leading-relaxed text-fg-muted">
          {text}
        </p>
      ))}
    </div>
  )
}

function CheckList({ items }: { items: string[] }) {
  return (
    <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {items.map((item) => (
        <li key={item} className="flex gap-3 rounded-lg border border-line bg-surface p-4 text-sm leading-relaxed text-fg-muted">
          <Check size={16} aria-hidden="true" className="mt-0.5 shrink-0 text-accent" />
          {item}
        </li>
      ))}
    </ul>
  )
}

function Blocks({ items }: { items: { title: string; body: string }[] }) {
  return (
    <div className="divide-y divide-line border-y border-line">
      {items.map((block) => (
        <div key={block.title} className="grid grid-cols-1 gap-2 py-5 sm:grid-cols-[12rem_1fr] sm:gap-8">
          <h3 className="text-sm font-semibold text-fg">{block.title}</h3>
          <p className="text-[0.9375rem] leading-relaxed text-fg-muted">{block.body}</p>
        </div>
      ))}
    </div>
  )
}

/**
 * Builds the page sections from project data. Sections with no content
 * are omitted, so filling in a TODO in `projects.ts` is enough to show it.
 */
function buildSections(project: Project): DetailSection[] {
  const { detail } = project
  const sections: (DetailSection | false)[] = [
    detail.overview.length > 0 && { id: 'overview', title: 'Overview', content: <Paragraphs items={detail.overview} /> },
    detail.problem.length > 0 && { id: 'problem', title: 'Problem statement', content: <Paragraphs items={detail.problem} /> },
    {
      id: 'technologies',
      title: 'Technologies',
      content: <TechList items={project.tech} />,
    },
    detail.features.length > 0 && { id: 'features', title: 'Key features', content: <CheckList items={detail.features} /> },
    (detail.architecture.summary.length > 0 || detail.architecture.diagrams.length > 0) && {
      id: 'architecture',
      title: 'System architecture',
      content: (
        <div className="space-y-8">
          {detail.architecture.diagrams.length > 0 && (
            <div className={detail.architecture.diagrams.length > 1 ? 'grid gap-6 xl:grid-cols-2' : undefined}>
              {detail.architecture.diagrams.map((diagram) => (
                <div key={diagram.title} className="card p-5 sm:p-8">
                  <p className="mb-6 font-mono text-xs uppercase tracking-[0.14em] text-fg-subtle">{diagram.title}</p>
                  <div className="mx-auto max-w-md">
                    <ArchitectureDiagram diagram={diagram} />
                  </div>
                </div>
              ))}
            </div>
          )}
          <Paragraphs items={detail.architecture.summary} />
        </div>
      ),
    },
    detail.implementation.length > 0 && {
      id: 'implementation',
      title: 'Implementation details',
      content: <Blocks items={detail.implementation} />,
    },
    detail.challenges.length > 0 && {
      id: 'challenges',
      title: 'Engineering challenges',
      content: <Blocks items={detail.challenges} />,
    },
    detail.testing.length > 0 && {
      id: 'testing',
      title: 'Testing & evaluation',
      content: (
        <ul className="space-y-3">
          {detail.testing.map((item) => (
            <li key={item} className="flex gap-3 leading-relaxed text-fg-muted">
              <Check size={16} aria-hidden="true" className="mt-1 shrink-0 text-accent" />
              {item}
            </li>
          ))}
        </ul>
      ),
    },
  ]

  return sections.filter((s): s is DetailSection => Boolean(s))
}

function ProjectNav({ project }: { project: Project }) {
  const index = projects.indexOf(project)
  const prev = projects[index - 1]
  const next = projects[index + 1]

  return (
    <nav aria-label="More projects" className="mt-20 grid gap-4 border-t border-line pt-10 sm:grid-cols-2">
      {prev ? (
        <Link
          to={`/projects/${prev.slug}`}
          className="group card flex flex-col gap-1 p-5 transition-colors hover:border-line-strong"
        >
          <span className="flex items-center gap-1.5 text-xs text-fg-subtle">
            <ArrowLeft size={13} aria-hidden="true" /> Previous project
          </span>
          <span className="font-medium text-fg group-hover:text-accent-strong">{prev.title}</span>
        </Link>
      ) : (
        <span aria-hidden="true" />
      )}
      {next && (
        <Link
          to={`/projects/${next.slug}`}
          className="group card flex flex-col items-end gap-1 p-5 text-right transition-colors hover:border-line-strong"
        >
          <span className="flex items-center gap-1.5 text-xs text-fg-subtle">
            Next project <ArrowRight size={13} aria-hidden="true" />
          </span>
          <span className="font-medium text-fg group-hover:text-accent-strong">{next.title}</span>
        </Link>
      )}
    </nav>
  )
}

function ProjectDetailsView({ project }: { project: Project }) {
  useDocumentMeta({ title: project.title, description: project.summary })
  const sections = buildSections(project)
  const hasLinks = Boolean(project.links.github || project.links.demo)

  return (
    <article className="container-page pt-28 pb-20 sm:pt-32">
      <Link
        to={{ pathname: '/', hash: '#projects' }}
        className="inline-flex items-center gap-1.5 text-sm text-fg-muted transition-colors hover:text-fg"
      >
        <ArrowLeft size={15} aria-hidden="true" />
        All projects
      </Link>

      <header className="mt-8 max-w-3xl">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.14em] text-accent">{project.category}</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-fg text-balance sm:text-5xl">{project.title}</h1>
          <p className="mt-5 text-lg leading-relaxed text-fg-muted">{project.tagline}</p>
          <ProjectMetrics metrics={project.metrics} className="mt-8" />
          {hasLinks && (
            <div className="mt-8 flex flex-wrap gap-2.5">
              <ProjectLinks project={project} size="md" />
            </div>
          )}
        </Reveal>
      </header>

      <div className="mt-16 grid gap-12 border-t border-line pt-12 lg:grid-cols-[13rem_1fr] lg:gap-16">
        <aside className="hidden lg:block">
          <nav aria-label="On this page" className="sticky top-28">
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.14em] text-fg-subtle">On this page</p>
            <ol className="space-y-2.5 border-l border-line">
              {sections.map((section) => (
                <li key={section.id}>
                  <Link
                    to={{ hash: `#${section.id}` }}
                    className="-ml-px block border-l border-transparent pl-4 text-sm text-fg-muted transition-colors hover:border-fg-subtle hover:text-fg"
                  >
                    {section.title}
                  </Link>
                </li>
              ))}
              {hasLinks && (
                <li>
                  <Link
                    to={{ hash: '#links' }}
                    className="-ml-px block border-l border-transparent pl-4 text-sm text-fg-muted transition-colors hover:border-fg-subtle hover:text-fg"
                  >
                    Links
                  </Link>
                </li>
              )}
            </ol>
          </nav>
        </aside>

        <div className="min-w-0 space-y-16">
          {sections.map((section, i) => (
            <section key={section.id} id={section.id} aria-labelledby={`${section.id}-title`}>
              <Reveal>
                <h2 id={`${section.id}-title`} className="mb-6 flex items-baseline gap-3 text-2xl font-semibold tracking-tight text-fg">
                  <span className="font-mono text-sm font-normal text-fg-subtle">{String(i + 1).padStart(2, '0')}</span>
                  {section.title}
                </h2>
                {section.content}
              </Reveal>
            </section>
          ))}

          {hasLinks && (
            <section id="links" aria-labelledby="links-title">
              <Reveal className="card flex flex-col gap-5 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
                <div>
                  <h2 id="links-title" className="text-lg font-semibold text-fg">
                    Project links
                  </h2>
                  <p className="mt-1 text-sm text-fg-muted">
                    {project.links.github && project.links.demo
                      ? 'Browse the source code or try the live demo.'
                      : project.links.github
                        ? 'Browse the source code on GitHub.'
                        : 'Try the live demo.'}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  <ProjectLinks project={project} size="md" />
                </div>
              </Reveal>
            </section>
          )}

          <ProjectNav project={project} />
        </div>
      </div>
    </article>
  )
}

export default function ProjectDetails() {
  const { slug } = useParams()
  const project = getProjectBySlug(slug)

  if (!project) {
    return <NotFound title="Project not found" message="There's no project at this address. It may have been renamed." />
  }

  // Keyed so internal state (e.g. reveal animations) resets between projects.
  return <ProjectDetailsView key={project.slug} project={project} />
}
