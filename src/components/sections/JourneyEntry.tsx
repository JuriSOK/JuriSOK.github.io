import type { Education, Experience } from '../../types/content'
import { useReveal } from '../../hooks/useReveal'
import styles from './JourneyEntry.module.css'

interface JourneyEntryProps {
  readonly entry: Experience | Education
}

function isExperience(entry: Experience | Education): entry is Experience {
  return 'organisation' in entry
}

/**
 * One stop on the journey, job or degree.
 *
 * Organisation and institution logos are official assets stored locally, on a
 * cream tile because they all carry dark ink, blended with `multiply`. They
 * are decorative (`alt=""`): the name is always displayed beside them.
 *
 * Every optional field renders conditionally — no empty label, no filler.
 */
export function JourneyEntry({ entry }: JourneyEntryProps) {
  const ref = useReveal<HTMLLIElement>()

  const experience = isExperience(entry) ? entry : null
  const education = isExperience(entry) ? null : entry

  /* Without a known job title, the organisation takes the lead rather than
     leaving an empty heading. */
  const title = experience
    ? (experience.role ?? experience.organisation)
    : (education?.degree ?? '')
  const place = experience
    ? experience.role !== undefined
      ? experience.organisation
      : undefined
    : education?.school

  const logo = experience?.logo ?? education?.logo
  const missions = experience?.missions ?? []
  const tools = experience?.tools ?? []

  return (
    <li ref={ref} className={`${styles.entry} reveal`}>
      <div className={styles.meta}>
        {entry.period !== undefined ? (
          <p className={`label ${styles.period}`}>{entry.period}</p>
        ) : null}

        {experience?.contract !== undefined ? (
          <p className={`label ${styles.stamp}`}>
            {experience.current === true ? (
              <span className={styles.dot} aria-hidden="true" />
            ) : null}
            {experience.contract}
          </p>
        ) : null}
      </div>

      <div className={styles.heading}>
        {logo !== undefined ? (
          <span className={styles.logoTile}>
            <img className={styles.logo} src={logo} alt="" loading="lazy" decoding="async" />
          </span>
        ) : null}

        <div className={styles.titles}>
          <h4 className={styles.title}>{title}</h4>
          {education?.subtitle !== undefined ? (
            <p className={styles.subtitle}>{education.subtitle}</p>
          ) : null}
          {place !== undefined ? (
            <p className={styles.place}>
              {place}
              {education?.location !== undefined ? ` · ${education.location}` : ''}
            </p>
          ) : null}
        </div>
      </div>

      {experience?.summary !== undefined ? (
        <p className={styles.summary}>{experience.summary}</p>
      ) : null}

      {missions.length > 0 ? (
        <ul className={styles.missions}>
          {missions.map((mission) => (
            <li key={mission}>{mission}</li>
          ))}
        </ul>
      ) : null}

      {tools.length > 0 ? (
        <p className={styles.tools}>
          <span className="label">Tools</span> {tools.join(' · ')}
        </p>
      ) : null}
    </li>
  )
}
