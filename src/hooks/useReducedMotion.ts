import { useMediaQuery } from './useMediaQuery'

/**
 * `true` quand l'utilisateur a demandé à réduire les animations.
 *
 * Sert de second garde-fou après la règle CSS `prefers-reduced-motion` : il
 * empêche `data-motion="on"` d'être posé et coupe le parallaxe côté JavaScript,
 * là où le CSS seul ne suffirait pas.
 */
export function useReducedMotion(): boolean {
  return useMediaQuery('(prefers-reduced-motion: reduce)')
}
