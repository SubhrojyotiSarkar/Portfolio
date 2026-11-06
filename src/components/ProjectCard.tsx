import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router'
import type { Project } from '../types'
import { ProjectLinks } from './ProjectLinks'
import { ProjectMetrics } from './ProjectMetrics'
import { TechList } from './TechTag'

/** Standard project card used for non-flagship projects. */
export function ProjectCard({ project }: { project: Project }) {
  const headingId = `project-${project.slug}`

  return (
    <article
      aria-labelledby={headingId}
      className="card group flex h-full flex-col p-6 transition-colors duration-300 hover:border-line-strong sm:p-7"
    >
      <p className="font-mono text-xs uppercase tracking-[0.14em] text-fg-subtle">{project.category}</p>
      <h3 id={headingId} className="mt-3 text-xl font-semibold tracking-tight text-fg">
        <Link to={`/projects/${project.slug}`} className="hover:text-accent-strong focus-visible:text-accent-strong">
          {project.title}
        </Link>
      </h3>
      <p className="mt-2 text-sm text-accent">{project.tagline}</p>
      <p className="mt-4 text-[0.9375rem] leading-relaxed text-fg-muted">{project.summary}</p>

      <ul className="mt-5 space-y-2">
        {project.highlights.map((h) => (
          <li key={h} className="flex gap-3 text-sm leading-relaxed text-fg-muted">
            <span aria-hidden="true" className="mt-2 size-1 shrink-0 rounded-full bg-fg-subtle" />
            {h}
          </li>
        ))}
      </ul>

      <ProjectMetrics metrics={project.metrics} className="mt-6 border-t border-line pt-5" />

      <div className="mt-6">
        <TechList items={project.tech} />
      </div>

      <div className="mt-auto flex flex-wrap items-center gap-2 pt-7">
        <Link
          to={`/projects/${project.slug}`}
          className="mr-auto inline-flex h-9 items-center gap-1.5 text-sm font-medium text-fg transition-colors hover:text-accent-strong"
          aria-label={`View details: ${project.title}`}
        >
          View details
          <ArrowRight size={16} aria-hidden="true" className="transition-transform group-hover:translate-x-0.5" />
        </Link>
        <ProjectLinks project={project} />
      </div>
    </article>
  )
}
