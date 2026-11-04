import { about, focusAreas, focusNote, values } from '../../content/about'
import { useReveal } from '../../hooks/useReveal'
import type { PageProps } from '../../types/content'
import { Section } from '../ui/Section'
import styles from './About.module.css'

/**
 * About — « liner notes ».
 *
 * Printed on the cream insert, like the notes inside a sleeve: the bio, three
 * values, then the fields he wants to work in. Each block renders only when it
 * has content.
 */
export function About({ section }: PageProps) {
  const proseRef = useReveal<HTMLDivElement>()
  const valuesRef = useReveal<HTMLDivElement>()
  const focusRef = useReveal<HTMLDivElement>()

  return (
    <Section section={section} surface="paper">
      <div className={styles.grid}>
        <div ref={proseRef} className={`${styles.prose} reveal`}>
          {about.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 40)}>{paragraph}</p>
          ))}
        </div>

        {values.length > 0 ? (
          <div ref={valuesRef} className={`${styles.values} reveal`}>
            <h3 className={`label ${styles.blockTitle}`}>What I care about</h3>
            <dl className={styles.valueList}>
              {values.map((value) => (
                <div key={value.id} className={styles.value}>
                  <dt className={styles.valueName}>{value.name}</dt>
                  <dd className={styles.valueLine}>{value.line}</dd>
                </div>
              ))}
            </dl>
          </div>
        ) : null}
      </div>

      {focusAreas.length > 0 ? (
        <div ref={focusRef} className={`${styles.focus} reveal`}>
          <h3 className={`label ${styles.blockTitle}`}>Where I’m heading</h3>
          <ul className={styles.focusList}>
            {focusAreas.map((area) => (
              <li key={area.id} className={styles.focusRow}>
                <span className={styles.focusName}>{area.name}</span>
                <span className={styles.focusLine}>{area.line}</span>
              </li>
            ))}
          </ul>
          <p className={styles.note}>{focusNote}</p>
        </div>
      ) : null}
    </Section>
  )
}
