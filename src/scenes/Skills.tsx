import { portfolio } from '../data'

function SectionLabel({ number, title }: { number: string; title: string }) {
  return (
    <p className="section-label">
      <span>{number}</span> / {title}
    </p>
  )
}

export function Skills() {
  return (
    <section className="scene skills" id="skills">
      <div className="scene-inner">
        <SectionLabel number="05" title="TOOLKIT" />
        <h2 className="display">
          CURIOUS
          <br />
          <em>BY DEFAULT.</em>
        </h2>
        <div className="skill-cloud">
          {portfolio.skills.map((skill, index) => (
            <span className={`skill skill-${index % 4}`} key={skill}>
              {skill}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
