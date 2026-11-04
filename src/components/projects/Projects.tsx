import { projects } from '../../content/projects'
import type { PageProps } from '../../types/content'
import { Section } from '../ui/Section'
import { ProjectCard } from './ProjectCard'
import styles from './Projects.module.css'

/**
 * Projects — « the set ».
 *
 * The GitHub selection (repositories carrying the `portfolio` topic). No
 * filters: the topic already does the sorting upstream, and a tight selection
 * is taken in at a glance.
 */
export function Projects({ section }: PageProps) {
  return (
    <Section section={section}>
      <ul className={styles.grid}>
        {projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </ul>
    </Section>
  )
}
