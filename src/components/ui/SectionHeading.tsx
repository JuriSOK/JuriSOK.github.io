import { useReveal } from '../../hooks/useReveal'
import { Rule } from './Rule'
import styles from './SectionHeading.module.css'

interface SectionHeadingProps {
  /** Moment of the evening, e.g. « 9:00 pm · liner notes ». */
  readonly cue: string
  readonly title: string
  /** Editorial line under the title. */
  readonly kicker?: string | undefined
  /** Id of the heading, referenced by the section's `aria-labelledby`. */
  readonly headingId: string
}

/**
 * Heading shared by every section: cue, title, editorial line, rule.
 *
 * The cue is a set-list time, not a number: no section, track or catalogue
 * numbering anywhere.
 */
export function SectionHeading({ cue, title, kicker, headingId }: SectionHeadingProps) {
  const ref = useReveal<HTMLDivElement>()

  return (
    <header className={styles.heading}>
      <div ref={ref} className={`${styles.text} reveal`}>
        <p className={`label ${styles.cue}`}>{cue}</p>
        <h2 id={headingId} className={styles.title}>
          {title}
        </h2>
        {kicker !== undefined ? <p className={styles.kicker}>{kicker}</p> : null}
      </div>

      <Rule tone="strong" className={styles.rule} />
    </header>
  )
}
