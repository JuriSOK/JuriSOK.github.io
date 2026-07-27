import type { CSSProperties } from 'react'
import { interests } from '../../content/interests'
import { useReveal } from '../../hooks/useReveal'
import styles from './Interests.module.css'

/** Au-delà, la cascade deviendrait une attente. */
const MAX_STAGGER = 6

/**
 * Centres d'intérêt en tracklist de face B.
 *
 * Bloc embarqué en fin de page « À propos » — il remplace les sections
 * testimonials/clients du format d'origine. Aucune icône, aucun compteur,
 * aucun niveau : la personnalité passe par la composition typographique.
 * Sans note, le filet de conduite s'étend jusqu'au bord et la ligne reste juste.
 */
export function FaceB() {
  const ref = useReveal<HTMLUListElement>()

  if (interests.length === 0) {
    return null
  }

  return (
    <section className={styles.faceB} aria-labelledby="face-b-titre">
      <h3 id="face-b-titre" className={`label ${styles.title}`}>
        Face B · Centres d’intérêt
      </h3>

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
    </section>
  )
}
