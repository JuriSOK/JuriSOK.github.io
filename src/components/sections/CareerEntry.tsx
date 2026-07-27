import type { Education, Experience } from '../../types/content'
import { useReveal } from '../../hooks/useReveal'
import { CreditList, type CreditRow } from './CreditList'
import styles from './CareerEntry.module.css'

interface CareerEntryProps {
  readonly entry: Experience | Education
}

function isExperience(entry: Experience | Education): entry is Experience {
  return 'organisation' in entry
}

/** Initials of an institution name, used only when no official logo exists. */
function initials(name: string): string {
  const skip = new Set(['de', 'du', 'des', 'la', 'le', 'les', 'and', 'of'])

  return name
    .split(/[\s-]+/)
    .filter((word) => word.length > 0 && !skip.has(word.toLowerCase()))
    .slice(0, 3)
    .map((word) => word.charAt(0).toUpperCase())
    .join('')
}

/**
 * Credit sheet for one resume entry, experience or education.
 *
 * Organisation and institution logos are official assets stored locally, shown
 * on a cream tile because they all carry dark ink. They are decorative
 * (`alt=""`): the organisation name is always displayed right beside them, and
 * a duplicate accessible name would be read twice.
 */
export function CareerEntry({ entry }: CareerEntryProps) {
  const ref = useReveal<HTMLLIElement>()

  const experience = isExperience(entry) ? entry : null
  const education = isExperience(entry) ? null : entry

  /**
   * The title is the most precise fact available. Without a known job title
   * the organisation takes the lead: an empty heading above a subtitle would
   * be hollow for screen readers and an unexplained blank on screen.
   */
  const title = experience ? (experience.role ?? experience.organisation) : (education?.degree ?? '')
  const subtitle = experience
    ? experience.role !== undefined
      ? experience.organisation
      : undefined
    : education?.school

  const logo = experience?.logo ?? education?.logo
  const markName = education?.school

  const period = entry.period

  const rows: CreditRow[] = experience
    ? [
        { label: 'Missions', values: experience.missions ?? [] },
        { label: 'Domains', values: experience.domains ?? [], inline: true },
        { label: 'Tools', values: experience.tools ?? [], inline: true },
      ]
    : [
        { label: 'Fields', values: education?.fields ?? [], inline: true },
        { label: 'Highlights', values: education?.highlights ?? [] },
      ]

  return (
    <li ref={ref} className={`${styles.entry} reveal`} data-period={period !== undefined}>
      {period !== undefined ? <p className={`label ${styles.period}`}>{period}</p> : null}

      <div className={styles.body}>
        <div className={styles.heading}>
          {logo !== undefined ? (
            <span className={styles.logoTile}>
              <img
                className={styles.logo}
                src={logo}
                alt=""
                loading="lazy"
                decoding="async"
              />
            </span>
          ) : markName !== undefined ? (
            <span className={styles.mark} aria-hidden="true">
              {initials(markName)}
            </span>
          ) : null}

          <div className={styles.titles}>
            <h4 className={styles.title}>{title}</h4>

            {education?.subtitle !== undefined ? (
              <p className={styles.subtitle}>{education.subtitle}</p>
            ) : null}

            {subtitle !== undefined ? (
              <p className={styles.organisation}>
                {subtitle}
                {education?.location !== undefined ? (
                  <span className={styles.place}> · {education.location}</span>
                ) : null}
              </p>
            ) : null}
          </div>

          {experience?.contract !== undefined || experience?.current === true ? (
            <p className={`label ${styles.stamp}`}>
              {experience.current === true ? (
                <span className={styles.dot} aria-hidden="true" />
              ) : null}
              {experience.contract ?? 'Current'}
            </p>
          ) : null}
        </div>

        {experience?.summary !== undefined ? (
          <p className={styles.summary}>{experience.summary}</p>
        ) : null}

        <CreditList rows={rows} />
      </div>
    </li>
  )
}
