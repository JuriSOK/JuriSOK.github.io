import type { CSSProperties } from 'react'
import type { ProjectCardData } from '../../content/types'
import { useReveal } from '../../hooks/useReveal'
import { ButtonLink } from '../ui/ButtonLink'
import { ProjectSleeve } from './ProjectSleeve'
import { TechBadge } from './TechBadge'
import styles from './ProjectCard.module.css'

/** Au-delà, la cascade de révélation deviendrait une attente. */
const MAX_STAGGER = 6

interface ProjectCardProps {
  readonly project: ProjectCardData
  readonly index: number
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const ref = useReveal<HTMLLIElement>()
  const single = project.links.length === 1
  const catalogNumber = `N° ${String(index + 1).padStart(3, '0')}`

  return (
    <li
      ref={ref}
      className={`${styles.card} reveal`}
      data-project-card=""
      style={{ '--reveal-delay': `${Math.min(index, MAX_STAGGER) * 60}ms` } as CSSProperties}
    >
      <ProjectSleeve
        id={project.id}
        title={project.title}
        image={project.image}
        catalogNumber={catalogNumber}
        eager={index < 2}
      />

      <div className={styles.body}>
        <h3 className={styles.title}>{project.title}</h3>

        {project.summary !== null ? <p className={styles.summary}>{project.summary}</p> : null}

        {project.tech.length > 0 ? (
          <ul className={styles.tech}>
            {project.tech.map((name) => (
              <TechBadge key={name} name={name} />
            ))}
          </ul>
        ) : null}

        <div className={styles.links} data-count={project.links.length}>
          {project.links.map((link) => (
            <ButtonLink
              key={link.url}
              href={link.url}
              external
              icon="arrowUpRight"
              className={styles.link}
              /* Un lien unique s'étend à toute la carte : une seule tabulation,
                 et la carte entière reste cliquable. Avec deux liens, c'est
                 impossible sans imbriquer des éléments interactifs. */
              {...(single ? { stretched: true } : { srSuffix: `— ${project.title}` })}
            >
              {link.label}
            </ButtonLink>
          ))}
        </div>
      </div>
    </li>
  )
}
