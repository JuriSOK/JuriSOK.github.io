import { links } from '../../content/links'
import { profile } from '../../content/profile'
import { Icon } from '../ui/Icon'
import styles from './SiteFooter.module.css'

/** Colophon : mentions d'édition, provenance technique, retour en haut. */
export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={`shell ${styles.inner}`}>
        <p className={`label ${styles.mention}`}>
          {profile.fullName} · {profile.edition} · {profile.year}
        </p>

        <p className={styles.tech}>Conçu et développé avec React, TypeScript et Vite.</p>

        <div className={styles.right}>
          {links.email !== null ? (
            <a className={styles.social} href={`mailto:${links.email}`}>
              <Icon name="arrowUpRight" size={16} />
              E-mail
            </a>
          ) : null}

          <a className={styles.social} href={links.github} target="_blank" rel="noopener noreferrer">
            <Icon name="github" size={16} />
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
              <Icon name="linkedin" size={16} />
              LinkedIn
              <span className="sr-only"> (nouvel onglet)</span>
            </a>
          ) : null}

          <a className={styles.social} href="#accueil">
            Haut de page
          </a>
        </div>
      </div>
    </footer>
  )
}
