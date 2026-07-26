import { profile } from '../../content/profile'
import { useParallax } from '../../hooks/useParallax'
import styles from './HeroPanel.module.css'

/**
 * Panneau d'édition du hero.
 *
 * Composition typographique volontaire plutôt qu'un disque : marques de coupe,
 * monogramme en contour, filets décroissants et mentions d'édition. L'emplacement
 * central accueillera un portrait sans modifier la composition.
 */
export function HeroPanel() {
  const ref = useParallax()

  return (
    <div ref={ref} className={styles.panel}>
      <span className={`${styles.crop} ${styles.cropTopLeft}`} aria-hidden="true" />
      <span className={`${styles.crop} ${styles.cropTopRight}`} aria-hidden="true" />
      <span className={`${styles.crop} ${styles.cropBottomLeft}`} aria-hidden="true" />
      <span className={`${styles.crop} ${styles.cropBottomRight}`} aria-hidden="true" />

      <p className={`label ${styles.top}`}>{profile.edition}</p>

      <div className={styles.stage} aria-hidden="true">
        <span className={styles.monogram}>SVA</span>
        <span className={styles.bars}>
          <span className={styles.bar} />
          <span className={styles.bar} />
          <span className={styles.bar} />
        </span>
      </div>

      <p className={`label ${styles.bottom}`}>
        <span>Face A</span>
        <span>{profile.year}</span>
      </p>
    </div>
  )
}
