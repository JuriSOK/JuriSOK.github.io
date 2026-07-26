import type { ReactNode } from 'react'
import styles from './Section.module.css'

interface SectionProps {
  readonly id: string
  readonly children: ReactNode
  /**
   * `paper` bascule tout le jeu de jetons vers l'insert crème, accent bordeaux
   * compris. C'est ce qui rend impossible un accent cuivre sur fond clair.
   */
  readonly surface?: 'ink' | 'paper'
  readonly labelledBy?: string
}

export function Section({ id, children, surface = 'ink', labelledBy }: SectionProps) {
  return (
    <section
      id={id}
      className={styles.section}
      {...(surface === 'paper' ? { 'data-surface': 'paper' } : {})}
      {...(labelledBy !== undefined ? { 'aria-labelledby': labelledBy } : {})}
    >
      <div className="shell">{children}</div>
    </section>
  )
}
