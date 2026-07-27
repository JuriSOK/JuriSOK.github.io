import { projects } from '../../content/projects'
import type { PageProps } from '../../types/content'
import { Page } from '../ui/Page'
import { SectionHeading } from '../ui/SectionHeading'
import { ProjectCard } from './ProjectCard'
import styles from './Projects.module.css'

/**
 * Projects page: the selection grid.
 *
 * No filters, unlike the reference layout: the `portfolio` topic already does
 * the sorting upstream, and a tight selection is taken in at a glance. The
 * presence test comes from `sections.ts`, which also decides the tabs: a tab
 * can never point at an empty page.
 */
export function Projects({ section }: PageProps) {
  return (
    <Page id={section.id} labelledBy="projects-title">
      <SectionHeading
        title={section.label}
        {...(section.kicker !== undefined ? { kicker: section.kicker } : {})}
        headingId="projects-title"
      />

      <ul className={styles.grid}>
        {projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </ul>
    </Page>
  )
}
