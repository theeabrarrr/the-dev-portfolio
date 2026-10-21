import { portfolio } from '../data'

function SectionLabel({ number, title }: { number: string; title: string }) {
  return (
    <p className="section-label">
      <span>{number}</span> / {title}
    </p>
  )
}

export function Awards() {
  return (
    <section className="scene awards" id="awards">
      <div className="scene-inner">
        <SectionLabel number="06" title="AWARDS / HIGHLIGHTS" />
        <h2 className="display">
          PROOF
          <br />
          <em>IN NUMBERS.</em>
        </h2>
        <div className="awards-grid">
          {portfolio.awards.map((award) => (
            <article key={award.label}>
              <strong>{award.value}</strong>
              <span>{award.label}</span>
            </article>
          ))}
        </div>
        <div className="certifications">
          <p className="mono">EDUCATION & CERTIFICATIONS</p>
          {portfolio.certifications.map((cert) => (
            <p key={cert.title}>
              <b>{cert.title}</b>
              <span>{cert.issuer}</span>
            </p>
          ))}
        </div>
      </div>
    </section>
  )
}
