import { education } from '../../content/education'
import { experiences } from '../../content/experiences'
import type { PageProps } from '../../types/content'
import { Section } from '../ui/Section'
import { JourneyEntry } from './JourneyEntry'
import styles from './Journey.module.css'

/**
 * Journey — « the road so far ».
 *
 * Two columns side by side, working and learning, so the apprenticeship reads
 * as what it is: both at once. A column with no entry is not rendered.
 */
export function Journey({ section }: PageProps) {
  return (
    <Section section={section} surface="deep">
      <div className={styles.columns}>
        {experiences.length > 0 ? (
          <section aria-labelledby="journey-working">
            <h3 id="journey-working" className={`label ${styles.columnTitle}`}>
              Working
            </h3>
            <ul className={styles.entries}>
              {experiences.map((entry) => (
                <JourneyEntry key={entry.id} entry={entry} />
              ))}
            </ul>
          </section>
        ) : null}

        {education.length > 0 ? (
          <section aria-labelledby="journey-learning">
            <h3 id="journey-learning" className={`label ${styles.columnTitle}`}>
              Learning
            </h3>
            <ul className={styles.entries}>
              {education.map((entry) => (
                <JourneyEntry key={entry.id} entry={entry} />
              ))}
            </ul>
          </section>
        ) : null}
      </div>
    </Section>
  )
}
