import { projects } from '../../content/projects'
import { getSection, isSectionVisible } from '../../content/sections'
import { Page } from '../ui/Page'
import { SectionHeading } from '../ui/SectionHeading'
import { ProjectCard } from './ProjectCard'
import styles from './Projects.module.css'

const section = getSection('projets')

/**
 * Page « Projets » : la grille de la sélection.
 *
 * Aucun filtre, contrairement au format d'origine : le topic `portfolio` fait
 * déjà le tri en amont, et une sélection resserrée se parcourt d'un seul coup
 * d'œil. Le test de présence vient de `sections.ts`, qui décide aussi des
 * onglets : impossible qu'un onglet pointe vers une page vide.
 */
export function Projects() {
  if (section === undefined || !isSectionVisible(section.id)) {
    return null
  }

  return (
    <Page id={section.id} labelledBy="projets-titre">
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
    </Page>
  )
}
