import { ArrowUpRight } from 'lucide-react'
import type { Project } from '../types'
import { GithubIcon } from './BrandIcons'
import { ButtonLink } from './Button'

interface ProjectLinksProps {
  project: Project
  size?: 'sm' | 'md'
}

/** GitHub / demo buttons, rendered only for links that actually exist. */
export function ProjectLinks({ project, size = 'sm' }: ProjectLinksProps) {
  const { github, demo } = project.links
  if (!github && !demo) return null

  return (
    <>
      {github && (
        <ButtonLink
          href={github}
          variant="secondary"
          size={size}
          aria-label={`${project.title} source code on GitHub (opens in a new tab)`}
        >
          <GithubIcon size={16} />
          GitHub
        </ButtonLink>
      )}
      {demo && (
        <ButtonLink
          href={demo}
          variant="secondary"
          size={size}
          aria-label={`${project.title} live demo (opens in a new tab)`}
        >
          Live demo
          <ArrowUpRight size={16} aria-hidden="true" />
        </ButtonLink>
      )}
    </>
  )
}
