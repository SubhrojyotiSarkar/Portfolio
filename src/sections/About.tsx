import { GraduationCap, MapPin } from 'lucide-react'
import { Reveal } from '../components/Reveal'
import { Section } from '../components/Section'
import { SectionHeading } from '../components/SectionHeading'
import { education } from '../data/education'
import { profile } from '../data/profile'

export function About() {
  const university = education.find((e) => e.primary)

  return (
    <Section id="about" aria-labelledby="about-title" className="border-t border-line">
      <SectionHeading
        id="about-title"
        index="01"
        eyebrow="About"
        title="Software engineering with a focus on AI systems that hold up in practice."
      />

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
        <Reveal className="space-y-5">
          {profile.about.map((paragraph) => (
            <p key={paragraph.slice(0, 32)} className="text-[1.0625rem] leading-relaxed text-fg-muted">
              {paragraph}
            </p>
          ))}

          <ul className="flex flex-wrap gap-2 pt-3" aria-label="Focus areas">
            {profile.focusAreas.map((area) => (
              <li key={area} className="rounded-full border border-line px-3 py-1 text-sm text-fg-muted">
                {area}
              </li>
            ))}
          </ul>
        </Reveal>

        {university && (
          <Reveal transition={{ delay: 0.1 }}>
            <aside aria-label="Education summary" className="card p-6 sm:p-7">
              <div className="flex items-center gap-3">
                <span className="flex size-10 items-center justify-center rounded-lg border border-line bg-surface-2 text-accent">
                  <GraduationCap size={20} aria-hidden="true" />
                </span>
                <div>
                  <p className="text-xs uppercase tracking-[0.14em] text-fg-subtle">Education</p>
                  <p className="font-semibold text-fg">{university.institution}</p>
                </div>
              </div>

              <dl className="mt-6 divide-y divide-line border-t border-line">
                {[
                  ['Degree', university.qualification],
                  ['CGPA', university.cgpa],
                  ['Graduation', university.graduation],
                ]
                  .filter((row): row is [string, string] => Boolean(row[1]))
                  .map(([label, value]) => (
                  <div key={label} className="flex items-baseline justify-between gap-4 py-3.5">
                    <dt className="text-sm text-fg-subtle">{label}</dt>
                    <dd className="text-right text-sm font-medium text-fg">{value}</dd>
                  </div>
                ))}
              </dl>

              <p className="mt-4 flex items-center gap-2 text-xs text-fg-subtle">
                <MapPin size={13} aria-hidden="true" />
                {university.location}
              </p>
            </aside>
          </Reveal>
        )}
      </div>
    </Section>
  )
}
