import { m } from 'framer-motion'
import { FlagshipProject } from '../components/FlagshipProject'
import { ProjectCard } from '../components/ProjectCard'
import { Section } from '../components/Section'
import { SectionHeading } from '../components/SectionHeading'
import { projects } from '../data/projects'
import { fadeUp, stagger } from '../lib/motion'

export function Projects() {
  const flagship = projects.find((p) => p.flagship)
  const others = projects.filter((p) => p !== flagship)

  return (
    <Section id="projects" aria-labelledby="projects-title" className="border-t border-line">
      <SectionHeading
        id="projects-title"
        index="02"
        eyebrow="Featured projects"
        title="Selected work"
        description="AI systems and full-stack applications, built with attention to retrieval quality, verification and testing."
      />

      {flagship && <FlagshipProject project={flagship} />}

      {others.length > 0 && (
        <m.div
          variants={stagger(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '0px 0px -60px 0px' }}
          className="mt-6 grid gap-6 md:grid-cols-2"
        >
          {others.map((project) => (
            <m.div key={project.slug} variants={fadeUp}>
              <ProjectCard project={project} />
            </m.div>
          ))}
        </m.div>
      )}
    </Section>
  )
}
