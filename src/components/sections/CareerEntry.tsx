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

/** Initials of an institution name, used as a typographic mark. */
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
 * Every field but the organisation or degree is optional. Without a period the
 * left column disappears and the body reclaims the full width: never an empty
 * column.
 */
export function CareerEntry({ entry }: CareerEntryProps) {
  const ref = useReveal<HTMLLIElement>()

  const experience = isExperience(entry) ? entry : null
  const education = isExperience(entry) ? null : entry

  /**
   * The title is the most precise fact available. Without a known job title
   * the organisation takes the lead: an empty `<h4>` above a subtitle would be
   * a hollow heading for screen readers and an unexplained blank on screen.
   */
  const title = experience ? (experience.role ?? experience.organisation) : (education?.degree ?? '')
  const subtitle = experience
    ? experience.role !== undefined
      ? experience.organisation
      : undefined
    : education?.school

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
          {/* Education entries carry an institutional mark; no invented logo is
              ever drawn — see education.ts. */}
          {education?.school !== undefined ? (
            education.logo !== undefined ? (
              <img
                className={styles.logo}
                src={education.logo}
                alt={education.school}
                width={96}
                height={96}
                loading="lazy"
                decoding="async"
              />
            ) : (
              <span className={styles.mark} aria-hidden="true">
                {initials(education.school)}
              </span>
            )
          ) : null}

          <div className={styles.titles}>
            <h4 className={styles.title}>{title}</h4>
            {subtitle !== undefined ? <p className={styles.organisation}>{subtitle}</p> : null}
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
