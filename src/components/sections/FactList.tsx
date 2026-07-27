import type { Fact } from '../../types/content'
import styles from './FactList.module.css'

interface FactListProps {
  readonly facts: readonly Fact[]
  /**
   * `column`: narrow column beside the prose.
   * `spread`: two full-width columns.
   */
  readonly layout: 'column' | 'spread'
}

/**
 * Facts list, presented as edition notes: condensed label, value below,
 * separating rule.
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
