import type { CSSProperties } from 'react'
import { resolveTech } from '../../content/tech'
import styles from './TechBadge.module.css'

interface TechBadgeProps {
  readonly name: string
}

/**
 * Pastille « logo + nom ».
 *
 * Le nom est toujours affiché et le logo est `aria-hidden` : l'information ne
 * dépend jamais de l'icône, et les lecteurs d'écran ne lisent pas deux fois la
 * même chose. Sans logo fiable, la pastille est identique, avec le seul libellé.
 */
export function TechBadge({ name }: TechBadgeProps) {
  const tech = resolveTech(name)

  return (
    <li
      className={styles.badge}
      {...(tech.brand !== null ? { style: { '--brand': tech.brand } as CSSProperties } : {})}
    >
      {tech.path !== null ? (
        <svg
          className={styles.logo}
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
          focusable="false"
        >
          <path d={tech.path} />
        </svg>
      ) : null}
      {tech.label}
    </li>
  )
}
