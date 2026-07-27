import { about, facts } from '../../content/about'
import { profile } from '../../content/profile'
import { getSection, isSectionVisible } from '../../content/sections'
import { useReveal } from '../../hooks/useReveal'
import { Page } from '../ui/Page'
import { SectionHeading } from '../ui/SectionHeading'
import { FactList } from './FactList'
import { FaceB } from './Interests'
import styles from './About.module.css'

const section = getSection('a-propos')

/**
 * Page « À propos » : présentation, fiche de faits, Face B.
 *
 * La phrase d'introduction du profil ouvre la page ; les paragraphes rédigés
 * la prolongeront. La fiche de faits, dérivée de `profile.ts`, porte la page
 * tant que la prose n'est pas écrite.
 */
export function About() {
  const proseRef = useReveal<HTMLDivElement>()
  const factsRef = useReveal<HTMLDivElement>()

  if (section === undefined || !isSectionVisible(section.id)) {
    return null
  }

  return (
    <Page id={section.id} labelledBy="a-propos-titre">
      <SectionHeading
        {...(section.number !== undefined ? { number: section.number } : {})}
        title={section.label}
        {...(section.kicker !== undefined ? { kicker: section.kicker } : {})}
        headingId="a-propos-titre"
      />

      <div ref={proseRef} className={`${styles.prose} reveal`}>
        <p className={styles.leadParagraph}>{profile.intro}</p>

        {about.paragraphs.map((paragraph) => (
          <p key={paragraph.slice(0, 40)}>{paragraph}</p>
        ))}
      </div>

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
        <FactList facts={facts} layout="spread" />
      </div>

      <FaceB />
    </Page>
  )
}
