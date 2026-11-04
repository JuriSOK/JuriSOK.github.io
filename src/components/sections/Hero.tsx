import { useState } from 'react'
import { hero } from '../../content/about'
import { links } from '../../content/links'
import { profile } from '../../content/profile'
import avatarUrl from '../../arnaud-avatar.png'
import { ButtonLink } from '../ui/ButtonLink'
import { Icon } from '../ui/Icon'
import styles from './Hero.module.css'

interface HeroProps {
  /** Id of the first section, target of the « take a seat » link. */
  readonly next: string | undefined
}

/**
 * Opening screen — « doors open ».
 *
 * The only place where the pixel-art café shows through: the screen itself is
 * transparent over the fixed background layer, and the text sits on an opaque
 * espresso plate, so it never depends on what the scene shows.
 */
export function Hero({ next }: HeroProps) {
  const [avatarFailed, setAvatarFailed] = useState(false)

  return (
    <div id="top" className={styles.hero}>
      <div className={`shell ${styles.frame}`}>
        <div className={styles.plate}>
          <div className={styles.identity}>
            {/* Imported rather than referenced by URL: a missing file breaks
                the build instead of silently 404-ing. The monogram only
                covers a genuine load failure. */}
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

            <div>
              <p className={styles.role}>{profile.role}</p>
              <p className={styles.place}>
                {profile.company} · {profile.location}
              </p>
            </div>
          </div>

          <h1 className={styles.name}>{profile.fullName}</h1>

          <p className={styles.lead}>{hero.lead}</p>

          <ul className={styles.actions}>
            <li>
              <ButtonLink href={`mailto:${links.email}`} variant="solid" icon="mail">
                Get in touch
              </ButtonLink>
            </li>
            <li>
              <ButtonLink href={links.linkedin} external icon="linkedin">
                LinkedIn
              </ButtonLink>
            </li>
            <li>
              <ButtonLink href={links.github} external icon="github">
                GitHub
              </ButtonLink>
            </li>
          </ul>
        </div>

        {next !== undefined ? (
          <a className={styles.seat} href={`#${next}`}>
            Take a seat
            <Icon name="arrowDown" size={16} className={styles.seatIcon} />
          </a>
        ) : null}
      </div>
    </div>
  )
}
