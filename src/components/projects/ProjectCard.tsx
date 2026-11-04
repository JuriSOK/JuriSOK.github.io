import type { CSSProperties } from 'react'
import type { ProjectCardData } from '../../types/project'
import { useReveal } from '../../hooks/useReveal'
import { ButtonLink } from '../ui/ButtonLink'
import { ProjectSleeve } from './ProjectSleeve'
import { TechBadge } from '../ui/TechBadge'
import styles from './ProjectCard.module.css'

/** Beyond this, the reveal stagger turns into a wait. */
const MAX_STAGGER = 6

interface ProjectCardProps {
  readonly project: ProjectCardData
  readonly index: number
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const ref = useReveal<HTMLLIElement>()
  const single = project.links.length === 1

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
              /* A single link stretches across the whole card: one tab stop,
                 and the entire card stays clickable. With two links that is
                 impossible without nesting interactive elements. */
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
