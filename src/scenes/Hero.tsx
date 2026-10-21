import { portfolio } from '../data'

function SectionLabel({ number, title }: { number: string; title: string }) {
  return (
    <p className="section-label">
      <span>{number}</span> / {title}
    </p>
  )
}

export function Hero() {
  return (
    <section className="scene hero" id="hero">
      <div className="scene-inner">
        <div className="hero-copy">
          <SectionLabel number="01" title="HELLO" />
          <h2>
            {portfolio.role[0]}
            <br />
            <em>{portfolio.role[1]}</em>
          </h2>
          <p className="lede">{portfolio.tagline}</p>
        </div>
        <span className="scroll-note">SCROLL TO EXPLORE ↓</span>
      </div>
    </section>
  )
}
