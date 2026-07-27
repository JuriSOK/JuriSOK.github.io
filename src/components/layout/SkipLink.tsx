import styles from './SkipLink.module.css'

/** First focusable element on the page: lets keyboard users skip navigation. */
export function SkipLink() {
  return (
    <a className={styles.skip} href="#content">
      Skip to content
    </a>
  )
}
