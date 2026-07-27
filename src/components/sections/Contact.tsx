import { contact } from '../../content/contact'
import { links } from '../../content/links'
import { useReveal } from '../../hooks/useReveal'
import { Icon } from '../ui/Icon'
import type { PageProps } from '../../types/content'
import { Page } from '../ui/Page'
import { SectionHeading } from '../ui/SectionHeading'
import styles from './Contact.module.css'

/**
 * Contact page.
 *
 * The warm cream insert of the theme, here framed as a card inside the panel.
 * No form, no map and no third-party provider: a form would mean a third party
 * and a secret in the frontend. A plain `mailto:` link instead.
 *
 * No CV, phone number or postal address is ever rendered.
 */
export function Contact({ section }: PageProps) {
  const ref = useReveal<HTMLDivElement>()

  return (
    <Page id={section.id} labelledBy="contact-title">
      <SectionHeading
        title={section.label}
        {...(section.kicker !== undefined ? { kicker: section.kicker } : {})}
        headingId="contact-title"
      />

      <div className={styles.paper} data-surface="paper">
        <div ref={ref} className={`${styles.body} reveal`}>
          {contact.heading !== undefined ? (
            <p className={styles.invitationHeading}>{contact.heading}</p>
          ) : null}

          {contact.invitation !== undefined ? (
            <p className={styles.invitation}>{contact.invitation}</p>
          ) : null}

          <a className={styles.email} href={`mailto:${links.email}`}>
            {links.email}
          </a>

          <ul className={styles.channels}>
            <li>
              <a
                className={styles.channel}
                href={links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon name="linkedin" size={17} />
                LinkedIn
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </li>

            <li>
              <a
                className={`${styles.channel} ${styles.minor}`}
                href={links.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon name="github" size={15} />
                GitHub
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </Page>
  )
}
