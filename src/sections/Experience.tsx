import { ArrowUpRight, Award, BadgeCheck, GraduationCap, Users } from 'lucide-react'
import { Reveal } from '../components/Reveal'
import { Section } from '../components/Section'
import { SectionHeading } from '../components/SectionHeading'
import { Timeline } from '../components/Timeline'
import { certifications, education } from '../data/education'
import { experience } from '../data/experience'
import { externalLinkProps } from '../lib/site'

export function Experience() {
  return (
    <Section id="experience" aria-labelledby="experience-title" className="border-t border-line">
      <SectionHeading
        id="experience-title"
        index="04"
        eyebrow="Experience & education"
        title="Leadership, education and certification"
      />

      <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-12">
        <div>
          <h3 className="mb-8 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-fg-subtle">
            <Users size={14} aria-hidden="true" />
            Leadership
          </h3>
          <Timeline
            entries={experience.map((item) => ({
              id: `${item.organization}-${item.role}`,
              title: item.role,
              subtitle: item.organization,
              period: item.period,
              meta: item.location,
              icon: <Award size={14} aria-hidden="true" />,
              children: (
                <ul className="space-y-2.5">
                  {item.points.map((point) => (
                    <li key={point} className="flex gap-3 text-[0.9375rem] leading-relaxed text-fg-muted">
                      <span aria-hidden="true" className="mt-2.5 size-1 shrink-0 rounded-full bg-fg-subtle" />
                      {point}
                    </li>
                  ))}
                </ul>
              ),
            }))}
          />

          {certifications.length > 0 && (
            <Reveal className="mt-14">
              <h3 className="mb-6 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-fg-subtle">
                <BadgeCheck size={14} aria-hidden="true" />
                Certification
              </h3>
              <ul className="space-y-3">
                {certifications.map((cert) => (
                  <li key={cert.title} className="card flex flex-col gap-4 p-5 sm:flex-row sm:items-center">
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-fg">{cert.title}</p>
                      <p className="mt-1 text-sm text-fg-muted">{cert.issuer}</p>
                      {cert.credentialId && (
                        <p className="mt-2 truncate font-mono text-xs text-fg-subtle" title={cert.credentialId}>
                          ID {cert.credentialId}
                        </p>
                      )}
                    </div>
                    {cert.credentialUrl && (
                      <a
                        href={cert.credentialUrl}
                        {...externalLinkProps}
                        className="inline-flex shrink-0 items-center gap-1.5 self-start text-sm font-medium text-accent transition-colors hover:text-accent-strong sm:self-center"
                        aria-label={`View ${cert.title} certificate (opens in a new tab)`}
                      >
                        View certificate
                        <ArrowUpRight size={15} aria-hidden="true" />
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </Reveal>
          )}
        </div>

        <div>
          <h3 className="mb-8 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-fg-subtle">
            <GraduationCap size={14} aria-hidden="true" />
            Education
          </h3>
          <Timeline
            entries={education.map((item) => ({
              id: item.institution,
              title: item.institution,
              subtitle: item.qualification,
              period: item.period,
              meta: item.location,
              icon: item.primary ? <GraduationCap size={14} aria-hidden="true" /> : undefined,
              children: (
                <p className={item.primary ? 'text-sm font-medium text-accent' : 'text-sm text-fg-muted'}>
                  {item.result}
                </p>
              ),
            }))}
          />
        </div>
      </div>
    </Section>
  )
}
