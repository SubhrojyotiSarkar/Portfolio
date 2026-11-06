import { m } from 'framer-motion'
import { Brain, CodeXml, Container, Database, PanelsTopLeft, Server, type LucideIcon } from 'lucide-react'
import { fadeUp } from '../lib/motion'
import type { SkillCategory, SkillCategoryId } from '../types'

const categoryIcons: Record<SkillCategoryId, LucideIcon> = {
  programming: CodeXml,
  frontend: PanelsTopLeft,
  backend: Server,
  'ai-ml': Brain,
  databases: Database,
  devops: Container,
}

export function SkillCard({ category }: { category: SkillCategory }) {
  const Icon = categoryIcons[category.id]
  const headingId = `skills-${category.id}`

  return (
    <m.article
      variants={fadeUp}
      aria-labelledby={headingId}
      className="card flex h-full flex-col p-6 transition-colors duration-300 hover:border-line-strong"
    >
      <div className="flex items-center gap-3">
        <span className="flex size-9 items-center justify-center rounded-lg border border-line bg-surface-2 text-accent">
          <Icon size={18} aria-hidden="true" />
        </span>
        <div>
          <h3 id={headingId} className="text-sm font-semibold text-fg">
            {category.title}
          </h3>
          <p className="text-xs text-fg-subtle">{category.description}</p>
        </div>
      </div>

      <ul className="mt-5 flex flex-wrap gap-2">
        {category.skills.map((skill) => (
          <li
            key={skill}
            className="rounded-md border border-line bg-bg px-2.5 py-1 text-[0.8125rem] text-fg-muted transition-colors hover:border-line-strong hover:text-fg"
          >
            {skill}
          </li>
        ))}
      </ul>
    </m.article>
  )
}
