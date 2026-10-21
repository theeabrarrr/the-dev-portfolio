export type Project = {
  number: string
  id: string
  category: string
  title: string
  tagline: string
  description: string
  chips: string[]
  metrics?: string
  github?: string
  liveDemo?: string
  featured: boolean
  visualType: 'gauge' | 'heatmap' | 'nodes' | 'terminal' | 'image'
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
      id: 'estimator',
      category: 'PYTHON & STREAMLIT',
      title: 'DWP FIELD ASSISTANT ENGINE',
      tagline: 'Diagnostic & Field Operations Suite',
      description:
        'Streamlined diagnostic and field operations tool built for Service Center tracking, Customer Complaint History search, part compatibility checks, and Technician Performance KPI calculations.',
      chips: ['Python', 'Streamlit', 'SQLite', 'Pandas', 'KPI Analytics'],
      metrics: 'Standardized field pricing & 4x faster complaint lookup',
      github: 'https://github.com/theeabrarrr/estimator',
      liveDemo: '',
      featured: true,
      visualType: 'gauge',
      visualMock: 'Animated repair cost breakdown & diagnostic gauge meter.',
    },
    {
      number: '02',
      id: 'lpg-gasflow',
      category: 'FULL STACK & ERP',
      title: 'GASFLOW OPERATIONS PLATFORM',
      tagline: 'B2B LPG Cylinder Distribution & Ledger ERP',
      description:
        'Specialized enterprise operations platform and dashboard designed for a single-godown B2B LPG Cylinder Distribution business in Pakistan. Combines a frosted glassmorphic React frontend with a high-performance FastAPI backend connected to Supabase Cloud PostgreSQL 17.',
      chips: ['React', 'FastAPI', 'PostgreSQL 17', 'Supabase', 'Tailwind CSS'],
      metrics: 'Real-time cylinder ledger reconciliation',
      github: 'https://github.com/theeabrarrr/lpg-gasflow',
      liveDemo: '',
      featured: true,
      visualType: 'nodes',
      visualMock: 'Live inventory ledger sync & transaction nodes.',
    },
    {
      number: '03',
      id: 'rejection-tracking',
      category: 'DATA PIPELINE & ETL',
      title: 'WARRANTY REJECTION & PARTS ETL',
      tagline: 'Automated Hardware Rejection Reconciliation',
      description:
        'Automated ETL and reconciliation pipeline in Microsoft Excel Power Query (M-Code). Resolves hardware replacement disputes (PCBs and boards) between store in-charges and field technicians by dynamically consolidating monthly rejection dumps, filtering non-warranty transactions, and merging system complaints with manual return logs.',
      chips: ['Power Query M', 'Excel ETL', 'Data Cleansing', 'Folder Automation'],
      metrics: 'Zero inventory handover dispute rate',
      github: 'https://github.com/theeabrarrr/rejection-tracking-etl-pipeline',
      liveDemo: '',
      featured: true,
      visualType: 'heatmap',
      visualMock: 'Automated multi-source M-code ETL reconciliation pipeline.',
    },
    {
      number: '04',
      id: 'erp-complaints-cleaner',
      category: 'PYTHON & AUTOMATION',
      title: 'ERP COMPLAINTS CLEANER',
      tagline: 'Legacy ERP Print-Export Automated Parser',
      description:
        'Automated data extraction and cleansing pipeline converting multi-page raw ERP print-exports and messy PDF reports into structured, normalized, and formula-ready Excel workbooks.',
      chips: ['Python', 'pdfplumber', 'openpyxl', 'Pandas', 'Regex'],
      metrics: 'Eliminated manual report restructuring',
      github: 'https://github.com/theeabrarrr/erp-complaints-cleaner',
      liveDemo: '',
      featured: true,
      visualType: 'terminal',
      visualMock: 'Regex text extractor & Excel workbook normalization.',
    },
    {
      number: '05',
      id: 'the-dev-portfolio',
      category: 'CREATIVE TECH & 3D',
      title: 'SCROLL-DRIVEN 3D PORTFOLIO',
      tagline: 'Award-Level Creative Engineering Showcase',
      description:
        'High-performance scroll-driven personal engineering portfolio featuring pure CSS 3D, HTML5 Canvas transparent video frame streaming, Lenis smooth scrolling, mechanical odometer dials, and reactive cursor HUD.',
      chips: ['React 19', 'TypeScript', 'GSAP', 'Lenis', 'HTML5 Canvas', 'CSS 3D'],
      metrics: '60 FPS scroll frame-sync & zero Three.js bloat',
      github: 'https://github.com/theeabrarrr/the-dev-portfolio',
      liveDemo: '',
      featured: true,
      visualType: 'image',
      visualMock: 'Canvas 2D frame streamer & 3D tilt interaction layer.',
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
