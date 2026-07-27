import { useState } from 'react'
import { links } from '../../content/links'
import { profile } from '../../content/profile'
import { Icon } from '../ui/Icon'
import styles from './Sidebar.module.css'

interface Channel {
  readonly label: string
  readonly value: string
  readonly href: string
  readonly external: boolean
}

/**
 * Carte d'identité, à gauche du panneau principal.
 *
 * C'est elle qui porte le nom, le rôle et les coordonnées — le format vCard
 * n'a pas de hero. Seules les coordonnées réellement fournies apparaissent :
 * `links.ts` garde `null` pour ce qui manque encore.
 *
 * Sur écran étroit, la carte se replie : un bouton révèle les coordonnées,
 * comme sur le modèle d'origine.
 */
export function Sidebar() {
  const [open, setOpen] = useState(false)

  const channels: Channel[] = []

  if (links.email !== null) {
    channels.push({ label: 'E-mail', value: links.email, href: `mailto:${links.email}`, external: false })
  }
  if (links.linkedin !== null) {
    channels.push({ label: 'LinkedIn', value: 'Profil LinkedIn', href: links.linkedin, external: true })
  }
  channels.push({ label: 'GitHub', value: 'JuriSOK', href: links.github, external: true })
  if (links.cv !== null) {
    channels.push({ label: 'Curriculum vitae', value: 'Télécharger le CV', href: links.cv, external: true })
  }

  return (
    <aside className={styles.sidebar} data-open={open}>
      <div className={styles.identity}>
        <div className={styles.avatar} aria-hidden="true">
          <span className={styles.monogram}>SVA</span>
        </div>

        <div className={styles.who}>
          <h1 className={styles.name}>{profile.fullName}</h1>
          <p className={styles.role}>{profile.role}</p>
        </div>

        <button
          type="button"
          className={styles.toggle}
          aria-expanded={open}
          aria-controls="sidebar-coordonnees"
          onClick={() => setOpen((value) => !value)}
        >
          <span className={styles.toggleLabel}>Contacts</span>
          <Icon name="arrowDown" size={16} className={styles.chevron} />
        </button>
      </div>

      <div id="sidebar-coordonnees" className={styles.details}>
        <div className={styles.rule} aria-hidden="true" />

        <dl className={styles.contacts}>
          <div className={styles.contact}>
            <dt className={`label ${styles.term}`}>Actuellement</dt>
            <dd className={styles.value}>{profile.company}</dd>
          </div>

          <div className={styles.contact}>
            <dt className={`label ${styles.term}`}>Formation</dt>
            <dd className={styles.value}>{profile.education}</dd>
          </div>

          {channels.map((channel) => (
            <div key={channel.label} className={styles.contact}>
              <dt className={`label ${styles.term}`}>{channel.label}</dt>
              <dd className={styles.value}>
                <a
                  className={styles.link}
                  href={channel.href}
                  {...(channel.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                >
                  {channel.value}
                  {channel.external ? <span className="sr-only"> (nouvel onglet)</span> : null}
                </a>
              </dd>
            </div>
          ))}

          <div className={styles.contact}>
            <dt className={`label ${styles.term}`}>Localisation</dt>
            <dd className={styles.value}>{profile.location}</dd>
          </div>
        </dl>

        <p className={`label ${styles.edition}`}>
          {profile.edition} · {profile.year}
        </p>
      </div>
    </aside>
  )
}
