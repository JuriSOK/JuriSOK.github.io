import type { SectionDefinition } from '../types/content'

/**
 * Registre des sections du site.
 *
 * Une entrée ici signifie que la section est **réellement construite** et que son
 * ancre existe dans le document : c'est ce qui rend un lien mort impossible. Les
 * sections sont ajoutées à ce registre au fur et à mesure qu'elles sont bâties.
 *
 * Qu'une section apparaisse ou non à l'écran dépend ensuite de son contenu réel,
 * calculé dans `sections.ts`.
 */
export const sectionRegistry: readonly SectionDefinition[] = [
  {
    id: 'accueil',
    label: 'Accueil',
    inNav: true,
    surface: 'ink',
  },
  {
    id: 'a-propos',
    number: '01',
    label: 'À propos',
    inNav: true,
    surface: 'paper',
  },
  {
    id: 'parcours',
    number: '02',
    label: 'Parcours',
    kicker: 'Expériences et formation.',
    inNav: true,
    surface: 'ink',
  },
  {
    id: 'competences',
    number: '03',
    label: 'Compétences',
    inNav: true,
    surface: 'paper',
  },
  {
    id: 'projets',
    number: '04',
    label: 'Projets',
    kicker: 'Une sélection tirée de mes dépôts.',
    inNav: true,
    surface: 'ink',
  },
  {
    id: 'interets',
    number: '05',
    label: 'Centres d’intérêt',
    kicker: 'Face B.',
    /* Volontairement hors de la barre desktop, pour ne pas la surcharger.
       Le menu mobile, lui, la liste comme les autres. */
    inNav: false,
    surface: 'ink',
  },
]
