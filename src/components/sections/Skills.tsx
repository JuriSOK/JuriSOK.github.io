import { hasDomainContent, skills } from '../../content/skills'
import { SkillRubric } from './SkillRubric'
import styles from './Skills.module.css'

/**
 * Compétences, en composition de carte de café.
 *
 * Bloc embarqué dans la page « Parcours », à la place du bloc de barres de
 * progression du format d'origine — jauges et pourcentages restent interdits.
 * Deux colonnes de rubriques séparées par des filets continus, sans cartes.
 */
export function SkillsBlock() {
  /* Une rubrique réduite à son titre n'apprendrait rien : on ne la rend pas. */
  const rubrics = skills.filter(hasDomainContent)

  if (rubrics.length === 0) {
    return null
  }

  return (
    <section className={styles.movement} aria-labelledby="parcours-competences">
      <h3 id="parcours-competences" className={`label ${styles.movementTitle}`}>
        Compétences
      </h3>

      <div className={styles.menu}>
        <ul className={styles.grid}>
          {rubrics.map((domain, index) => (
            <SkillRubric
              key={domain.id}
              domain={domain}
              number={String(index + 1).padStart(2, '0')}
            />
          ))}
        </ul>
      </div>
    </section>
  )
}
