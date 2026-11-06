import { m } from 'framer-motion'
import { Section } from '../components/Section'
import { SectionHeading } from '../components/SectionHeading'
import { SkillCard } from '../components/SkillCard'
import { skillCategories } from '../data/skills'
import { stagger } from '../lib/motion'

export function Skills() {
  return (
    <Section id="skills" aria-labelledby="skills-title" className="border-t border-line">
      <SectionHeading
        id="skills-title"
        index="03"
        eyebrow="Technical skills"
        title="Tools I build with"
        description="Grouped by where they sit in the stack, from data and models to APIs, interfaces and deployment."
      />

      <m.div
        variants={stagger(0.06)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '0px 0px -60px 0px' }}
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        {skillCategories.map((category) => (
          <SkillCard key={category.id} category={category} />
        ))}
      </m.div>
    </Section>
  )
}
