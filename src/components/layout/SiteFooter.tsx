import { closingCue } from '../../content/navigation'
import { profile } from '../../content/profile'
import { Icon } from '../ui/Icon'
import styles from './SiteFooter.module.css'

/** Footer — « closing time ». */
export function SiteFooter() {
  return (
    <footer id="closing" className={styles.footer}>
      <div className={`shell ${styles.inner}`}>
        <div>
          <p className={`label ${styles.cue}`}>{closingCue}</p>
          <p className={styles.thanks}>Thanks for staying until closing time.</p>
        </div>

        <a className={styles.back} href="#top">
          Back to the door
          <Icon name="arrowUp" size={16} />
        </a>

        <p className={styles.colophon}>
          {profile.fullName} · {new Date().getFullYear()} · Set in Fraunces and Archivo, built with
          React, TypeScript and Vite.
        </p>
      </div>
    </footer>
  )
}
