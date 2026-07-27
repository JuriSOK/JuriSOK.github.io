import { hasDomainContent, skills } from '../../content/skills'
import { SkillRubric } from './SkillRubric'
import styles from './Skills.module.css'

/**
 * Skills, laid out like a fine café menu.
 *
 * Embedded in the Resume page, where the reference layout put progress bars.
 * Two columns of rubrics parted by continuous rules, no floating cards — and
 * no gauge, percentage or level anywhere.
 */
export function SkillsBlock() {
  /* A rubric reduced to its title would teach nothing: it is not rendered. */
  const rubrics = skills.filter(hasDomainContent)

  if (rubrics.length === 0) {
    return null
  }

  return (
    <section className={styles.movement} aria-labelledby="resume-skills">
      <h3 id="resume-skills" className={`label ${styles.movementTitle}`}>
        Skills
      </h3>

      <div className={styles.menu}>
        <ul className={styles.grid}>
          {rubrics.map((domain) => (
            <SkillRubric key={domain.id} domain={domain} />
          ))}
        </ul>
      </div>
    </section>
  )
}
