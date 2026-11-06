import { m } from 'framer-motion'
import { ArrowRight, Download, GraduationCap } from 'lucide-react'
import { ButtonLink } from '../components/Button'
import { SocialLinks } from '../components/SocialLinks'
import { TerminalCard } from '../components/TerminalCard'
import { profile } from '../data/profile'
import { fadeUp, stagger } from '../lib/motion'

export function Hero() {
  return (
    <section id="home" aria-labelledby="hero-title" className="relative overflow-hidden pt-28 pb-20 sm:pt-36 sm:pb-28">
      <div aria-hidden="true" className="bg-grid pointer-events-none absolute inset-0" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 h-[28rem] w-[56rem] -translate-x-1/2 rounded-full bg-accent/[0.06] blur-3xl"
      />

      <div className="container-page relative grid grid-cols-1 items-center gap-14 lg:grid-cols-[1.3fr_1fr] lg:gap-14">
        <m.div variants={stagger(0.09, 0.05)} initial="hidden" animate="visible" className="min-w-0">
          <m.p
            variants={fadeUp}
            className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/80 px-3 py-1.5 text-xs text-fg-muted"
          >
            <GraduationCap size={14} aria-hidden="true" className="text-accent" />
            {profile.educationLabel}
          </m.p>

          <m.p variants={fadeUp} className="mt-8 font-mono text-sm text-accent">
            {profile.name}
          </m.p>

          <m.h1
            id="hero-title"
            variants={fadeUp}
            className="mt-3 text-display font-semibold text-fg text-balance"
          >
            {profile.headline}
          </m.h1>

          <m.p variants={fadeUp} className="mt-6 max-w-xl text-lg leading-relaxed text-fg-muted">
            {profile.intro}
          </m.p>

          <m.div variants={fadeUp} className="mt-9 flex flex-wrap items-center gap-3">
            <ButtonLink to={{ pathname: '/', hash: '#projects' }}>
              View My Projects
              <ArrowRight size={17} aria-hidden="true" />
            </ButtonLink>
            <ButtonLink href={profile.resumeUrl} download={profile.resumeFileName} variant="secondary">
              <Download size={17} aria-hidden="true" />
              Download Resume
            </ButtonLink>
          </m.div>

          <m.div variants={fadeUp} className="mt-9 flex items-center gap-4">
            <SocialLinks />
            {profile.availability && (
              <p className="flex items-center gap-2 text-sm text-fg-subtle">
                <span aria-hidden="true" className="h-4 w-px bg-line-strong" />
                {profile.availability}
              </p>
            )}
          </m.div>
        </m.div>

        <TerminalCard />
      </div>
    </section>
  )
}
