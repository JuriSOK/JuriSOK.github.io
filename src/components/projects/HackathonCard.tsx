import type { Hackathon } from '../../types/content'
import { useReveal } from '../../hooks/useReveal'
import { HackathonScene } from '../pixel-art/HackathonPixelArt'
import { ButtonLink } from '../ui/ButtonLink'
import { TechBadge } from '../ui/TechBadge'
import styles from './HackathonCard.module.css'

interface HackathonCardProps {
  readonly hackathon: Hackathon
}

/**
 * One hackathon, laid out wide: the pixel-art scene on one side, the facts on
 * the other — event, period, what it does, his part, and a result only when a
 * real one exists.
 *
 * With a single link the button stretches over the whole card: one tab stop.
 * With two, each keeps its own target and names the project for screen
 * readers, since « Source » alone is ambiguous out of context.
 */
export function HackathonCard({ hackathon }: HackathonCardProps) {
  const ref = useReveal<HTMLLIElement>()
  const single = hackathon.links.length === 1

  return (
    <li ref={ref} className={`${styles.card} reveal`}>
      <div className={styles.art} aria-hidden="true">
        <HackathonScene name={hackathon.pixelArt} className={styles.scene} />
      </div>

      <div className={styles.body}>
        <p className={`label ${styles.meta}`}>
          {hackathon.event} · {hackathon.period}
        </p>
        <h3 className={styles.title}>{hackathon.title}</h3>
        <p className={styles.summary}>{hackathon.summary}</p>

        <dl className={styles.facts}>
          <div className={styles.fact}>
            <dt className={`label ${styles.term}`}>My part</dt>
            <dd>{hackathon.role}</dd>
          </div>
          {hackathon.outcome !== undefined ? (
            <div className={styles.fact}>
              <dt className={`label ${styles.term}`}>Outcome</dt>
              <dd>{hackathon.outcome}</dd>
            </div>
          ) : null}
        </dl>

        <ul className={styles.tech}>
          {hackathon.technologies.map((name) => (
            <TechBadge key={name} name={name} />
          ))}
        </ul>

        <div className={styles.links}>
          {hackathon.links.map((link) => (
            <ButtonLink
              key={link.url}
              href={link.url}
              external
              icon="arrowUpRight"
              {...(single ? { stretched: true } : { srSuffix: `— ${hackathon.title}` })}
            >
              {link.label}
            </ButtonLink>
          ))}
        </div>
      </div>
    </li>
  )
}
