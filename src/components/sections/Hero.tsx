import { links } from '../../content/links'
import { profile } from '../../content/profile'
import { useReveal } from '../../hooks/useReveal'
import { ButtonLink } from '../ui/ButtonLink'
import { Icon } from '../ui/Icon'
import { HeroPanel } from './HeroPanel'
import styles from './Hero.module.css'

export function Hero() {
  const mainRef = useReveal<HTMLDivElement>()
  const panelRef = useReveal<HTMLDivElement>()

  return (
    <section id="accueil" className={styles.hero} aria-labelledby="hero-titre">
      <div className={styles.glow} aria-hidden="true" />

      <div className={`shell ${styles.inner}`}>
        <div className={styles.credits}>
          <p className="label">01 · Portfolio</p>
          <span className={styles.creditsRule} aria-hidden="true" />
          <p className="label">
            {profile.location} · {profile.year}
          </p>
        </div>

        <div className={styles.grid}>
          <div ref={mainRef} className={`${styles.main} reveal`}>
            <h1 id="hero-titre" className={styles.name}>
              <span className="sr-only">{profile.fullName}</span>
              <span aria-hidden="true">
                {profile.nameLines.map((line) => (
                  <span key={line} className={styles.nameLine}>
                    {line}
                  </span>
                ))}
              </span>
            </h1>

            <div className={styles.doubleRule} aria-hidden="true" />

            <p className={styles.role}>
              {profile.role}
              <span className={styles.roleSep} aria-hidden="true" />
              {profile.education}
            </p>

            <p className={styles.intro}>{profile.intro}</p>

            <div className={styles.actions}>
              <ButtonLink href="#projets" variant="solid" icon="arrowDown">
                Voir les projets
              </ButtonLink>

              {links.cv !== null ? (
                <ButtonLink href={links.cv} external icon="arrowUpRight">
                  Curriculum vitae
                </ButtonLink>
              ) : null}
            </div>

            <ul className={styles.socials}>
              <li>
                <a
                  className={styles.social}
                  href={links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon name="github" size={17} />
                  GitHub
                  <span className="sr-only"> (nouvel onglet)</span>
                </a>
              </li>

              {links.linkedin !== null ? (
                <li>
                  <a
                    className={styles.social}
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
            </ul>
          </div>

          <div ref={panelRef} className={`${styles.aside} reveal`}>
            <HeroPanel />
            <p className={styles.company}>
              <span className={`label ${styles.companyLabel}`}>Actuellement</span>
              {profile.company}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
