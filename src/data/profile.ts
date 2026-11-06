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
    "I'm a Computer Science undergraduate at Vellore Institute of Technology (VIT-AP), graduating in 2027. Most of what I build sits where machine learning meets backend engineering: services that retrieve, rank and reason over data, wrapped in APIs and interfaces people can actually use.",
    'My recent work includes a hybrid-search RAG system that verifies every citation it produces, and a full-stack recruitment platform that ranks candidates with explainable skill matching. In both, I cared as much about evaluation, testing and deployment as about the model itself.',
    "I'm especially interested in backend architecture and intelligent systems that stay reliable outside a notebook: measurable, well-tested and honest about what they don't know.",
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
