import { hasDomainContent, skills } from '../../content/skills'
import { useReveal } from '../../hooks/useReveal'
import type { PageProps, SkillDomain } from '../../types/content'
import { PixelArtIcon } from '../pixel-art/PixelArtIcon'
import { Section } from '../ui/Section'
import { TechBadge } from '../ui/TechBadge'
import styles from './Skills.module.css'

/**
 * Skills — « the kit ».
 *
 * One row per domain: name, what it is used for, tools. No percentage, gauge,
 * level or years — the type does not allow them.
 */
export function Skills({ section }: PageProps) {
  /* A domain reduced to its title would teach nothing: it is not rendered. */
  const domains = skills.filter(hasDomainContent)

  return (
    <Section section={section}>
      <ul className={styles.list}>
        {domains.map((domain) => (
          <SkillRow key={domain.id} domain={domain} />
        ))}
      </ul>
    </Section>
  )
}

function SkillRow({ domain }: { readonly domain: SkillDomain }) {
  const ref = useReveal<HTMLLIElement>()
  const tools = domain.tools ?? []

  return (
    <li ref={ref} className={`${styles.row} reveal`}>
      <div className={styles.head}>
        {/* Decorative: the heading names the domain. */}
        <PixelArtIcon name={domain.icon} className={styles.icon} />
        <h3 className={styles.title}>{domain.title}</h3>
      </div>

      <div className={styles.body}>
        {domain.usage !== undefined ? <p className={styles.usage}>{domain.usage}</p> : null}
        {tools.length > 0 ? (
          <ul className={styles.tools}>
            {tools.map((tool) => (
              <TechBadge key={tool} name={tool} />
            ))}
          </ul>
        ) : null}
      </div>
    </li>
  )
}
