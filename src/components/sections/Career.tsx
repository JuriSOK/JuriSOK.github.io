import { education } from '../../content/education'
import { experiences } from '../../content/experiences'
import { getSection, isSectionVisible } from '../../content/sections'
import { Page } from '../ui/Page'
import { SectionHeading } from '../ui/SectionHeading'
import { CareerEntry } from './CareerEntry'
import { SkillsBlock } from './Skills'
import styles from './Career.module.css'

const section = getSection('parcours')

/**
 * Page « Parcours » : expériences, formation, puis compétences.
 *
 * Pas de timeline : chaque entrée est une fiche de crédits, et les entrées sont
 * décalées alternativement pour casser l'alignement rigide. Le bloc compétences
 * clôt la page, à la place des barres de progression du format d'origine.
 */
export function Career() {
  if (section === undefined || !isSectionVisible(section.id)) {
    return null
  }

  return (
    <Page id={section.id} labelledBy="parcours-titre">
      <SectionHeading
        {...(section.number !== undefined ? { number: section.number } : {})}
        title={section.label}
        {...(section.kicker !== undefined ? { kicker: section.kicker } : {})}
        headingId="parcours-titre"
      />

      {experiences.length > 0 ? (
        <section className={styles.movement} aria-labelledby="parcours-experiences">
          <h3 id="parcours-experiences" className={`label ${styles.movementTitle}`}>
            Expériences
          </h3>
          <ul className={styles.entries}>
            {experiences.map((experience) => (
              <CareerEntry key={experience.id} entry={experience} />
            ))}
          </ul>
        </section>
      ) : null}

      {education.length > 0 ? (
        <section className={styles.movement} aria-labelledby="parcours-formation">
          <h3 id="parcours-formation" className={`label ${styles.movementTitle}`}>
            Formation
          </h3>
          <ul className={styles.entries}>
            {education.map((entry) => (
              <CareerEntry key={entry.id} entry={entry} />
            ))}
          </ul>
        </section>
      ) : null}

      <SkillsBlock />
    </Page>
  )
}
