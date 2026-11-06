import type { Certification, EducationItem } from '../types'

export const education: EducationItem[] = [
  {
    institution: 'Vellore Institute of Technology (VIT‑AP)',
    qualification: 'B.Tech, Computer Science',
    period: 'Sep 2023 – Jun 2027',
    location: 'Amaravathi, Andhra Pradesh',
    result: 'CGPA 8.61/10 (through 7th semester)',
    cgpa: '8.61 / 10',
    graduation: 'June 2027',
    primary: true,
  },
  {
    institution: 'DAV Public School',
    qualification: 'CBSE',
    period: 'Apr 2020 – May 2022',
    location: 'Jamshedpur, Jharkhand',
    result: '79%',
    primary: false,
  },
  {
    institution: 'Kendriya Vidyalaya No. 2, A.F.S. Kalaikunda',
    qualification: 'CBSE',
    period: 'Apr 2010 – Jul 2020',
    location: 'Air Force Station, Kalaikunda',
    result: '91.8%',
    primary: false,
  },
]

export const certifications: Certification[] = [
  {
    title: 'Building Agents with Agentic AI',
    issuer: 'IBMCE (IBM Career Education)',
    credentialId: '3cc5ff9079cb45e98fa61a5eb5282d17',
    credentialUrl: 'https://drive.google.com/file/d/1O5NExnO_Rc5oE8tRfYzpg9NuTSPzMv2n/view',
  },
]
