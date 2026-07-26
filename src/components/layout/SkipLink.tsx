import styles from './SkipLink.module.css'

/** Premier élément focusable de la page : permet de sauter la navigation. */
export function SkipLink() {
  return (
    <a className={styles.skip} href="#contenu">
      Aller au contenu
    </a>
  )
}
