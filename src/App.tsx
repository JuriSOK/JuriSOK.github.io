import { useEffect, type ComponentType } from 'react'
import { AppBackground } from './components/background/AppBackground'
import { GrainOverlay } from './components/layout/GrainOverlay'
import { SiteFooter } from './components/layout/SiteFooter'
import { SiteHeader } from './components/layout/SiteHeader'
import { SkipLink } from './components/layout/SkipLink'
import { Hackathons } from './components/projects/Hackathons'
import { Projects } from './components/projects/Projects'
import { About } from './components/sections/About'
import { Contact } from './components/sections/Contact'
import { Hero } from './components/sections/Hero'
import { Journey } from './components/sections/Journey'
import { Life } from './components/sections/Life'
import { Skills } from './components/sections/Skills'
import { visibleSections } from './content/sections'
import { useActiveSection } from './hooks/useActiveSection'
import { useReducedMotion } from './hooks/useReducedMotion'
import type { PageProps } from './types/content'

/** Component for each section, by registry id. */
const components: Record<string, ComponentType<PageProps>> = {
  about: About,
  journey: Journey,
  projects: Projects,
  hackathons: Hackathons,
  skills: Skills,
  life: Life,
  contact: Contact,
}

/** Anchors the set clock follows, in page order. Module-level: a stable array. */
const trackedIds: readonly string[] = [...visibleSections.map((section) => section.id), 'closing']

/**
 * Hashes from the former tabbed layout, still found in bookmarks and shared
 * links. Rewritten in place — `replaceState`, so no spurious back-button stop.
 */
const legacyHashes: Record<string, string> = {
  '#resume': '#journey',
}

/**
 * The page: one continuous evening, from the opening screen to closing time.
 *
 * Sections come from `visibleSections`, the same verdict the header reads, so
 * a navigation link can never point at a section that is not rendered. Each
 * component receives its definition as a prop — never a lookup by id.
 */
export default function App() {
  const reducedMotion = useReducedMotion()
  const active = useActiveSection(trackedIds)

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

  useEffect(() => {
    const target = legacyHashes[window.location.hash]

    if (target !== undefined) {
      history.replaceState(null, '', target)
      document.getElementById(target.slice(1))?.scrollIntoView()
    }
  }, [])

  return (
    <>
      <SkipLink />
      <AppBackground />
      <GrainOverlay />

      <SiteHeader sections={visibleSections} active={active} />

      <main id="content" tabIndex={-1}>
        <Hero next={visibleSections[0]?.id} />

        {visibleSections.map((section) => {
          const Component = components[section.id]
          return Component !== undefined ? <Component key={section.id} section={section} /> : null
        })}
      </main>

      <SiteFooter />
    </>
  )
}
