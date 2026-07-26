import styles from './GrainOverlay.module.css'

/**
 * Grain de papier appliqué à toute la page.
 *
 * Le motif est un SVG `feTurbulence` en `data:` (moins d'un kilo-octet), répété
 * et figé : un grain animé recalculerait la texture à chaque image pour un gain
 * visuel nul.
 */
export function GrainOverlay() {
  return <div className={styles.grain} aria-hidden="true" />
}
