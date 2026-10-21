import { useState } from 'react'
import { portfolio, type Project } from '../data'
import { TiltCard } from '../components/TiltCard'

function SectionLabel({ number, title }: { number: string; title: string }) {
  return (
    <p className="section-label">
      <span>{number}</span> / {title}
    </p>
  )
}

function ProjectVisualMock({ project }: { project: Project }) {
  switch (project.visualType) {
    case 'gauge':
      return (
        <div className="visual-mock mock-gauge">
          <svg viewBox="0 0 160 90" className="gauge-svg">
            <path d="M 20 80 A 60 60 0 0 1 140 80" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="12" strokeLinecap="round" />
            <path
              d="M 20 80 A 60 60 0 0 1 140 80"
              fill="none"
              stroke="var(--red)"
              strokeWidth="12"
              strokeDasharray="188"
              strokeDashoffset="42"
              strokeLinecap="round"
            />
            <line x1="80" y1="80" x2="115" y2="40" stroke="#fff" strokeWidth="3" strokeLinecap="round" className="gauge-needle" />
            <circle cx="80" cy="80" r="6" fill="#fff" />
          </svg>
          <div className="mock-stat-badge">KPI: 98.4%</div>
        </div>
      )
    case 'nodes':
      return (
        <div className="visual-mock mock-nodes">
          <div className="node-grid">
            <div className="node primary"><span>DB</span></div>
            <div className="node-line horizontal" />
            <div className="node secondary"><span>API</span></div>
            <div className="node-line vertical" />
            <div className="node accent"><span>UI</span></div>
          </div>
          <div className="mock-stat-badge">FASTAPI + PG17</div>
        </div>
      )
    case 'heatmap':
      return (
        <div className="visual-mock mock-heatmap">
          <div className="matrix-grid">
            {Array.from({ length: 18 }, (_, i) => (
              <span key={i} className={`cell cell-${(i % 5) + 1}`} />
            ))}
          </div>
          <div className="mock-stat-badge">M-CODE ETL</div>
        </div>
      )
    case 'terminal':
      return (
        <div className="visual-mock mock-terminal">
          <div className="terminal-header">
            <span className="dot red" />
            <span className="dot yellow" />
            <span className="dot green" />
            <small>parser.py</small>
          </div>
          <div className="terminal-body">
            <code>$ pdfplumber parse --pdf-clean</code>
            <code>[OK] Extracted 420 ERP complaints</code>
            <code className="text-red">[DONE] Exported structured.xlsx</code>
          </div>
        </div>
      )
    case 'image':
    default:
      return (
        <div className="visual-mock mock-canvas">
          <div className="canvas-crosshair top-left" />
          <div className="canvas-crosshair top-right" />
          <div className="canvas-crosshair bottom-left" />
          <div className="canvas-crosshair bottom-right" />
          <div className="canvas-center">
            <span className="canvas-fps">60 FPS</span>
            <small>CANVAS 2D STRIDE</small>
          </div>
        </div>
      )
  }
}

export function Work() {
  const [activeCategory, setActiveCategory] = useState<string>('ALL')

  // Extract unique categories
  const categories = ['ALL', ...Array.from(new Set(portfolio.projects.map((p) => p.category)))]

  const filteredProjects =
    activeCategory === 'ALL'
      ? portfolio.projects
      : portfolio.projects.filter((p) => p.category === activeCategory)

  return (
    <section className="scene work" id="work">
      <div className="scene-inner">
        <SectionLabel number="03" title="SELECTED WORK" />
        
        <div className="work-header">
          <h2 className="display">
            BUILT TO<br />
            <em>MOVE SYSTEMS.</em>
          </h2>
          <p className="work-subtitle">
            Enterprise data automation pipelines, full-stack ERP web platforms, and operational tools engineered for real-world speed and scale.
          </p>
        </div>

        {/* Dynamic Category Filter Tabs */}
        <div className="category-tabs" role="tablist" aria-label="Project categories">
          {categories.map((cat) => (
            <button
              key={cat}
              role="tab"
              aria-selected={activeCategory === cat}
              className={`category-tab ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Dynamic Project Grid with 3D TiltCards */}
        <div className="projects-grid">
          {filteredProjects.map((project) => (
            <TiltCard key={project.number} className="project-card">
              <div className="project-art">
                <div className="project-num-badge">
                  <b>{project.number}</b>
                  <span className="project-category-tag">{project.category}</span>
                </div>
                <ProjectVisualMock project={project} />
                <small className="project-visual-caption">{project.visualMock}</small>
              </div>

              <div className="project-info">
                <h3>{project.title}</h3>
                {project.tagline && <h4 className="project-tagline">{project.tagline}</h4>}
                <p className="project-desc">{project.description}</p>

                {project.metrics && (
                  <div className="project-metric">
                    <span className="metric-icon">⚡</span>
                    <strong>{project.metrics}</strong>
                  </div>
                )}

                <div className="chips">
                  {project.chips.map((chip) => (
                    <span key={chip}>{chip}</span>
                  ))}
                </div>

                <div className="project-actions">
                  {project.github && (
                    <a className="arrow-link" href={project.github} target="_blank" rel="noreferrer">
                      SOURCE CODE ↗
                    </a>
                  )}
                  {project.liveDemo && (
                    <a className="arrow-link live" href={project.liveDemo} target="_blank" rel="noreferrer">
                      LIVE DEMO ↗
                    </a>
                  )}
                </div>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  )
}
