import { about } from '../../content/about'
import { profile } from '../../content/profile'
import { useReveal } from '../../hooks/useReveal'
import type { PageProps } from '../../types/content'
import { Page } from '../ui/Page'
import { SectionHeading } from '../ui/SectionHeading'
import { Interests } from './Interests'
import styles from './About.module.css'

/**
 * About page: personal introduction, then interests.
 *
 * No facts list: role, employer, education and location all live in the
 * identity sidebar, and repeating them here filled the page with echoes.
 */
export function About({ section }: PageProps) {
  const proseRef = useReveal<HTMLDivElement>()

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

      <Interests />
    </Page>
  )
}
