import { createRoot } from 'react-dom/client'
import { useEffect, useState } from 'react'
import '@fontsource/anton'
import '@fontsource-variable/inter-tight'
import '@fontsource/jetbrains-mono'
import './styles.css'
import { portfolio } from './data'
import type { FrameManifest } from './engine/frames'
import { setupScrollEngine } from './engine/director'
import { Stage } from './components/Stage'

function SectionLabel({ number, title }: { number: string; title: string }) {
  return <p className="section-label"><span>{number}</span> / {title}</p>
}

function App() {
  const [manifest, setManifest] = useState<FrameManifest | null>(null)
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    fetch('./frames/manifest.json').then((response) => response.json()).then(setManifest).catch(() => undefined)
    return setupScrollEngine(setProgress)
  }, [])
  return (
    <>
      <div className="layer-back" aria-hidden="true"><div className="hero-name-back">{portfolio.firstName}</div></div>
      <Stage manifest={manifest} />
      <header className="hud">
        <a className="logo" href="#hero">ABRAR<span>®</span></a>
        <nav className="pill-nav">{['about', 'work', 'journey', 'skills', 'awards', 'contact'].map((item) => <a key={item} href={`#${item}`}>{item}</a>)}</nav>
        <div className="progress">{String(progress).padStart(2, '0')}%<i style={{ transform: `scaleX(${progress / 100})` }} /></div>
      </header>
      <main>
        <section className="scene hero" id="hero">
          <div className="scene-inner">
          <div className="hero-copy">
            <SectionLabel number="01" title="HELLO" />
            <h2>{portfolio.role[0]}<br /><em>{portfolio.role[1]}</em></h2>
            <p className="lede">{portfolio.tagline}</p>
          </div>
          <span className="scroll-note">SCROLL TO EXPLORE ↓</span>
          </div>
        </section>

        <section className="scene about" id="about">
          <div className="scene-inner">
          <SectionLabel number="02" title="ABOUT" />
          <div className="two-column">
            <h2 className="display">OPERATIONS<br /><em>MEETS CODE.</em></h2>
            <div><p className="manifesto">{portfolio.manifesto[0]}</p><p className="body-copy">{portfolio.manifesto[1]}</p></div>
          </div>
          <div className="stats">{portfolio.stats.map((stat) => <article className="stat" key={stat.label}><strong>{stat.value}<sup>{stat.suffix}</sup></strong><span>{stat.label}</span></article>)}</div>
          </div>
        </section>

        <section className="scene work" id="work">
          <div className="scene-inner">
          <SectionLabel number="03" title="SELECTED WORK" />
          <h2 className="display">BUILT TO<br /><em>MOVE SYSTEMS.</em></h2>
          <div className="projects">{portfolio.projects.map((project) => <article className="project" key={project.number}><div className="project-art"><b>{project.number}</b><span>◌</span><small>{project.visualMock}</small></div><p className="mono">{project.category}</p><h3>{project.title}</h3><p>{project.description}</p><div className="chips">{project.chips.map((chip) => <span key={chip}>{chip}</span>)}</div><a className="arrow-link" href={project.github} target="_blank" rel="noreferrer">VIEW PROJECT ↗</a></article>)}</div>
          </div>
        </section>

        <section className="scene journey" id="journey">
          <div className="scene-inner">
          <SectionLabel number="04" title="JOURNEY" />
          <h2 className="display">THE LONG<br /><em>GAME.</em></h2>
          <div className="timeline">{portfolio.journey.map((item) => <article key={item.period}><span className="period">{item.period}</span><div><h3>{item.role}</h3><p>{item.company}</p></div></article>)}</div>
          </div>
        </section>

        <section className="scene skills" id="skills">
          <div className="scene-inner">
          <SectionLabel number="05" title="TOOLKIT" />
          <h2 className="display">CURIOUS<br /><em>BY DEFAULT.</em></h2>
          <div className="skill-cloud">{portfolio.skills.map((skill, index) => <span className={`skill skill-${index % 4}`} key={skill}>{skill}</span>)}</div>
          </div>
        </section>

        <section className="scene awards" id="awards">
          <div className="scene-inner">
          <SectionLabel number="06" title="AWARDS / HIGHLIGHTS" />
          <h2 className="display">PROOF<br /><em>IN NUMBERS.</em></h2>
          <div className="awards-grid">{portfolio.awards.map((award) => <article key={award.label}><strong>{award.value}</strong><span>{award.label}</span></article>)}</div>
          <div className="certifications"><p className="mono">EDUCATION & CERTIFICATIONS</p>{portfolio.certifications.map((cert) => <p key={cert.title}><b>{cert.title}</b><span>{cert.issuer}</span></p>)}</div>
          </div>
        </section>

        <section className="scene contact" id="contact">
          <div className="scene-inner">
          <SectionLabel number="07" title="CONTACT" />
          <h2 className="contact-title">LET'S<br /><em>TALK.</em></h2>
          <p className="body-copy">Have a workflow that needs untangling? Let’s build something sharper, faster, and more useful.</p>
          <a className="email" href={`mailto:${portfolio.contact.email}`}>{portfolio.contact.email} ↗</a>
          <div className="contact-links"><a href={portfolio.contact.github}>GitHub ↗</a><a href={portfolio.contact.linkedin}>LinkedIn ↗</a><a href={portfolio.contact.resume}>Résumé ↗</a></div>
          <footer>MUHAMMAD ABRAR / OPERATIONS & AUTOMATION DEV. <span>© 2026</span></footer>
          </div>
        </section>
      </main>
    </>
  )
}

createRoot(document.getElementById('root')!).render(<App />)
