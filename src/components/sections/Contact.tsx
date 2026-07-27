import { contact } from '../../content/contact'
import { links } from '../../content/links'
import { getSection, isSectionVisible } from '../../content/sections'
import { useReveal } from '../../hooks/useReveal'
import { Icon } from '../ui/Icon'
import { Page } from '../ui/Page'
import { SectionHeading } from '../ui/SectionHeading'
import styles from './Contact.module.css'

const section = getSection('contact')

/**
 * Page « Contact ».
 *
 * L'insert papier crème — la respiration claire du thème — devient ici une
 * carte à l'intérieur du panneau. Pas de formulaire ni de carte géographique,
 * contrairement au format d'origine : un formulaire imposerait un service
 * tiers, donc une dépendance et un risque de secret. Lien `mailto:` direct.
 */
export function Contact() {
  const ref = useReveal<HTMLDivElement>()

  if (section === undefined || !isSectionVisible(section.id)) {
    return null
  }

  return (
    <Page id={section.id} labelledBy="contact-titre">
      <SectionHeading
        {...(section.number !== undefined ? { number: section.number } : {})}
        title={section.label}
        {...(section.kicker !== undefined ? { kicker: section.kicker } : {})}
        headingId="contact-titre"
      />

      <div className={styles.paper} data-surface="paper">
        <div ref={ref} className={`${styles.body} reveal`}>
          {contact.invitation !== undefined ? (
            <p className={styles.invitation}>{contact.invitation}</p>
          ) : null}

          {links.email !== null ? (
            <a className={styles.email} href={`mailto:${links.email}`}>
              {links.email}
            </a>
          ) : null}

          <ul className={styles.channels}>
            {links.linkedin !== null ? (
              <li>
                <a
                  className={styles.channel}
                  href={links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon name="linkedin" size={17} />
                  LinkedIn
                  <span className="sr-only"> (nouvel onglet)</span>
                </a>
              </li>
            ) : null}

            <li>
              <a
                className={styles.channel}
                href={links.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon name="github" size={17} />
                GitHub
                <span className="sr-only"> (nouvel onglet)</span>
              </a>
            </li>

            {links.cv !== null ? (
              <li>
                <a
                  className={styles.channel}
                  href={links.cv}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon name="arrowUpRight" size={17} />
                  Curriculum vitae
                  <span className="sr-only"> (nouvel onglet)</span>
                </a>
              </li>
            ) : null}
          </ul>
        </div>
      </div>
    </Page>
  )
}
