import { useEffect, useState } from 'react'

/**
 * Id of the section currently being read, or `null` above the first one.
 *
 * « Being read » means: the last section whose top has crossed a line drawn at
 * 35 % of the viewport height. Measured on scroll — throttled to one read per
 * animation frame — rather than with an IntersectionObserver, because sections
 * of very different heights make observer thresholds unreliable: a tall section
 * can fill the screen without ever reaching a ratio.
 *
 * Once the page is scrolled to the very bottom, the last id wins.
 *
 * Nothing is animated from this value: it only changes text and
 * `aria-current`, so it is safe under reduced motion.
 */
export function useActiveSection(ids: readonly string[]): string | null {
  const [active, setActive] = useState<string | null>(null)

  useEffect(() => {
    let frame = 0

    const measure = () => {
      frame = 0
      const line = window.innerHeight * 0.35
      let current: string | null = null

      for (const id of ids) {
        const element = document.getElementById(id)
        if (element !== null && element.getBoundingClientRect().top <= line) {
          current = id
        }
      }

      /* A short last block (the footer) can never climb to the line: once the
         page is scrolled to the very bottom, it is the one being read. */
      const atBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2

      setActive(atBottom ? (ids.at(-1) ?? current) : current)
    }

    const onScroll = () => {
      if (frame === 0) {
        frame = window.requestAnimationFrame(measure)
      }
    }

    measure()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame !== 0) {
        window.cancelAnimationFrame(frame)
      }
    }
  }, [ids])

  return active
}
