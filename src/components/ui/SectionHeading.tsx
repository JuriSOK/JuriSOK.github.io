import { useReveal } from '../../hooks/useReveal'
import { Rule } from './Rule'
import styles from './SectionHeading.module.css'

interface SectionHeadingProps {
  readonly title: string
  /** Editorial line, in italics, under the title. */
  readonly kicker?: string
  /** Id of the heading, referenced by the page's `aria-labelledby`. */
  readonly headingId: string
}

/**
 * Heading shared by every page: title, editorial line, rule.
 *
 * No catalogue number: the identity now rests on typography, warm colour,
 * spacing and fine rules alone.
 */
export function SectionHeading({ title, kicker, headingId }: SectionHeadingProps) {
  const ref = useReveal<HTMLDivElement>()

  return (
    <header className={styles.heading}>
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
