import { useState } from 'react'
import { interests } from '../../content/interests'
import { Icon } from '../ui/Icon'
import { PixelArtIcon } from '../pixel-art/PixelArtIcon'
import { LetterboxdMark } from '../ui/LetterboxdMark'
import styles from './Interests.module.css'

/**
 * Interests as an accessible accordion, embedded at the end of the About page.
 *
 * Each closed row shows only a pixel-art icon, the interest name and an expand
 * chevron; activating the row reveals a detail paragraph. Several rows may
 * stay open at once.
 *
 * The trigger is a real `<button>` inside the heading — Enter and Space work
 * natively, `aria-expanded` and `aria-controls` carry the state, and nothing
 * interactive is nested inside it. The expansion animates grid rows only, and
 * the global reduced-motion rule collapses that transition to nothing.
 */
export function Interests() {
  const [openIds, setOpenIds] = useState<ReadonlySet<string>>(new Set())

  if (interests.length === 0) {
    return null
  }

  const toggle = (id: string) => {
    setOpenIds((current) => {
      const next = new Set(current)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  return (
    <section className={styles.interests} aria-labelledby="interests-title">
      <h3 id="interests-title" className={`label ${styles.title}`}>
        Interests
      </h3>

      <ul className={styles.list}>
        {interests.map((interest) => {
          const open = openIds.has(interest.id)
          const buttonId = `interest-${interest.id}`
          const panelId = `interest-${interest.id}-panel`

          return (
            <li key={interest.id} className={styles.item}>
              <h4 className={styles.rowHeading}>
                <button
                  type="button"
                  id={buttonId}
                  className={styles.row}
                  aria-expanded={open}
                  aria-controls={panelId}
                  onClick={() => toggle(interest.id)}
                >
                  <PixelArtIcon name={interest.icon} className={styles.icon} />
                  <span className={styles.name}>{interest.label}</span>
                  <Icon name="arrowDown" size={16} className={styles.chevron} />
                </button>
              </h4>

              <div
                id={panelId}
                role="region"
                aria-labelledby={buttonId}
                className={styles.panel}
                data-open={open}
              >
                <div className={styles.panelInner}>
                  <p className={styles.detail}>{interest.detail}</p>

                  {/* Lives in the panel, never in the button: no interactive
                      element is nested inside another, and `visibility: hidden`
                      on the collapsed panel keeps this out of the tab order
                      until the row is expanded. */}
                  {interest.link !== undefined ? (
                    <a
                      className={styles.link}
                      href={interest.link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <LetterboxdMark className={styles.mark} />
                      {interest.link.label}
                      <span className="sr-only"> (opens in a new tab)</span>
                      <Icon name="arrowUpRight" size={15} className={styles.linkArrow} />
                    </a>
                  ) : null}
                </div>
              </div>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
