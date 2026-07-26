import { projects } from '../../content/projects'
import { getSection, isSectionVisible } from '../../content/sections'
import { Section } from '../ui/Section'
import { SectionHeading } from '../ui/SectionHeading'
import { ProjectCard } from './ProjectCard'
import styles from './Projects.module.css'

const section = getSection('projets')

/**
 * Grille de la sélection.
 *
 * Aucun filtre : le topic `portfolio` fait déjà le tri en amont, et une
 * sélection resserrée se parcourt d'un seul coup d'œil.
 */
export function Projects() {
  /* Plutôt qu'un cadre vide : si rien n'est publié, la section n'existe pas.
     Le test vient de `sections.ts`, qui décide aussi de la navigation : impossible
     que la barre affiche un lien vers une section absente de la page. */
  if (section === undefined || !isSectionVisible(section.id)) {
    return null
  }

  return (
    <Section id={section.id} surface={section.surface} labelledBy="projets-titre">
      <SectionHeading
        {...(section.number !== undefined ? { number: section.number } : {})}
        title={section.label}
        {...(section.kicker !== undefined ? { kicker: section.kicker } : {})}
        headingId="projets-titre"
      />

      <ul className={styles.grid}>
        {projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </ul>
    </Section>
  )
}
