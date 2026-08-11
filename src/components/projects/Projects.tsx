import { hackathons, hackathonsIntro } from '../../content/hackathons'
import { projects } from '../../content/projects'
import type { PageProps } from '../../types/content'
import { Page } from '../ui/Page'
import { SectionHeading } from '../ui/SectionHeading'
import { HackathonCard } from './HackathonCard'
import { ProjectCard } from './ProjectCard'
import styles from './Projects.module.css'

/**
 * Projects page: the GitHub selection, then hackathon projects.
 *
 * No filters, unlike the reference layout: the `portfolio` topic already does
 * the sorting upstream, and a tight selection is taken in at a glance. The
 * presence test comes from `sections.ts`, which also decides the tab: a tab
 * can never point at an empty page.
 *
 * Hackathons used to have a tab of their own; they now live here, as a second
 * group, so the two never compete for the visitor's attention.
 */
export function Projects({ section }: PageProps) {
  return (
    <Page id={section.id} labelledBy="projects-title">
      <SectionHeading
        title={section.label}
        {...(section.kicker !== undefined ? { kicker: section.kicker } : {})}
        headingId="projects-title"
      />

      {projects.length > 0 ? (
        <section className={styles.movement} aria-labelledby="projects-selected">
          <h3 id="projects-selected" className={`label ${styles.movementTitle}`}>
            Selected Projects
          </h3>
          <ul className={styles.grid}>
            {projects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </ul>
        </section>
      ) : null}

      {hackathons.length > 0 ? (
        <section className={styles.movement} aria-labelledby="projects-hackathons">
          <h3 id="projects-hackathons" className={`label ${styles.movementTitle}`}>
            Hackathons
          </h3>
          <p className={styles.intro}>{hackathonsIntro}</p>
          <ul className={styles.grid}>
            {hackathons.map((hackathon) => (
              <HackathonCard key={hackathon.id} hackathon={hackathon} />
            ))}
          </ul>
        </section>
      ) : null}
    </Page>
  )
}
