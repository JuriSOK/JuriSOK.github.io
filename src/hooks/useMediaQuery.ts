import { useSyncExternalStore } from 'react'

/**
 * Suit une media query et se met à jour quand elle change.
 *
 * `useSyncExternalStore` plutôt qu'un `useState` + `useEffect` : la valeur est
 * lue au moment du rendu, donc jamais de premier rendu avec une valeur fausse
 * suivi d'un ré-rendu visible.
 */
export function useMediaQuery(query: string): boolean {
  const subscribe = (onChange: () => void): (() => void) => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      return () => {}
    }

    const list = window.matchMedia(query)
    list.addEventListener('change', onChange)
    return () => list.removeEventListener('change', onChange)
  }

  const getSnapshot = (): boolean => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      return false
    }
    return window.matchMedia(query).matches
  }

  return useSyncExternalStore(subscribe, getSnapshot, () => false)
}
