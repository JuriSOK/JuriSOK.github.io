import { contact } from '../../content/contact'
import { links } from '../../content/links'
import { profile } from '../../content/profile'
import { useReveal } from '../../hooks/useReveal'
import type { PageProps } from '../../types/content'
import { ParisTime } from '../layout/ParisTime'
import { Icon } from '../ui/Icon'
import { Section } from '../ui/Section'
import styles from './Contact.module.css'

/**
 * Contact — « last call ».
 *
 * On the cream insert. A plain `mailto:` link — no form, no map, no third
 * party, no secret in the frontend. No CV, phone number or postal address.
 *
 * The real local time sits here, labelled as such, so it is never mistaken
 * for the set-list cues of the header.
 */
export function Contact({ section }: PageProps) {
  const ref = useReveal<HTMLDivElement>()

  return (
    <Section section={section} surface="paper">
      <div ref={ref} className={`${styles.body} reveal`}>
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
              <Icon name="linkedin" size={16} />
              LinkedIn
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </li>
          <li>
            <a
              className={styles.channel}
              href={links.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon name="github" size={16} />
              GitHub
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </li>
        </ul>

        <p className={styles.local}>
          {profile.location} · <ParisTime /> local time
        </p>
      </div>
    </Section>
  )
}
