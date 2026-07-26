import { useEffect, useState } from 'react'

/**
 * Identifiant de la section actuellement à l'écran, pour le souligné de la
 * navigation. Retourne `null` tant qu'aucune section n'est visible — dans le
 * hero, par exemple, aucun lien ne doit paraître actif.
 */
export function useActiveSection(ids: readonly string[]): string | null {
  const [active, setActive] = useState<string | null>(null)
  const key = ids.join(',')

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') {
      return
    }

    const sections = key
      .split(',')
      .filter((id) => id.length > 0)
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null)

    if (sections.length === 0) {
      return
    }

    const visible = new Set<string>()

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            visible.add(entry.target.id)
          } else {
            visible.delete(entry.target.id)
          }
        }

        /* On garde la première section visible dans l'ordre du document. */
        const current = sections.find((section) => visible.has(section.id))
        setActive(current?.id ?? null)
      },
      { rootMargin: '-30% 0px -55% 0px' },
    )

    for (const section of sections) {
      observer.observe(section)
    }

    return () => observer.disconnect()
  }, [key])

  return active
}
