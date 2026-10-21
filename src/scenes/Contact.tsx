import { portfolio } from '../data'

function SectionLabel({ number, title }: { number: string; title: string }) {
  return (
    <p className="section-label">
      <span>{number}</span> / {title}
    </p>
  )
}

export function Contact() {
  return (
    <section className="scene contact" id="contact">
      <div className="scene-inner">
        <SectionLabel number="07" title="CONTACT" />
        <h2 className="contact-title">
          LET'S
          <br />
          <em>TALK.</em>
        </h2>
        <p className="body-copy">
          Have an enterprise workflow or operational challenge that needs automation? Let’s engineer something sharp, fast, and scalable.
        </p>
        <a className="email" href={`mailto:${portfolio.contact.email}`}>
          {portfolio.contact.email} ↗
        </a>
        <div className="contact-links">
          <a href={portfolio.contact.github} target="_blank" rel="noreferrer">
            GitHub ↗
          </a>
          <a href={portfolio.contact.linkedin} target="_blank" rel="noreferrer">
            LinkedIn ↗
          </a>
          <a href={portfolio.contact.resume} target="_blank" rel="noreferrer">
            Résumé ↗
          </a>
        </div>
        <footer>
          MUHAMMAD ABRAR / OPERATIONS & AUTOMATION DEV. <span>© 2026</span>
        </footer>
      </div>
    </section>
  )
}
