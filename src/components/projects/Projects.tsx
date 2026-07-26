import { projects } from '../../content/projects'
import { Section } from '../ui/Section'
import { SectionHeading } from '../ui/SectionHeading'
import { ProjectCard } from './ProjectCard'
import styles from './Projects.module.css'

/**
 * Grille de la sélection.
 *
 * Aucun filtre : le topic `portfolio` fait déjà le tri en amont, et une
 * sélection resserrée se parcourt d'un seul coup d'œil.
 */
export function Projects() {
  /* Plutôt qu'un cadre vide : si rien n'est publié, la section n'existe pas. */
  if (projects.length === 0) {
    return null
  }

  return (
    <Section id="projets" labelledBy="projets-titre">
      <SectionHeading
        number="04"
        title="Projets"
        kicker="Une sélection tirée de mes dépôts."
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
