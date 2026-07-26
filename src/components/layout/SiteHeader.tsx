import { useEffect, useRef, useState } from 'react'
import { links } from '../../content/links'
import { navSections, visibleSections } from '../../content/sections'
import { profile } from '../../content/profile'
import { useActiveSection } from '../../hooks/useActiveSection'
import { Icon } from '../ui/Icon'
import { MobileMenu } from './MobileMenu'
import styles from './SiteHeader.module.css'

/* On suit toutes les sections rendues, y compris celles absentes de la barre :
   l'état actif doit rester juste quand on traverse une section non listée. */
const sectionIds = visibleSections.map((section) => section.id)

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const menuButtonRef = useRef<HTMLButtonElement | null>(null)
  const active = useActiveSection(sectionIds)

  /* La barre prend son fond une fois le hero franchi. */
  useEffect(() => {
    let frame = 0

    const update = () => {
      frame = 0
      setScrolled(window.scrollY > 24)
    }

    const onScroll = () => {
      if (frame === 0) {
        frame = window.requestAnimationFrame(update)
      }
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', onScroll)
      if (frame !== 0) {
        window.cancelAnimationFrame(frame)
      }
    }
  }, [])

  const closeMenu = () => {
    setMenuOpen(false)
    /* Le focus revient au bouton qui a ouvert le menu. */
    menuButtonRef.current?.focus()
  }

  return (
    <header className={styles.header} data-scrolled={scrolled}>
      <div className={`shell ${styles.bar}`}>
        {/* Nom accessible explicite : la concaténation des trois éléments
            donnerait « SVAÉdition 001 », sans séparation lisible. */}
        <a
          className={styles.brand}
          href="#accueil"
          aria-label={`${profile.fullName} — retour en haut de page`}
        >
          <span className={styles.monogram} aria-hidden="true">
            SVA
          </span>
          <span className={styles.divider} aria-hidden="true" />
          <span className={`label ${styles.edition}`} aria-hidden="true">
            {profile.edition}
          </span>
        </a>

        <nav className={styles.nav} aria-label="Sections du site">
          <ul className={styles.list}>
            {navSections.map((section) => (
              <li key={section.id}>
                <a
                  className={styles.link}
                  href={`#${section.id}`}
                  data-active={active === section.id}
                  {...(active === section.id ? { 'aria-current': 'true' as const } : {})}
                >
                  {section.number !== undefined ? (
                    <span className={`label ${styles.number}`} aria-hidden="true">
                      {section.number}
                    </span>
                  ) : null}
                  {section.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.actions}>
          {links.cv !== null ? (
            <a
              className={styles.cv}
              href={links.cv}
              target="_blank"
              rel="noopener noreferrer"
            >
              CV
              <span className="sr-only"> (nouvel onglet)</span>
            </a>
          ) : null}

          <button
            ref={menuButtonRef}
            type="button"
            className={styles.menuButton}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(true)}
          >
            <Icon name="menu" size={22} />
            <span className="sr-only">Ouvrir le menu</span>
          </button>
        </div>
      </div>

      <MobileMenu open={menuOpen} onClose={closeMenu} />
    </header>
  )
}
