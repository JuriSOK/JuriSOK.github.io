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
 * A hackathon project, styled as a café event flyer rather than a plain
 * project card — the artwork sits in a framed strip, and a perforated
 * (dashed) rule separates it from the text, like the stub line of an arcade
 * ticket. Distinct enough from `ProjectCard` to read as its own group at a
 * glance, close enough to stay the same website.
 */
export function HackathonCard({ hackathon }: HackathonCardProps) {
  const ref = useReveal<HTMLLIElement>()

  return (
    <li ref={ref} className={`${styles.ticket} reveal`}>
      <div className={styles.art} aria-hidden="true">
        <HackathonScene name={hackathon.pixelArt} className={styles.scene} />
      </div>

      <div className={styles.body}>
        <p className={`label ${styles.badge}`}>Hackathon</p>
        <h4 className={styles.title}>{hackathon.title}</h4>
        <p className={styles.event}>{hackathon.event}</p>
        <p className={styles.summary}>{hackathon.summary}</p>

        <ul className={styles.tech}>
          {hackathon.technologies.map((name) => (
            <TechBadge key={name} name={name} />
          ))}
        </ul>

        <ButtonLink
          href={hackathon.link.url}
          external
          icon="arrowUpRight"
          className={styles.link}
          stretched
        >
          {hackathon.link.label}
        </ButtonLink>
      </div>
    </li>
  )
}
