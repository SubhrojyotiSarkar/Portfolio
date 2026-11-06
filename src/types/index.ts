/**
 * Content model for the portfolio.
 *
 * Every piece of visible content lives in `src/data/*` and conforms to
 * these types. A future FastAPI backend only needs to return JSON in
 * the same shapes; components would then fetch instead of importing.
 */

export type SectionId = 'home' | 'about' | 'projects' | 'skills' | 'experience' | 'contact'

export interface NavItem {
  id: SectionId
  label: string
}

export interface SocialLinks {
  /** Full profile URL, e.g. https://github.com/username. Omit to hide everywhere. */
  github?: string
  linkedin?: string
}

export interface Profile {
  name: string
  initials: string
  /** One-line role shown under the name. */
  role: string
  headline: string
  intro: string
  /** Small label above the hero headline. */
  educationLabel: string
  location: string
  /** Optional line such as "Open to internships". Omit to hide. */
  availability?: string
  email: string
  /**
   * Never rendered unless `showPhone` is true.
   * Leave undefined to keep it out of the bundle entirely.
   */
  phone?: string
  showPhone: boolean
  /** Path under /public. */
  resumeUrl: string
  /** File name suggested to the browser on download. */
  resumeFileName: string
  socials: SocialLinks
  /** Paragraphs for the About section. */
  about: string[]
  focusAreas: string[]
}

export interface ProjectLinks {
  /** Repository URL. Leave undefined to hide the button. */
  github?: string
  /** Live demo URL. Leave undefined to hide the button. */
  demo?: string
}

export interface ProjectMetric {
  value: string
  label: string
}

/** A node in an architecture/pipeline diagram. */
export interface DiagramNode {
  id: string
  label: string
  detail?: string
}

/**
 * A stage with several nodes renders them side by side inside a grouped
 * box. `label` names the group, e.g. "parallel" or "one of".
 */
export interface DiagramGroup {
  label: string
  nodes: DiagramNode[]
}

export type DiagramStage = DiagramNode[] | DiagramGroup

/** An ordered top-to-bottom flow of stages. */
export interface Diagram {
  title: string
  caption?: string
  stages: DiagramStage[]
}

export interface DetailBlock {
  title: string
  body: string
}

export interface ProjectDetail {
  overview: string[]
  problem: string[]
  features: string[]
  architecture: {
    summary: string[]
    diagrams: Diagram[]
  }
  implementation: DetailBlock[]
  challenges: DetailBlock[]
  testing: string[]
}

export interface Project {
  slug: string
  title: string
  /** Short label displayed above the title, e.g. "AI Engineering". */
  category: string
  tagline: string
  summary: string
  tech: string[]
  /** 3–4 bullet highlights shown on cards. */
  highlights: string[]
  metrics: ProjectMetric[]
  links: ProjectLinks
  /** The flagship project gets the large showcase treatment. */
  flagship: boolean
  detail: ProjectDetail
}

export type SkillCategoryId = 'programming' | 'frontend' | 'backend' | 'ai-ml' | 'databases' | 'devops'

export interface SkillCategory {
  id: SkillCategoryId
  title: string
  description: string
  skills: string[]
}

export interface ExperienceItem {
  organization: string
  role: string
  period: string
  location?: string
  points: string[]
}

export interface EducationItem {
  institution: string
  qualification: string
  period: string
  location: string
  /** e.g. "CGPA 8.61/10 (through 7th semester)" */
  result: string
  /** Short values for the About card (primary entry only). */
  cgpa?: string
  graduation?: string
  primary: boolean
}

export interface Certification {
  title: string
  issuer: string
  credentialId?: string
  /** Link to the certificate. Leave undefined to hide the button. */
  credentialUrl?: string
}
