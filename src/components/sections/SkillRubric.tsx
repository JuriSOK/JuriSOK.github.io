import type { SkillDomain } from '../../types/content'
import { useReveal } from '../../hooks/useReveal'
import { TechBadge } from '../ui/TechBadge'
import styles from './SkillRubric.module.css'

interface SkillRubricProps {
  readonly domain: SkillDomain
  readonly number: string
}

/**
 * Une rubrique de la carte des compétences.
 *
 * Ni pourcentage, ni jauge, ni niveau : le domaine, ce qu'on en fait, avec quoi,
 * et dans quels cadres. Les outils reprennent la pastille logo + nom des cartes
 * projets, donc le même vocabulaire visuel.
 */
export function SkillRubric({ domain, number }: SkillRubricProps) {
  const ref = useReveal<HTMLLIElement>()

  return (
    <li ref={ref} className={`${styles.rubric} reveal`}>
      <p className={`label ${styles.number}`} aria-hidden="true">
        {number}
      </p>

      <h3 className={styles.title}>{domain.title}</h3>

      {domain.usage !== undefined ? <p className={styles.usage}>{domain.usage}</p> : null}

      {(domain.tools?.length ?? 0) > 0 ? (
        <div className={styles.block}>
          <p className={`label ${styles.blockTitle}`}>Outils</p>
          <ul className={styles.tools}>
            {(domain.tools ?? []).map((tool) => (
              <TechBadge key={tool} name={tool} />
            ))}
          </ul>
        </div>
      ) : null}

      {(domain.contexts?.length ?? 0) > 0 ? (
        <div className={styles.block}>
          <p className={`label ${styles.blockTitle}`}>Contextes</p>
          <p className={styles.contexts}>{(domain.contexts ?? []).join(' · ')}</p>
        </div>
      ) : null}
    </li>
  )
}
