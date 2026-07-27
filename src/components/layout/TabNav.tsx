import type { SectionDefinition } from '../../types/content'
import styles from './TabNav.module.css'

interface TabNavProps {
  readonly sections: readonly SectionDefinition[]
  readonly active: string
  readonly onSelect: (id: string) => void
}

/**
 * Navigation du panneau principal.
 *
 * Sur grand écran, elle occupe le coin supérieur droit du panneau ; sur écran
 * étroit, elle devient une barre fixe en bas, sous le pouce — les deux
 * positions du format vCard. Ce sont de vrais boutons : ils changent la page
 * affichée, ils ne défilent pas.
 */
export function TabNav({ sections, active, onSelect }: TabNavProps) {
  return (
    <nav className={styles.nav} aria-label="Pages du portfolio">
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
              {section.number !== undefined ? (
                <span className={`label ${styles.number}`} aria-hidden="true">
                  {section.number}
                </span>
              ) : null}
              {section.label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}
