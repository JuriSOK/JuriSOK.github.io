import type { CSSProperties } from 'react'
import { interests } from '../../content/interests'
import { getSection, isSectionVisible } from '../../content/sections'
import { useReveal } from '../../hooks/useReveal'
import { Section } from '../ui/Section'
import { SectionHeading } from '../ui/SectionHeading'
import styles from './Interests.module.css'

const section = getSection('interets')

/** Au-delà, la cascade deviendrait une attente. */
const MAX_STAGGER = 6

/**
 * Centres d'intérêt en tracklist de face B.
 *
 * Aucune icône, aucune image, aucun compteur, aucun niveau : la personnalité
 * passe par la composition typographique. Sans note, le filet de conduite
 * s'étend jusqu'au bord et la ligne reste juste.
 */
export function Interests() {
  const ref = useReveal<HTMLUListElement>()

  if (section === undefined || !isSectionVisible(section.id)) {
    return null
  }

  return (
    <Section id={section.id} surface={section.surface} labelledBy="interets-titre">
      <SectionHeading
        {...(section.number !== undefined ? { number: section.number } : {})}
        title={section.label}
        {...(section.kicker !== undefined ? { kicker: section.kicker } : {})}
        headingId="interets-titre"
      />

      <ul ref={ref} className={`${styles.list} reveal`}>
        {interests.map((interest, index) => (
          <li
            key={interest.id}
            className={styles.item}
            style={{ '--reveal-delay': `${Math.min(index, MAX_STAGGER) * 60}ms` } as CSSProperties}
          >
            <span className={`label ${styles.index}`} aria-hidden="true">
              B{index + 1}
            </span>
            <span className={styles.name}>{interest.label}</span>
            <span className={styles.lead} aria-hidden="true" />
            {interest.note !== undefined ? (
              <span className={styles.note}>{interest.note}</span>
            ) : null}
          </li>
        ))}
      </ul>
    </Section>
  )
}
