import { about, facts } from '../../content/about'
import { profile } from '../../content/profile'
import { getSection, isSectionVisible } from '../../content/sections'
import { useReveal } from '../../hooks/useReveal'
import { Section } from '../ui/Section'
import { SectionHeading } from '../ui/SectionHeading'
import { FactList } from './FactList'
import styles from './About.module.css'

const section = getSection('a-propos')

/**
 * Section de présentation, en insert papier.
 *
 * Elle est conçue pour rester juste sans prose : tant que les paragraphes ne
 * sont pas écrits, la fiche de faits s'étale sur deux colonnes et porte seule la
 * composition, au lieu de rester une colonne étroite à côté d'un vide.
 */
export function About() {
  const proseRef = useReveal<HTMLDivElement>()
  const factsRef = useReveal<HTMLDivElement>()

  if (section === undefined || !isSectionVisible(section.id)) {
    return null
  }

  const hasProse = about.paragraphs.length > 0

  return (
    <Section id={section.id} surface={section.surface} labelledBy="a-propos-titre">
      <SectionHeading
        {...(section.number !== undefined ? { number: section.number } : {})}
        title={section.label}
        {...(section.kicker !== undefined ? { kicker: section.kicker } : {})}
        headingId="a-propos-titre"
      />

      <div className={styles.layout} data-prose={hasProse}>
        {hasProse ? (
          <div ref={proseRef} className={`${styles.prose} reveal`}>
            {about.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 40)}>{paragraph}</p>
            ))}
          </div>
        ) : null}

        {about.portrait !== null ? (
          <div className={styles.portrait}>
            <img
              className={styles.portraitImage}
              src={about.portrait}
              alt={`Portrait de ${profile.fullName}`}
              width={800}
              height={1000}
              loading="lazy"
              decoding="async"
            />
            <span className={styles.portraitTint} aria-hidden="true" />
          </div>
        ) : null}

        <div ref={factsRef} className={`${styles.facts} reveal`}>
          <FactList facts={facts} layout={hasProse ? 'column' : 'spread'} />
        </div>
      </div>
    </Section>
  )
}
