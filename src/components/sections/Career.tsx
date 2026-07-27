import { education } from '../../content/education'
import { experiences } from '../../content/experiences'
import type { PageProps } from '../../types/content'
import { Page } from '../ui/Page'
import { SectionHeading } from '../ui/SectionHeading'
import { CareerEntry } from './CareerEntry'
import { SkillsBlock } from './Skills'
import styles from './Career.module.css'

/**
 * Resume page: experience, education, then skills.
 *
 * No timeline: each entry is a credit sheet. The skills block closes the page,
 * where the reference layout put progress bars — gauges stay banned.
 */
export function Career({ section }: PageProps) {
  return (
    <Page id={section.id} labelledBy="resume-title">
      <SectionHeading
        title={section.label}
        {...(section.kicker !== undefined ? { kicker: section.kicker } : {})}
        headingId="resume-title"
      />

      {experiences.length > 0 ? (
        <section className={styles.movement} aria-labelledby="resume-experience">
          <h3 id="resume-experience" className={`label ${styles.movementTitle}`}>
            Experience
          </h3>
          <ul className={styles.entries}>
            {experiences.map((experience) => (
              <CareerEntry key={experience.id} entry={experience} />
            ))}
          </ul>
        </section>
      ) : null}

      {education.length > 0 ? (
        <section className={styles.movement} aria-labelledby="resume-education">
          <h3 id="resume-education" className={`label ${styles.movementTitle}`}>
            Education
          </h3>
          <ul className={styles.entries}>
            {education.map((entry) => (
              <CareerEntry key={entry.id} entry={entry} />
            ))}
          </ul>
        </section>
      ) : null}

      <SkillsBlock />
    </Page>
  )
}
