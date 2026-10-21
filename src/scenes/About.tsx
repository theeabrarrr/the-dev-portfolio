import { portfolio } from '../data'
import { Odometer } from '../components/Odometer'

function SectionLabel({ number, title }: { number: string; title: string }) {
  return (
    <p className="section-label">
      <span>{number}</span> / {title}
    </p>
  )
}

export function About() {
  return (
    <section className="scene about" id="about">
      <div className="scene-inner">
        <SectionLabel number="02" title="ABOUT" />
        <div className="two-column">
          <h2 className="display">
            OPERATIONS
            <br />
            <em>MEETS CODE.</em>
          </h2>
          <div>
            <p className="manifesto">{portfolio.manifesto[0]}</p>
            <p className="body-copy">{portfolio.manifesto[1]}</p>
          </div>
        </div>

        <div className="stats">
          {portfolio.stats.map((stat) => (
            <article className="stat" key={stat.label}>
              <Odometer value={stat.value} suffix={stat.suffix} />
              <span>{stat.label}</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
