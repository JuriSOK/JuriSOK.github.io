import { useEffect, useRef, useState, type ComponentType } from 'react'
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
import styles from './App.module.css'

/** Composant de chaque page du panneau, par identifiant du registre. */
const pages: Record<string, ComponentType> = {
  'a-propos': About,
  parcours: Career,
  projets: Projects,
  contact: Contact,
}

/** Onglet désigné par l'URL, ou le premier onglet du registre. */
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
   * Les états de départ des animations n'existent que sous `data-motion="on"`.
   * Poser l'attribut depuis React garantit que sans JavaScript — ou avec
   * « mouvement réduit » — tout le contenu est affiché immédiatement.
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

  /* Boutons précédent / suivant du navigateur. */
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

    /* Le focus suit le changement de page : le lecteur d'écran annonce la
       nouvelle page, et le défilement revient en haut du panneau. */
    panelRef.current?.focus()
  }

  const ActivePage = pages[active]

  return (
    <>
      <SkipLink />
      <GrainOverlay />

      <div className={`shell ${styles.layout}`}>
        <Sidebar />

        <div className={styles.mainColumn}>
          <TabNav sections={visibleSections} active={active} onSelect={select} />

          <main id="contenu" ref={panelRef} tabIndex={-1} className={styles.panel}>
            {ActivePage !== undefined ? <ActivePage /> : null}
          </main>

          <p className={styles.colophon}>
            {profile.fullName} · {profile.edition} · {profile.year} — React, TypeScript et Vite.
          </p>
        </div>
      </div>
    </>
  )
}
