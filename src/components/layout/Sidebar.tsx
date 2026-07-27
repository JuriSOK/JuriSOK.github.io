import { useState } from 'react'
import { links } from '../../content/links'
import { profile } from '../../content/profile'
import { Icon } from '../ui/Icon'
import { ParisTime } from './ParisTime'
import avatarUrl from '../../arnaud-avatar.png'
import styles from './Sidebar.module.css'

interface Channel {
  readonly label: string
  readonly value: string
  readonly href: string
  readonly external: boolean
}

const channels: readonly Channel[] = [
  { label: 'Email', value: links.email, href: `mailto:${links.email}`, external: false },
  { label: 'LinkedIn', value: 'Vibol Arnaud Sok', href: links.linkedin, external: true },
  { label: 'GitHub', value: 'JuriSOK', href: links.github, external: true },
]

/**
 * Identity card, to the left of the main panel.
 *
 * It carries the name, role and contact details — the vCard format has no hero.
 * Only the three public channels appear: no phone number, no postal address,
 * no CV.
 *
 * On narrow screens the card collapses: a button reveals the contact details.
 */
export function Sidebar() {
  const [open, setOpen] = useState(false)
  const [avatarFailed, setAvatarFailed] = useState(false)

  return (
    <aside className={styles.sidebar} data-open={open}>
      <div className={styles.identity}>
        {/* The image is imported rather than referenced by URL: Vite resolves
            and fingerprints it at build time, so a missing file breaks the
            build instead of silently 404-ing in production. The monogram then
            only covers a genuine load failure, never a bad path. */}
        <div className={styles.avatar}>
          {avatarFailed ? (
            <span className={styles.monogram} aria-hidden="true">
              VAS
            </span>
          ) : (
            <img
              className={styles.avatarImage}
              src={avatarUrl}
              alt={`Illustrated avatar of ${profile.fullName}, wearing glasses and looking over a laptop`}
              width={150}
              height={178}
              decoding="async"
              onError={() => setAvatarFailed(true)}
            />
          )}
        </div>

        <div className={styles.who}>
          <h1 className={styles.name}>{profile.fullName}</h1>
          <p className={styles.role}>{profile.role}</p>
        </div>

        <button
          type="button"
          className={styles.toggle}
          aria-expanded={open}
          aria-controls="sidebar-contacts"
          onClick={() => setOpen((value) => !value)}
        >
          <span>Contacts</span>
          <Icon name="arrowDown" size={16} className={styles.chevron} />
        </button>
      </div>

      <div id="sidebar-contacts" className={styles.details}>
        <div className={styles.rule} aria-hidden="true" />

        <dl className={styles.contacts}>
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
                  {channel.external ? <span className="sr-only"> (opens in a new tab)</span> : null}
                </a>
              </dd>
            </div>
          ))}

          <div className={styles.contact}>
            <dt className={`label ${styles.term}`}>Currently</dt>
            <dd className={styles.value}>{profile.company}</dd>
          </div>

          <div className={styles.contact}>
            <dt className={`label ${styles.term}`}>Contract</dt>
            <dd className={styles.value}>{profile.contract}</dd>
          </div>

          <div className={styles.contact}>
            <dt className={`label ${styles.term}`}>Education</dt>
            <dd className={styles.value}>{profile.education}</dd>
          </div>

          <div className={styles.contact}>
            <dt className={`label ${styles.term}`}>Location</dt>
            <dd className={`${styles.value} ${styles.locationValue}`}>
              <span>{profile.location}</span>
              <span aria-hidden="true">·</span>
              <ParisTime />
            </dd>
          </div>
        </dl>
      </div>
    </aside>
  )
}
