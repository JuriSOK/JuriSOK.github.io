import type { ReactNode } from 'react'
import styles from './Page.module.css'

interface PageProps {
  readonly id: string
  readonly labelledBy: string
  readonly children: ReactNode
}

/**
 * Une page du panneau principal — l'équivalent d'un `<article data-page>` du
 * format vCard. Une seule page est montée à la fois ; l'`id` sert d'ancre pour
 * les liens profonds (`#projets`).
 */
export function Page({ id, labelledBy, children }: PageProps) {
  return (
    <article id={id} aria-labelledby={labelledBy} className={styles.page}>
      {children}
    </article>
  )
}
