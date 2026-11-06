import { ArrowUpRight, Check, Copy, Mail, MapPin, Phone } from 'lucide-react'
import { useEffect, useState, type ReactNode } from 'react'
import { GithubIcon, LinkedinIcon } from '../components/BrandIcons'
import { ButtonLink } from '../components/Button'
import { Reveal } from '../components/Reveal'
import { Section } from '../components/Section'
import { SectionHeading } from '../components/SectionHeading'
import { profile } from '../data/profile'
import { externalLinkProps } from '../lib/site'

function prettyUrl(url: string) {
  return url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')
}

function CopyEmailButton() {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!copied) return
    const t = window.setTimeout(() => setCopied(false), 2000)
    return () => window.clearTimeout(t)
  }, [copied])

  // Clipboard API is unavailable on insecure origins; hide the button there.
  if (typeof navigator === 'undefined' || !navigator.clipboard) return null

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
    } catch {
      setCopied(false)
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex h-11 items-center gap-2 rounded-lg border border-line-strong bg-surface-2 px-4 text-[0.9375rem] font-medium text-fg transition-colors hover:border-fg-subtle hover:bg-elevated"
    >
      {copied ? <Check size={17} aria-hidden="true" className="text-accent" /> : <Copy size={17} aria-hidden="true" />}
      <span aria-live="polite">{copied ? 'Copied' : 'Copy email'}</span>
    </button>
  )
}

interface ChannelProps {
  href: string
  icon: ReactNode
  label: string
  value: string
  external?: boolean
}

function Channel({ href, icon, label, value, external }: ChannelProps) {
  return (
    <li>
      <a
        href={href}
        {...(external ? externalLinkProps : {})}
        className="group flex items-center gap-4 rounded-xl border border-line bg-surface p-4 transition-colors hover:border-line-strong hover:bg-surface-2"
      >
        <span className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-line bg-bg text-fg-muted transition-colors group-hover:text-accent">
          {icon}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-xs text-fg-subtle">{label}</span>
          <span className="block truncate text-sm font-medium text-fg">{value}</span>
        </span>
        <ArrowUpRight
          size={16}
          aria-hidden="true"
          className="shrink-0 text-fg-subtle transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-fg"
        />
        {external && <span className="sr-only">(opens in a new tab)</span>}
      </a>
    </li>
  )
}

export function Contact() {
  const { github, linkedin } = profile.socials

  return (
    <Section id="contact" aria-labelledby="contact-title" className="border-t border-line">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
        <div>
          <SectionHeading
            id="contact-title"
            index="05"
            eyebrow="Contact"
            title="Let's talk."
            description="I'm happy to discuss software engineering, AI and development opportunities, or a project you think I'd find interesting. Email is the fastest way to reach me."
          />
          <Reveal className="-mt-4 flex flex-wrap gap-3">
            <ButtonLink href={`mailto:${profile.email}`}>
              <Mail size={17} aria-hidden="true" />
              Send an email
            </ButtonLink>
            <CopyEmailButton />
          </Reveal>
          <p className="mt-8 flex items-center gap-2 text-sm text-fg-subtle">
            <MapPin size={14} aria-hidden="true" />
            {profile.location}
          </p>
        </div>

        <Reveal className="lg:pt-16">
          <ul className="space-y-3">
            <Channel
              href={`mailto:${profile.email}`}
              icon={<Mail size={18} aria-hidden="true" />}
              label="Email"
              value={profile.email}
            />
            {linkedin && (
              <Channel
                href={linkedin}
                icon={<LinkedinIcon size={17} />}
                label="LinkedIn"
                value={prettyUrl(linkedin)}
                external
              />
            )}
            {github && (
              <Channel href={github} icon={<GithubIcon size={17} />} label="GitHub" value={prettyUrl(github)} external />
            )}
            {profile.showPhone && profile.phone && (
              <Channel
                href={`tel:${profile.phone.replace(/\s+/g, '')}`}
                icon={<Phone size={18} aria-hidden="true" />}
                label="Phone"
                value={profile.phone}
              />
            )}
          </ul>
        </Reveal>
      </div>
    </Section>
  )
}
