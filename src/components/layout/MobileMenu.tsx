import { useEffect, useRef } from 'react'
import { links } from '../../content/links'
import { navigation } from '../../content/navigation'
import { profile } from '../../content/profile'
import { useScrollLock } from '../../hooks/useScrollLock'
import { Icon } from '../ui/Icon'
import styles from './MobileMenu.module.css'

interface MobileMenuProps {
  readonly open: boolean
  readonly onClose: () => void
}

/**
 * Programme plein écran.
 *
 * Bâti sur `<dialog>` ouvert en modal : le piège de focus, la fermeture par
 * `Échap` et l'inertisation de l'arrière-plan sont assurés par le navigateur,
 * ce qui vaut mieux qu'une réimplémentation approximative au clavier.
 */
export function MobileMenu({ open, onClose }: MobileMenuProps) {
  const dialogRef = useRef<HTMLDialogElement | null>(null)

  useScrollLock(open)

  useEffect(() => {
    const dialog = dialogRef.current

    if (dialog === null) {
      return
    }

    if (open && !dialog.open) {
      dialog.showModal()
    } else if (!open && dialog.open) {
      dialog.close()
    }
  }, [open])

  return (
    <dialog
      ref={dialogRef}
      className={styles.dialog}
      aria-label="Menu principal"
      /* Couvre la fermeture par Échap, que le navigateur gère lui-même. */
      onClose={onClose}
    >
      <div className={styles.inner}>
        <div className={styles.top}>
          <p className={`label ${styles.edition}`}>{profile.edition}</p>
          <button type="button" className={styles.close} onClick={onClose}>
            <Icon name="close" size={22} />
            <span className="sr-only">Fermer le menu</span>
          </button>
        </div>

        <nav aria-label="Sections du site">
          <ul className={styles.list}>
            {navigation.map((item) => (
              <li key={item.id}>
                <a className={styles.link} href={`#${item.id}`} onClick={onClose}>
                  <span className={`label ${styles.number}`}>{item.number}</span>
                  <span className={styles.label}>{item.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.footer}>
          {links.cv !== null ? (
            <a className={styles.action} href={links.cv} target="_blank" rel="noopener noreferrer">
              Curriculum vitae
              <span className="sr-only"> (nouvel onglet)</span>
            </a>
          ) : null}

          <div className={styles.socials}>
            <a
              className={styles.social}
              href={links.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon name="github" size={18} />
              GitHub
              <span className="sr-only"> (nouvel onglet)</span>
            </a>

            {links.linkedin !== null ? (
              <a
                className={styles.social}
                href={links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon name="linkedin" size={18} />
                LinkedIn
                <span className="sr-only"> (nouvel onglet)</span>
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </dialog>
  )
}
