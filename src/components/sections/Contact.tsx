import { contact } from '../../content/contact'
import { links } from '../../content/links'
import { getSection, isSectionVisible } from '../../content/sections'
import { useReveal } from '../../hooks/useReveal'
import { Icon } from '../ui/Icon'
import { Section } from '../ui/Section'
import { SectionHeading } from '../ui/SectionHeading'
import styles from './Contact.module.css'

const section = getSection('contact')

/**
 * Insert de fermeture.
 *
 * Composition asymétrique inversée par rapport au hero — contenu à droite,
 * marge à gauche — pour refermer la boucle visuelle du site.
 *
 * Pas de formulaire : il imposerait un service tiers, donc une dépendance et un
 * risque de secret dans le frontend. Lien `mailto:` direct.
 */
export function Contact() {
  const ref = useReveal<HTMLDivElement>()

  if (section === undefined || !isSectionVisible(section.id)) {
    return null
  }

  return (
    <Section id={section.id} surface={section.surface} labelledBy="contact-titre">
      <div className={styles.inner}>
        <SectionHeading
          {...(section.number !== undefined ? { number: section.number } : {})}
          title={section.label}
          {...(section.kicker !== undefined ? { kicker: section.kicker } : {})}
          headingId="contact-titre"
        />

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
    </Section>
  )
}
