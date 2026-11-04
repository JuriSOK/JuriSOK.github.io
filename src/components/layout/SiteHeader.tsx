import { useEffect, useRef, useState } from 'react'
import { closingCue, openingCue } from '../../content/navigation'
import { profile } from '../../content/profile'
import { useMediaQuery } from '../../hooks/useMediaQuery'
import type { SectionDefinition } from '../../types/content'
import { Icon } from '../ui/Icon'
import styles from './SiteHeader.module.css'

interface SiteHeaderProps {
  readonly sections: readonly SectionDefinition[]
  /** Section in view; `null` on the opening screen, `'closing'` on the footer. */
  readonly active: string | null
}

/** Breakpoint above which the links are always shown. */
const WIDE = '(width >= 960px)'

/**
 * Sticky header: name, set clock, navigation.
 *
 * The set clock is the page's thread — the equivalent of a depth gauge. It
 * shows the cue of the section in view, from « doors open » to « closing
 * time ». It is plain text, never a live region: announcing every section
 * change to a screen reader would be noise, and `aria-current` on the link
 * already carries the position.
 *
 * On narrow screens the links fold behind a « Menu » button. The list is
 * removed from the tab order while closed, closes on Escape — focus returning
 * to the button — and after a link is followed.
 */
export function SiteHeader({ sections, active }: SiteHeaderProps) {
  const [open, setOpen] = useState(false)
  const wide = useMediaQuery(WIDE)
  const buttonRef = useRef<HTMLButtonElement | null>(null)

  const cue =
    active === null
      ? openingCue
      : active === 'closing'
        ? closingCue
        : (sections.find((section) => section.id === active)?.cue ?? openingCue)

  /* Escape closes the menu and gives focus back to its button. */
  useEffect(() => {
    if (!open) {
      return
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
        buttonRef.current?.focus()
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open])

  /* An open mobile menu has no meaning once the links are shown inline. */
  const expanded = open && !wide

  return (
    <header className={styles.header} data-open={expanded}>
      <div className={`shell ${styles.bar}`}>
        <a className={styles.name} href="#top">
          {profile.fullName}
        </a>

        <p className={`label ${styles.clock}`} aria-hidden="true">
          {cue}
        </p>

        <button
          ref={buttonRef}
          type="button"
          className={styles.toggle}
          aria-expanded={expanded}
          aria-controls="site-nav"
          onClick={() => setOpen((value) => !value)}
        >
          <span>{expanded ? 'Close' : 'Menu'}</span>
          <Icon name={expanded ? 'close' : 'menu'} size={18} />
        </button>

        <nav id="site-nav" className={styles.nav} aria-label="Sections">
          <ul className={styles.list}>
            {sections.map((section) => (
              <li key={section.id}>
                <a
                  className={styles.link}
                  href={`#${section.id}`}
                  {...(active === section.id ? { 'aria-current': 'location' as const } : {})}
                  onClick={() => setOpen(false)}
                >
                  {section.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}
