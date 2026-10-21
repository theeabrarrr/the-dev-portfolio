import { portfolio } from '../data'

function SectionLabel({ number, title }: { number: string; title: string }) {
  return (
    <p className="section-label">
      <span>{number}</span> / {title}
    </p>
  )
}

export function Journey() {
  return (
    <section className="scene journey" id="journey">
      <div className="scene-inner">
        <SectionLabel number="04" title="JOURNEY" />
        <h2 className="display">
          THE LONG
          <br />
          <em>GAME.</em>
        </h2>
        <div className="timeline">
          {portfolio.journey.map((item) => (
            <article key={item.period}>
              <span className="period">{item.period}</span>
              <div>
                <h3>{item.role}</h3>
                <p>{item.company}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
