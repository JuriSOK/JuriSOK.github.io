import type { ProjectArtName } from '../../types/pixel-art'
import { FallbackScene, ProjectScene } from '../pixel-art/ProjectPixelArt'
import styles from './ProjectSleeve.module.css'

/**
 * Project artwork.
 *
 * The two current projects have hand-drawn pixel-art scenes in the café theme.
 * A future repository, before it gets a scene or an image of its own, receives
 * a deterministic thematic fallback — terminal window, file folders or data
 * blocks — picked from a hash of its id, so the same project always shows the
 * same artwork. Initials remain only as a small corner tag on fallbacks,
 * never as the main visual.
 */

/** Hand-drawn scenes, by project id. */
const sceneByProject: Record<string, ProjectArtName> = {
  'personal-finance-tracker': 'personal-finance-tracker',
  MiniSGBDR: 'minisgbdr',
}

/** Short, stable hash (FNV-1a, 32 bits). */
function hash(value: string): number {
  let result = 0x811c9dc5

  for (let index = 0; index < value.length; index += 1) {
    result ^= value.charCodeAt(index)
    result = Math.imul(result, 0x01000193) >>> 0
  }

  return result
}

/** First two initials of the title, for the small fallback corner tag. */
function initials(title: string): string {
  const words = title
    .replace(/[-_]/g, ' ')
    .split(/\s+/)
    .filter((word) => word.length > 0)

  if (words.length === 0) {
    return '??'
  }

  if (words.length === 1) {
    return (words[0] ?? '').slice(0, 2).toUpperCase()
  }

  return `${(words[0] ?? '').charAt(0)}${(words[1] ?? '').charAt(0)}`.toUpperCase()
}

interface ProjectSleeveProps {
  readonly id: string
  readonly title: string
  readonly image: string | null
  /** Artwork beyond the first cards is lazily loaded. */
  readonly eager: boolean
}

export function ProjectSleeve({ id, title, image, eager }: ProjectSleeveProps) {
  if (image !== null) {
    return (
      <div className={styles.sleeve}>
        <img
          className={styles.image}
          src={image}
          alt={`${title} project artwork`}
          width={800}
          height={800}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
        />
        <span className={styles.tint} aria-hidden="true" />
      </div>
    )
  }

  const scene = sceneByProject[id]

  if (scene !== undefined) {
    /* Decorative: the project title is read just below the sleeve. */
    return (
      <div className={styles.sleeve} aria-hidden="true">
        <ProjectScene name={scene} className={styles.scene} />
      </div>
    )
  }

  return (
    <div className={styles.sleeve} aria-hidden="true">
      <FallbackScene seed={hash(id)} className={styles.scene} />
      <span className={`label ${styles.tag}`}>{initials(title)}</span>
    </div>
  )
}
