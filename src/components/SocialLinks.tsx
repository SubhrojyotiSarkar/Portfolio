import { Mail } from 'lucide-react'
import { profile } from '../data/profile'
import { cn } from '../lib/cn'
import { externalLinkProps } from '../lib/site'
import { GithubIcon, LinkedinIcon } from './BrandIcons'

interface SocialLinksProps {
  className?: string
  includeEmail?: boolean
}

const iconLink =
  'inline-flex size-10 items-center justify-center rounded-lg border border-line text-fg-muted transition-colors hover:border-line-strong hover:bg-surface-2 hover:text-fg'

/** Icon buttons for GitHub / LinkedIn (and optionally email). Hidden when a URL is missing. */
export function SocialLinks({ className, includeEmail = false }: SocialLinksProps) {
  const { github, linkedin } = profile.socials

  return (
    <ul className={cn('flex items-center gap-2', className)}>
      {github && (
        <li>
          <a href={github} className={iconLink} aria-label="GitHub profile (opens in a new tab)" {...externalLinkProps}>
            <GithubIcon />
          </a>
        </li>
      )}
      {linkedin && (
        <li>
          <a
            href={linkedin}
            className={iconLink}
            aria-label="LinkedIn profile (opens in a new tab)"
            {...externalLinkProps}
          >
            <LinkedinIcon />
          </a>
        </li>
      )}
      {includeEmail && (
        <li>
          <a href={`mailto:${profile.email}`} className={iconLink} aria-label={`Email ${profile.email}`}>
            <Mail size={18} aria-hidden="true" />
          </a>
        </li>
      )}
    </ul>
  )
}
