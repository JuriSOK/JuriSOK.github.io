import styles from './CreditList.module.css'

export interface CreditRow {
  readonly label: string
  readonly values: readonly string[]
  /** Valeurs réunies sur une ligne, séparées par des points médians. */
  readonly inline?: boolean
}

interface CreditListProps {
  readonly rows: readonly CreditRow[]
}

/**
 * Structure « Libellé — valeurs », façon crédits de pochette.
 *
 * Une ligne sans valeur n'est pas rendue : c'est ce qui permet à une entrée de
 * parcours incomplète de rester propre plutôt que d'afficher un libellé orphelin.
 */
export function CreditList({ rows }: CreditListProps) {
  const filled = rows.filter((row) => row.values.length > 0)

  if (filled.length === 0) {
    return null
  }

  return (
    <dl className={styles.list}>
      {filled.map((row) => (
        <div key={row.label} className={styles.row}>
          <dt className={`label ${styles.term}`}>{row.label}</dt>
          <dd className={styles.values}>
            {row.inline === true ? (
              row.values.join(' · ')
            ) : (
              <ul className={styles.lines}>
                {row.values.map((value) => (
                  <li key={value}>{value}</li>
                ))}
              </ul>
            )}
          </dd>
        </div>
      ))}
    </dl>
  )
}
