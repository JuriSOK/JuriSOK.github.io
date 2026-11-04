import { hackathons, hackathonsIntro } from '../../content/hackathons'
import type { PageProps } from '../../types/content'
import { Section } from '../ui/Section'
import { HackathonCard } from './HackathonCard'
import styles from './Hackathons.module.css'

/**
 * Hackathons — « jam sessions ».
 *
 * Real participations only. A result is shown only when one is confirmed.
 */
export function Hackathons({ section }: PageProps) {
  return (
    <Section section={section} surface="deep">
      <p className={styles.intro}>{hackathonsIntro}</p>
      <ul className={styles.list}>
        {hackathons.map((hackathon) => (
          <HackathonCard key={hackathon.id} hackathon={hackathon} />
        ))}
      </ul>
    </Section>
  )
}
