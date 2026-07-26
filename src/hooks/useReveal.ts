import { useCallback } from 'react'

/**
 * Marque un élément comme visible dès qu'il entre dans le champ.
 *
 * Le style de départ (opacité 0) n'existe que sous `:root[data-motion="on"]` :
 * sans JavaScript, sans IntersectionObserver ou avec « mouvement réduit », le
 * contenu est affiché normalement. Aucun texte ne peut rester invisible.
 */

let observer: IntersectionObserver | null = null

function getObserver(): IntersectionObserver | null {
  if (typeof IntersectionObserver === 'undefined') {
    return null
  }

  observer ??= new IntersectionObserver(
    (entries, self) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.setAttribute('data-visible', 'true')
          /* Une seule fois : la révélation ne se rejoue pas au défilement inverse. */
          self.unobserve(entry.target)
        }
      }
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
  )

  return observer
}

export function useReveal<T extends Element>(): (node: T | null) => void | (() => void) {
  return useCallback((node: T | null) => {
    if (node === null) {
      return
    }

    const shared = getObserver()

    if (shared === null) {
      node.setAttribute('data-visible', 'true')
      return
    }

    shared.observe(node)
    return () => shared.unobserve(node)
  }, [])
}
