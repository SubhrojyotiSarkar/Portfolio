import { ArrowRight, Check } from 'lucide-react'
import type { Project } from '../types'
import { ArchitectureDiagram } from './ArchitectureDiagram'
import { ButtonLink } from './Button'
import { ProjectLinks } from './ProjectLinks'
import { ProjectMetrics } from './ProjectMetrics'
import { Reveal } from './Reveal'
import { TechList } from './TechTag'

/** Large, two-column showcase for the flagship project. */
export function FlagshipProject({ project }: { project: Project }) {
  const headingId = `project-${project.slug}`
  const diagram = project.detail.architecture.diagrams[0]

  return (
    <Reveal>
      <article
        aria-labelledby={headingId}
        className="card relative overflow-hidden border-line-strong bg-gradient-to-b from-surface-2 to-surface"
      >
        <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent" />

        <div className="grid grid-cols-1 gap-10 p-6 sm:p-8 lg:grid-cols-[1.25fr_1fr] lg:gap-12 lg:p-10">
          <div className="flex flex-col">
            <p className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.14em] text-accent">
              <span className="size-1.5 rounded-full bg-accent" aria-hidden="true" />
              {project.category}
            </p>
            <h3 id={headingId} className="mt-4 text-2xl font-semibold tracking-tight text-fg text-balance sm:text-3xl">
              {project.title}
            </h3>
            <p className="mt-3 text-base text-fg">{project.tagline}</p>
            <p className="mt-4 leading-relaxed text-fg-muted">{project.summary}</p>

            <ul className="mt-6 grid gap-3">
              {project.highlights.map((h) => (
                <li key={h} className="flex gap-3 text-sm leading-relaxed text-fg-muted">
                  <Check size={16} aria-hidden="true" className="mt-0.5 shrink-0 text-accent" />
                  {h}
                </li>
              ))}
            </ul>

            <ProjectMetrics metrics={project.metrics} className="mt-8 border-t border-line pt-6" />

            <div className="mt-6">
              <TechList items={project.tech} />
            </div>

            <div className="mt-8 flex flex-wrap gap-2.5 lg:mt-auto lg:pt-8">
              <ButtonLink to={`/projects/${project.slug}`} size="sm" aria-label={`View details: ${project.title}`}>
                View details
                <ArrowRight size={16} aria-hidden="true" />
              </ButtonLink>
              <ProjectLinks project={project} />
            </div>
          </div>

          {diagram && (
            <div className="rounded-xl border border-line bg-bg/60 p-5 sm:p-6">
              <p className="mb-5 font-mono text-xs uppercase tracking-[0.14em] text-fg-subtle">{diagram.title}</p>
              <ArchitectureDiagram diagram={diagram} />
            </div>
          )}
        </div>
      </article>
    </Reveal>
  )
}
