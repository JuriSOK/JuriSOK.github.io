import type { ReactNode } from 'react'
import type { SectionDefinition } from '../../types/content'
import { SectionHeading } from './SectionHeading'
import styles from './Section.module.css'

/**
 * Surface of a section.
 *
 * - `ink`: espresso, the default; copper accent.
 * - `deep`: the darker espresso, to give the scroll a rhythm; copper accent.
 * - `paper`: cream insert; the accent switches to bordeaux, since copper falls
 *   to 3.6:1 on cream. That switch is carried by `data-surface="paper"` in
 *   `tokens.css` — never set the colours by hand.
 */
export type Surface = 'ink' | 'deep' | 'paper'

interface SectionProps {
  readonly section: SectionDefinition
  readonly surface?: Surface
  readonly children: ReactNode
}

/**
 * One chapter of the single-page narrative: an anchored, labelled `<section>`
 * with its cue, heading and content.
 *
 * Every section is opaque. The pixel-art café only shows through the opening
 * screen, so legibility never depends on the background.
 */
export function Section({ section, surface = 'ink', children }: SectionProps) {
  const headingId = `${section.id}-title`

  return (
    <section
      id={section.id}
      aria-labelledby={headingId}
      className={styles.section}
      data-tone={surface}
      {...(surface === 'paper' ? { 'data-surface': 'paper' } : {})}
    >
      <div className={`shell ${styles.inner}`}>
        <SectionHeading
          cue={section.cue}
          title={section.title}
          kicker={section.kicker}
          headingId={headingId}
        />
        {children}
      </div>
    </section>
  )
}
