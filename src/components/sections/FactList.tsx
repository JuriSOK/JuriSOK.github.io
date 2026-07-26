import type { Fact } from '../../types/content'
import styles from './FactList.module.css'

interface FactListProps {
  readonly facts: readonly Fact[]
  /**
   * `column` : colonne étroite à côté de la prose.
   * `spread` : deux colonnes pleine largeur, quand la prose n'est pas encore écrite.
   */
  readonly layout: 'column' | 'spread'
}

/**
 * Fiche de faits, présentée comme des notes d'édition : libellé condensé,
 * valeur en dessous, filet de séparation.
 */
export function FactList({ facts, layout }: FactListProps) {
  return (
    <dl className={styles.list} data-layout={layout}>
      {facts.map((fact) => (
        <div key={fact.label} className={styles.item} data-full={fact.full === true}>
          <dt className={`label ${styles.term}`}>{fact.label}</dt>
          <dd className={styles.value}>{fact.value}</dd>
        </div>
      ))}
    </dl>
  )
}
