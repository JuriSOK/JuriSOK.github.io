import styles from './AppBackground.module.css'

/**
 * Full-screen animated background.
 *
 * A fixed layer behind everything: decorative, inert and outside the document
 * flow. It never intercepts pointer events, never shifts the layout and stays
 * in place while tabs switch.
 *
 * Under `prefers-reduced-motion` the animated GIF is swapped for a still frame
 * of the same scene. A GIF cannot be paused from CSS, so hiding it would be the
 * only alternative — and that would leave an empty background rather than a
 * calm one.
 */
export function AppBackground() {
  return <div className={styles.background} aria-hidden="true" />
}
