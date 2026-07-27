import type { SectionDefinition } from '../types/content'

/**
 * Registre des pages du site.
 *
 * Le site suit un format « vCard » : une sidebar d'identité fixe, et un panneau
 * principal dont le contenu bascule par onglets. Chaque entrée de ce registre
 * est un onglet potentiel ; sa présence réelle dépend de son contenu, calculée
 * dans `sections.ts`. Un onglet sans contenu n'apparaît nulle part.
 *
 * Les centres d'intérêt vivent dans la page « À propos » (en Face B), et les
 * compétences dans la page « Parcours » : ils n'ont pas d'onglet propre.
 */
export const sectionRegistry: readonly SectionDefinition[] = [
  {
    id: 'a-propos',
    number: '01',
    label: 'À propos',
  },
  {
    id: 'parcours',
    number: '02',
    label: 'Parcours',
    kicker: 'Expériences et formation.',
  },
  {
    id: 'projets',
    number: '03',
    label: 'Projets',
    kicker: 'Une sélection tirée de mes dépôts.',
  },
  {
    id: 'contact',
    number: '04',
    label: 'Contact',
  },
]
