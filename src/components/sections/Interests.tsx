import type { CSSProperties } from 'react'
import { interests } from '../../content/interests'
import { useReveal } from '../../hooks/useReveal'
import styles from './Interests.module.css'

/** Beyond this, the stagger turns into a wait. */
const MAX_STAGGER = 6

/**
 * Interests, embedded at the end of the About page.
 *
 * A typographic list: name, leader rule, short note. No icon, no counter, no
 * level, and no track numbering — the identity rests on type and spacing.
 */
export function Interests() {
  const ref = useReveal<HTMLUListElement>()

  if (interests.length === 0) {
    return null
  }

  return (
    <section className={styles.interests} aria-labelledby="interests-title">
      <h3 id="interests-title" className={`label ${styles.title}`}>
        Interests
      </h3>

      <ul ref={ref} className={`${styles.list} reveal`}>
        {interests.map((interest, index) => (
          <li
            key={interest.id}
            className={styles.item}
            style={{ '--reveal-delay': `${Math.min(index, MAX_STAGGER) * 60}ms` } as CSSProperties}
          >
            <span className={styles.name}>{interest.label}</span>
            <span className={styles.lead} aria-hidden="true" />
            {interest.note !== undefined ? (
              <span className={styles.note}>{interest.note}</span>
            ) : null}
          </li>
        ))}
      </ul>
    </section>
  )
}
