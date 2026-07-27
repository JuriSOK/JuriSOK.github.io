import type { SectionDefinition } from '../../types/content'
import styles from './TabNav.module.css'

interface TabNavProps {
  readonly sections: readonly SectionDefinition[]
  readonly active: string
  readonly onSelect: (id: string) => void
}

/**
 * Main panel navigation.
 *
 * On wide screens it sits in the top-right corner of the panel; on narrow
 * screens it becomes a bar fixed to the bottom, under the thumb — the two
 * positions of the vCard format. These are real buttons: they switch the page,
 * they do not scroll.
 */
export function TabNav({ sections, active, onSelect }: TabNavProps) {
  return (
    <nav className={styles.nav} aria-label="Portfolio pages">
      <ul className={styles.list}>
        {sections.map((section) => (
          <li key={section.id} className={styles.item}>
            <button
              type="button"
              className={styles.tab}
              data-active={active === section.id}
              {...(active === section.id ? { 'aria-current': 'page' as const } : {})}
              onClick={() => onSelect(section.id)}
            >
              {section.label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}
