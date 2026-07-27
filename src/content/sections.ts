import { about, facts } from './about'
import { education } from './education'
import { experiences } from './experiences'
import { interests } from './interests'
import { links } from './links'
import { projects } from './projects'
import { hasDomainContent, skills } from './skills'
import { sectionRegistry } from './navigation'
import type { SectionDefinition } from '../types/content'

/**
 * Onglets réellement affichés.
 *
 * Un onglet n'existe que si sa page a du contenu. Trois conséquences voulues :
 * le panneau n'affiche jamais un titre suivi de vide, la navigation ne propose
 * jamais un onglet creux, et le site se remplit tout seul à mesure que les
 * modules de contenu sont écrits.
 */
const hasContent: Record<string, boolean> = {
  /* La fiche de faits et la Face B suffisent, avant même la prose. */
  'a-propos': about.paragraphs.length > 0 || facts.length > 0 || interests.length > 0,

  /* Les compétences vivent dans cette page : elles comptent pour elle. */
  parcours: experiences.length > 0 || education.length > 0 || skills.some(hasDomainContent),

  projets: projects.length > 0,

  /* GitHub figure déjà dans la sidebar : à lui seul, il ne justifie pas un
     onglet. Il faut un vrai moyen de prise de contact. */
  contact: links.email !== null || links.linkedin !== null || links.cv !== null,
}

/** Onglets à afficher, dans l'ordre du registre. */
export const visibleSections: readonly SectionDefinition[] = sectionRegistry.filter(
  (section) => hasContent[section.id] === true,
)

/** `true` si la page a du contenu et doit donc exister. */
export function isSectionVisible(id: string): boolean {
  return hasContent[id] === true
}

/**
 * Définition d'une page, pour que son composant y lise son numéro, son titre
 * et sa ligne éditoriale plutôt que de les écrire en dur.
 */
export function getSection(id: string): SectionDefinition | undefined {
  return sectionRegistry.find((section) => section.id === id)
}
