import styles from './ProjectSleeve.module.css'

/**
 * Project artwork.
 *
 * Without a supplied image, an abstract composition is drawn from a hash of the
 * project name: the same project therefore always gets the same artwork. That
 * is what keeps the grid coherent whatever the number of available images.
 */

const MOTIFS = ['rules', 'grid', 'bands', 'blocks'] as const
const DUOTONES = ['bordeaux', 'caramel', 'leather'] as const

type Motif = (typeof MOTIFS)[number]
type Duotone = (typeof DUOTONES)[number]

/** Short, stable hash (FNV-1a, 32 bits). */
function hash(value: string): number {
  let result = 0x811c9dc5

  for (let index = 0; index < value.length; index += 1) {
    result ^= value.charCodeAt(index)
    result = Math.imul(result, 0x01000193) >>> 0
  }

  return result
}

/** First two initials of the title. */
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

  const seed = hash(id)
  const motif: Motif = MOTIFS[seed % MOTIFS.length] ?? 'rules'
  const duotone: Duotone = DUOTONES[(seed >>> 8) % DUOTONES.length] ?? 'bordeaux'

  return (
    <div
      className={`${styles.sleeve} ${styles.generated} ${styles[duotone]}`}
      /* Decorative: the project title is read just below. */
      aria-hidden="true"
    >
      <svg className={styles.motif} viewBox="0 0 100 100" preserveAspectRatio="none">
        {motif === 'rules'
          ? Array.from({ length: 9 }, (_, index) => (
              <rect key={index} x={8} y={16 + index * 8} width={84 - index * 7} height={0.9} />
            ))
          : null}

        {motif === 'grid'
          ? Array.from({ length: 16 }, (_, index) => (
              <rect
                key={index}
                x={12 + (index % 4) * 20 + (Math.floor(index / 4) % 2) * 4}
                y={14 + Math.floor(index / 4) * 20}
                width={13}
                height={13}
              />
            ))
          : null}

        {motif === 'bands'
          ? Array.from({ length: 6 }, (_, index) => (
              <rect
                key={index}
                x={-30 + index * 22}
                y={-20}
                width={7}
                height={150}
                transform="rotate(20 50 50)"
              />
            ))
          : null}

        {motif === 'blocks'
          ? [
              <rect key="a" x={10} y={12} width={40} height={40} />,
              <rect key="b" x={56} y={30} width={30} height={30} />,
              <rect key="c" x={22} y={62} width={56} height={4} />,
              <rect key="d" x={22} y={72} width={34} height={4} />,
            ]
          : null}
      </svg>

      <span className={styles.initials}>{initials(title)}</span>
    </div>
  )
}
