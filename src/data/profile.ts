import type { NavItem, Profile } from '../types'

/**
 * Personal information. Source of truth: resume (public/resume.pdf).
 * Edit this file to update anything shown in the hero, about, contact
 * and footer sections.
 */
export const profile: Profile = {
  name: 'Subhrojyoti Sarkar',
  initials: 'SS',
  role: 'Software Engineer · AI & Backend',
  headline: 'Building Intelligent Systems & Scalable Applications.',
  intro:
    "I'm Subhrojyoti Sarkar, a Computer Science undergraduate at VIT‑AP passionate about AI engineering, backend development and building software that solves real-world problems.",
  educationLabel: 'B.Tech Computer Science · VIT‑AP · 2027',
  location: 'Kharagpur, West Bengal, India',
  availability: 'Open to software engineering & AI opportunities',
  email: 'subhrojyotisarkar60@gmail.com',

  // Optional. Add your number and set `showPhone: true` to display it in
  // the contact section. Left undefined so it is never shipped by default.
  phone: undefined,
  showPhone: false,

  resumeUrl: '/resume.pdf',
  resumeFileName: 'Subhrojyoti_Sarkar_Resume.pdf',

  socials: {
    github: 'https://github.com/SubhrojyotiSarkar',
    linkedin: 'https://www.linkedin.com/in/subhrojyoti-sarkar/',
  },

  about: [
    "I'm a software developer currently pursuing my B.Tech in Computer Science, working towards carving my own path in the tech industry through continuous learning, experimentation, and building my skills. I love building things, exploring ideas, and turning them into something real. I believe in becoming the person you aspire to be before you get there. After all, to make it, you gotta LARP first.",
  ],

  focusAreas: ['AI / ML engineering', 'Retrieval & LLM systems', 'Backend & APIs', 'Full-stack products'],
}

export const navItems: NavItem[] = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
]
