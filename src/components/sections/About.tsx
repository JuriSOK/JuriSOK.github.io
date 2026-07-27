import { about, facts } from '../../content/about'
import { profile } from '../../content/profile'
import { useReveal } from '../../hooks/useReveal'
import type { PageProps } from '../../types/content'
import { Page } from '../ui/Page'
import { SectionHeading } from '../ui/SectionHeading'
import { FactList } from './FactList'
import { Interests } from './Interests'
import styles from './About.module.css'

/**
 * About page: introduction, a short facts list, then interests.
 *
 * The facts list deliberately holds only what the identity sidebar does not
 * already show — repeating role, employer and education here would fill the
 * page with echoes.
 */
export function About({ section }: PageProps) {
  const proseRef = useReveal<HTMLDivElement>()
  const factsRef = useReveal<HTMLDivElement>()

  return (
    <Page id={section.id} labelledBy="about-title">
      <SectionHeading
        title={section.label}
        {...(section.kicker !== undefined ? { kicker: section.kicker } : {})}
        headingId="about-title"
      />

      <div ref={proseRef} className={`${styles.prose} reveal`}>
        {about.paragraphs.map((paragraph) => (
          <p key={paragraph.slice(0, 40)}>{paragraph}</p>
        ))}

        {about.closing !== undefined ? (
          <p className={styles.closing}>{about.closing}</p>
        ) : null}
      </div>

      {about.portrait !== null ? (
        <div className={styles.portrait}>
          <img
            className={styles.portraitImage}
            src={about.portrait}
            alt={`Portrait of ${profile.fullName}`}
            width={800}
            height={1000}
            loading="lazy"
            decoding="async"
          />
          <span className={styles.portraitTint} aria-hidden="true" />
        </div>
      ) : null}

      {facts.length > 0 ? (
        <div ref={factsRef} className={`${styles.facts} reveal`}>
          <FactList facts={facts} layout="spread" />
        </div>
      ) : null}

      <Interests />
    </Page>
  )
}
