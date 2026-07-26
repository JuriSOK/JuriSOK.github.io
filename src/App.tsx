import { useEffect } from 'react'
import { GrainOverlay } from './components/layout/GrainOverlay'
import { SiteFooter } from './components/layout/SiteFooter'
import { SiteHeader } from './components/layout/SiteHeader'
import { SkipLink } from './components/layout/SkipLink'
import { Projects } from './components/projects/Projects'
import { About } from './components/sections/About'
import { Hero } from './components/sections/Hero'
import { Interests } from './components/sections/Interests'
import { useReducedMotion } from './hooks/useReducedMotion'

export default function App() {
  const reducedMotion = useReducedMotion()

  /**
   * Les états de départ des révélations n'existent que sous `data-motion="on"`.
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

  return (
    <>
      <SkipLink />
      <GrainOverlay />
      <SiteHeader />

      {/* L'ordre des sections suit le registre de `content/navigation.ts`.
          Chaque section décide elle-même de se rendre, via `isSectionVisible` :
          la page et la navigation lisent ainsi le même verdict. */}
      <main id="contenu">
        <Hero />
        <About />
        <Projects />
        <Interests />
      </main>

      <SiteFooter />
    </>
  )
}
