import type { SkillDomain } from '../../types/content'
import { useReveal } from '../../hooks/useReveal'
import { TechBadge } from '../ui/TechBadge'
import styles from './SkillRubric.module.css'

interface SkillRubricProps {
  readonly domain: SkillDomain
}

/**
 * One rubric of the skills menu.
 *
 * No percentage, no gauge, no level: the domain, what it is used for, with
 * which tools, and in which contexts. Tools reuse the logo + name badge of the
 * project cards, so the visual vocabulary stays the same.
 */
export function SkillRubric({ domain }: SkillRubricProps) {
  const ref = useReveal<HTMLLIElement>()

  return (
    <li ref={ref} className={`${styles.rubric} reveal`}>
      {/* h4: the rubric belongs to the « Skills » movement, which owns the h3. */}
      <h4 className={styles.title}>{domain.title}</h4>

      {domain.usage !== undefined ? <p className={styles.usage}>{domain.usage}</p> : null}

      {(domain.tools?.length ?? 0) > 0 ? (
        <div className={styles.block}>
          <p className={`label ${styles.blockTitle}`}>Tools</p>
          <ul className={styles.tools}>
            {(domain.tools ?? []).map((tool) => (
              <TechBadge key={tool} name={tool} />
            ))}
          </ul>
        </div>
      ) : null}

      {(domain.contexts?.length ?? 0) > 0 ? (
        <div className={styles.block}>
          <p className={`label ${styles.blockTitle}`}>Contexts</p>
          <p className={styles.contexts}>{(domain.contexts ?? []).join(' · ')}</p>
        </div>
      ) : null}
    </li>
  )
}
