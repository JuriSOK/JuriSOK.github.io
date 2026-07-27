import type { SkillDomain } from '../types/content'

/**
 * Compétences, regroupées par domaine.
 *
 * Les six intitulés proviennent des domaines professionnels fournis par Sok
 * Vibol Arnaud. Le corps de chaque rubrique — phrase d'usage, outils, contextes
 * — est volontairement vide : ces informations n'ont pas été fournies et ne
 * seront pas devinées.
 *
 * Un domaine sans `usage` ni `tools` ne se rend pas, et la section entière
 * disparaît tant qu'aucun domaine n'a de contenu : six titres suivis de vide ne
 * seraient pas une section de compétences.
 *
 * À REMPLIR pour chaque domaine :
 *   usage    — une phrase : ce que vous en faites concrètement.
 *   tools    — technologies et outils ; les noms connus du registre `tech.ts`
 *              afficheront leur logo, les autres un badge texte.
 *   contexts — dans quels cadres vous les pratiquez.
 *
 * Ni pourcentage, ni jauge, ni niveau, ni étoile : ce type ne les permet pas.
 */
/**
 * `true` si un domaine a autre chose que son titre à montrer.
 *
 * Unique définition du « domaine renseigné » : `sections.ts` s'en sert pour
 * décider si la section existe, et `Skills.tsx` pour choisir les rubriques à
 * rendre. Les deux ne peuvent donc pas diverger.
 */
export function hasDomainContent(domain: SkillDomain): boolean {
  return (
    domain.usage !== undefined ||
    (domain.tools?.length ?? 0) > 0 ||
    (domain.contexts?.length ?? 0) > 0
  )
}

export const skills: readonly SkillDomain[] = [
  { id: 'ia-donnees', title: 'Intelligence artificielle et données' },
  { id: 'agents-automatisation', title: 'Agents IA et automatisation' },
  { id: 'projet-itsm', title: 'Gestion de projet et ITSM' },
  { id: 'developpement', title: 'Développement logiciel' },
  { id: 'systemes-information', title: 'Systèmes d’information' },
  { id: 'outils-methodes', title: 'Outils et méthodes' },
]
