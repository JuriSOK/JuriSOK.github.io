import { useReveal } from '../../hooks/useReveal'
import { Rule } from './Rule'
import styles from './SectionHeading.module.css'

interface SectionHeadingProps {
  /** Numéro de catalogue, en libellé condensé. Absent pour une section non numérotée. */
  readonly number?: string
  readonly title: string
  /** Ligne éditoriale en italique, sous le titre. */
  readonly kicker?: string
  /** Identifiant du titre, référencé par `aria-labelledby` de la section. */
  readonly headingId: string
}

/**
 * En-tête commun à toutes les sections : numéro de catalogue, titre, ligne
 * éditoriale, filet. C'est la grammaire qui tient l'ensemble du site.
 */
export function SectionHeading({ number, title, kicker, headingId }: SectionHeadingProps) {
  const ref = useReveal<HTMLDivElement>()

  return (
    <header className={styles.heading}>
      {number !== undefined ? (
        <p className={`label ${styles.number}`} aria-hidden="true">
          {number}
        </p>
      ) : null}

      <div ref={ref} className={`${styles.text} reveal`}>
        <h2 id={headingId} className={styles.title}>
          {title}
        </h2>
        {kicker !== undefined ? <p className={styles.kicker}>{kicker}</p> : null}
      </div>

      <Rule tone="strong" className={styles.rule} />
    </header>
  )
}
