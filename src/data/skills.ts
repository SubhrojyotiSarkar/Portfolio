import type { SkillCategory } from '../types'

/**
 * Skills grouped by category. No proficiency levels by design.
 * Add or remove entries freely; icons are assigned per category in
 * `src/components/SkillCard.tsx`.
 */
export const skillCategories: SkillCategory[] = [
  {
    id: 'programming',
    title: 'Programming',
    description: 'Languages I write day to day',
    skills: ['Java', 'Python', 'JavaScript', 'HTML', 'CSS', 'SQL'],
  },
  {
    id: 'ai-ml',
    title: 'AI / Machine Learning',
    description: 'Modelling, NLP and retrieval',
    skills: ['TensorFlow', 'scikit-learn', 'Transformers', 'BERT', 'Sentence Transformers', 'Pandas', 'NumPy'],
  },
  {
    id: 'backend',
    title: 'Backend',
    description: 'APIs and services',
    skills: ['FastAPI', 'Node.js', 'Express.js'],
  },
  {
    id: 'frontend',
    title: 'Frontend',
    description: 'User interfaces',
    skills: ['React'],
  },
  {
    id: 'databases',
    title: 'Databases',
    description: 'Relational and document stores',
    skills: ['PostgreSQL', 'MongoDB'],
  },
  {
    id: 'devops',
    title: 'DevOps & Tools',
    description: 'Shipping and experimentation',
    skills: ['Docker', 'Docker Compose', 'Git', 'Jupyter Notebook'],
  },
]
