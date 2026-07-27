import styles from './CreditList.module.css'

export interface CreditRow {
  readonly label: string
  readonly values: readonly string[]
  /** Values joined on one line, parted by middle dots. */
  readonly inline?: boolean
}

interface CreditListProps {
  readonly rows: readonly CreditRow[]
}

/**
 * « Label — values » structure, in the manner of sleeve credits.
 *
 * A row without values is not rendered: that is what lets an incomplete resume
 * entry stay clean rather than show an orphan label.
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
