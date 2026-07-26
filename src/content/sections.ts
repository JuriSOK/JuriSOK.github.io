import { projects } from './projects'
import { sectionRegistry } from './navigation'
import type { SectionDefinition } from '../types/content'

/**
 * Sections réellement affichées.
 *
 * Une section n'existe que si elle a du contenu. Trois conséquences voulues :
 * la page n'affiche jamais un titre suivi de vide, la navigation ne pointe
 * jamais vers une ancre absente, et le site se remplit tout seul à mesure que
 * les modules de contenu sont écrits.
 *
 * Pour brancher une nouvelle section : l'ajouter au registre `navigation.ts`,
 * puis déclarer ici son test de présence.
 */
const hasContent: Record<string, boolean> = {
  /* L'accueil est toujours là : c'est la couverture. */
  accueil: true,
  projets: projects.length > 0,
}

/** Sections à monter dans la page, dans l'ordre du registre. */
export const visibleSections: readonly SectionDefinition[] = sectionRegistry.filter(
  (section) => hasContent[section.id] === true,
)

/** Sections listées dans la barre de navigation desktop. */
export const navSections: readonly SectionDefinition[] = visibleSections.filter(
  (section) => section.inNav,
)

/** `true` si la section a du contenu et doit donc se rendre. */
export function isSectionVisible(id: string): boolean {
  return hasContent[id] === true
}

/**
 * Définition d'une section, pour que son composant y lise son numéro, son titre
 * et sa ligne éditoriale plutôt que de les écrire en dur.
 */
export function getSection(id: string): SectionDefinition | undefined {
  return sectionRegistry.find((section) => section.id === id)
}
