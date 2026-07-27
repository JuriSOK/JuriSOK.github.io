import { hackathonConcepts } from '../../content/hackathons'
import type { PageProps } from '../../types/content'
import { useReveal } from '../../hooks/useReveal'
import { HackathonScene } from '../pixel-art/HackathonPixelArt'
import { Page } from '../ui/Page'
import { SectionHeading } from '../ui/SectionHeading'
import { TechBadge } from '../ui/TechBadge'
import styles from './Hackathons.module.css'

/**
 * Hackathons page — concepts only, and honest about it.
 *
 * No hackathon has been attended yet: every card carries the « Concept »
 * status, and nothing on this page shows a date, an organiser, a location, a
 * team, a ranking, a result or a link that does not exist.
 *
 * The cards are styled as café event flyers rather than project cards, so the
 * two cannot be mistaken for one another.
 */
export function Hackathons({ section }: PageProps) {
  const ref = useReveal<HTMLUListElement>()

  return (
    <Page id={section.id} labelledBy="hackathons-title">
      <SectionHeading
        title={section.label}
        {...(section.kicker !== undefined ? { kicker: section.kicker } : {})}
        headingId="hackathons-title"
      />

      <ul ref={ref} className={`${styles.grid} reveal`}>
        {hackathonConcepts.map((concept) => (
          <li key={concept.id} className={styles.ticket}>
            <div className={styles.art} aria-hidden="true">
              <HackathonScene name={concept.pixelArt} className={styles.scene} />
            </div>

            <div className={styles.body}>
              <p className={`label ${styles.status}`}>{concept.status}</p>
              <h3 className={styles.title}>{concept.title}</h3>
              <p className={styles.summary}>{concept.summary}</p>

              <ul className={styles.tech}>
                {concept.technologies.map((name) => (
                  <TechBadge key={name} name={name} />
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ul>
    </Page>
  )
}
