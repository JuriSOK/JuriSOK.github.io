import { useEffect, useRef, useState, type ComponentType } from 'react'
import { JazzCafeBackground } from './components/background/JazzCafeBackground'
import { GrainOverlay } from './components/layout/GrainOverlay'
import { Sidebar } from './components/layout/Sidebar'
import { SkipLink } from './components/layout/SkipLink'
import { TabNav } from './components/layout/TabNav'
import { Projects } from './components/projects/Projects'
import { About } from './components/sections/About'
import { Career } from './components/sections/Career'
import { Contact } from './components/sections/Contact'
import { profile } from './content/profile'
import { visibleSections } from './content/sections'
import { useReducedMotion } from './hooks/useReducedMotion'
import type { PageProps } from './types/content'
import styles from './App.module.css'

/** Component for each panel page, by registry id. */
const pages: Record<string, ComponentType<PageProps>> = {
  about: About,
  resume: Career,
  projects: Projects,
  contact: Contact,
}

/** Tab named by the URL, or the first tab in the registry. */
function tabFromHash(): string {
  const id = window.location.hash.slice(1)
  const known = visibleSections.some((section) => section.id === id)
  return known ? id : (visibleSections[0]?.id ?? '')
}

export default function App() {
  const [active, setActive] = useState(tabFromHash)
  const panelRef = useRef<HTMLElement | null>(null)
  const reducedMotion = useReducedMotion()

  /**
   * The starting states of the reveal animations only exist under
   * `data-motion="on"`. Setting the attribute from React guarantees that
   * without JavaScript — or with reduced motion — everything is shown at once.
   */
  useEffect(() => {
    const root = document.documentElement

    if (reducedMotion) {
      root.removeAttribute('data-motion')
      return
    }

    root.setAttribute('data-motion', 'on')

    return () => root.removeAttribute('data-motion')
  }, [reducedMotion])

  /* Browser back and forward buttons. */
  useEffect(() => {
    const onPopState = () => setActive(tabFromHash())
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])

  const select = (id: string) => {
    if (id === active) {
      return
    }

    setActive(id)
    history.pushState(null, '', `#${id}`)

    /* Focus follows the page change: screen readers announce the new page, and
       scrolling returns to the top of the panel. */
    panelRef.current?.focus()
  }

  /* The tab and its page are now the same object: no lookup can drift. */
  const activeSection = visibleSections.find((section) => section.id === active)
  const ActivePage = pages[active]

  return (
    <>
      <SkipLink />
      <JazzCafeBackground />
      <GrainOverlay />

      <div className={`shell ${styles.layout}`}>
        <Sidebar />

        <div className={styles.mainColumn}>
          <TabNav sections={visibleSections} active={active} onSelect={select} />

          <main id="content" ref={panelRef} tabIndex={-1} className={styles.panel}>
            {ActivePage !== undefined && activeSection !== undefined ? (
              <ActivePage section={activeSection} />
            ) : null}
          </main>

          <p className={styles.colophon}>
            {profile.fullName} · {new Date().getFullYear()} — Built with React, TypeScript and Vite.
          </p>
        </div>
      </div>
    </>
  )
}
