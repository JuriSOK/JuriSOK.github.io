import type { NavItem } from './types'

/**
 * Sections numérotées comme les pistes d'une édition.
 *
 * Seules les sections réellement construites y figurent : la navigation ne
 * pointe jamais vers une ancre inexistante. Les autres entrées seront ajoutées
 * en même temps que leurs sections.
 */
export const navigation: readonly NavItem[] = [
  { id: 'projets', number: '04', label: 'Projets' },
]
