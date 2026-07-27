import { hasDomainContent, skills } from '../../content/skills'
import { getSection, isSectionVisible } from '../../content/sections'
import { Section } from '../ui/Section'
import { SectionHeading } from '../ui/SectionHeading'
import { SkillRubric } from './SkillRubric'
import styles from './Skills.module.css'

const section = getSection('competences')

/**
 * Compétences, en composition de carte de café.
 *
 * Deux colonnes de rubriques séparées par des filets continus, sans cartes
 * flottantes ni ombres : c'est ce qui évite la grille de cartes identiques.
 */
export function Skills() {
  if (section === undefined || !isSectionVisible(section.id)) {
    return null
  }

  /* Une rubrique réduite à son titre n'apprendrait rien : on ne la rend pas. */
  const rubrics = skills.filter(hasDomainContent)

  return (
    <Section id={section.id} surface={section.surface} labelledBy="competences-titre">
      <SectionHeading
        {...(section.number !== undefined ? { number: section.number } : {})}
        title={section.label}
        {...(section.kicker !== undefined ? { kicker: section.kicker } : {})}
        headingId="competences-titre"
      />

      <div className={styles.menu}>
        <ul className={styles.grid}>
          {rubrics.map((domain, index) => (
            <SkillRubric
              key={domain.id}
              domain={domain}
              number={String(index + 1).padStart(2, '0')}
            />
          ))}
        </ul>
      </div>
    </Section>
  )
}
