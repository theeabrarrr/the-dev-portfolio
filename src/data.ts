export type Project = {
  number: string
  category: string
  title: string
  description: string
  chips: string[]
  github: string
  visualMock: string
}

export type JourneyItem = {
  period: string
  role: string
  company: string
}

export type Award = { value: string; label: string }
export type Certification = { title: string; issuer: string }

export const portfolio = {
  firstName: 'ABRAR',
  fullName: 'Muhammad Abrar',
  role: ['OPERATIONS &', 'AUTOMATION DEV.'],
  tagline:
    'Results-driven Operations & Customer Relations professional blending Software Engineering, Python automation, and ERP analytics to transform complex workflows into high-speed systems.',
  manifesto: [
    'I bridge the gap between enterprise operations and software engineering.',
    'From leading customer service logistics at DWP Group to building Python data pipelines, Power Query dashboards, and AI-assisted web apps, I turn manual bottlenecks into automated, high-efficiency workflows.',
  ],
  stats: [
    { value: 79, suffix: '%', label: 'DAE Software Engineering Score (2095/2650)' },
    { value: 6, suffix: '+', label: 'Years in Operations, CRM & Team Leadership' },
    { value: 15, suffix: '+', label: 'Custom Automation Pipelines & Scripts Deployed' },
  ],
  projects: [
    {
      number: '01',
      category: 'PYTHON & STREAMLIT',
      title: 'REPAIR COST ESTIMATOR',
      description: 'Historical closed-complaint part compatibility & standardized gas pricing estimator for field technicians.',
      chips: ['Python', 'Streamlit', 'SQLite', 'Pandas'],
      github: 'https://github.com/theeabrarrr/estimator',
      visualMock: 'Animated gauge & live cost breakdown meter.',
    },
    {
      number: '02',
      category: 'DATA PIPELINE',
      title: 'ERP COMPLAINTS CLEANER',
      description: 'Automated extraction and cleaning pipeline converting multi-page PDF and legacy ERP exports into structured Excel workbooks.',
      chips: ['Python', 'pdfplumber', 'openpyxl', 'Pandas'],
      github: 'https://github.com/theeabrarrr/erp-complaints-cleaner',
      visualMock: 'Animated data transformation heatmap grid.',
    },
    {
      number: '03',
      category: 'BI & WORKFLOW',
      title: 'ERP DISPATCH & PCB SYNC',
      description: 'Self-referencing Power Query M-code feedback loops and Google Apps Script web app for real-time dispatch & PCB tracking.',
      chips: ['Power Query M', 'Apps Script', 'Oracle ERP', 'Excel'],
      github: 'https://github.com/theeabrarrr',
      visualMock: 'Live status sync nodes & chat/log bubbles.',
    },
  ] satisfies Project[],
  journey: [
    { period: '2025 — PRESENT', role: 'CUSTOMER RELATIONS OFFICER', company: 'DWP Group (Digital World Pakistan)' },
    { period: '2022 — 2024', role: 'TEAM LEAD (OPERATIONS & SALES)', company: 'GFX House, Karachi' },
    { period: '2020 — 2022', role: 'SOCIAL MEDIA & OPS EXECUTIVE', company: 'Boutique Brands & DAE Software Engineering (Jinnah Polytechnic)' },
  ] satisfies JourneyItem[],
  skills: [
    'Python', 'Pandas', 'Streamlit', 'Power Query M', 'Advanced Excel', 'Oracle ERP',
    'Google Apps Script', 'SQLite', 'Git & GitHub', 'CRM Systems', 'Route Optimization',
    'Data Analysis', 'PDF Extraction', 'Linux / WSL', 'Team Leadership', 'Process Automation',
  ],
  awards: [
    { value: '2095+', label: 'DAE Marks Scored (Jinnah Polytechnic)' },
    { value: '100%', label: 'SOP & KPI Compliance Rate' },
    { value: '3+', label: 'Enterprise ERP & Web Tools Built' },
    { value: '24/7', label: 'Operations & Dispatch Reliability' },
  ] satisfies Award[],
  certifications: [
    { title: 'DAE in Software Engineering', issuer: 'Sindh Board of Technical Education' },
    { title: 'BS Computer Science (In Process)', issuer: 'UBIT, University of Karachi' },
    { title: 'Enterprise ERP & CRM Operations', issuer: 'DWP Group' },
    { title: 'Python Data & Automation Engineering', issuer: 'Self-Directed / GitHub' },
    { title: 'Global Team & Client Leadership', issuer: 'GFX House' },
    { title: 'Intermediate & Matriculation', issuer: 'Karachi Board' },
  ] satisfies Certification[],
  contact: {
    email: 'croabrarrr@gmail.com',
    github: 'https://github.com/theeabrarrr',
    linkedin: 'https://linkedin.com/in/theabrar14',
    resume: './resume.pdf',
  },
} as const
