import type { Experience } from '../types/content'

/**
 * Expériences professionnelles.
 *
 * Seuls les faits fournis par Sok Vibol Arnaud figurent ici. Aucune mission,
 * date, responsabilité, technologie ni résultat n'a été inventé.
 *
 * Tous les champs sauf `organisation` sont optionnels : une entrée incomplète
 * se rend proprement avec ce qu'elle a, sans trou ni texte de remplissage.
 *
 * À REMPLIR pour chaque entrée — `period`, `missions`, `tools`, et
 * l'intitulé officiel exact du poste.
 */
export const experiences: readonly Experience[] = [
  {
    id: 'credit-agricole-assurances',
    organisation: 'Crédit Agricole Assurances',
    role: 'Chef de projet IA',
    current: true,
    domains: ['Intelligence artificielle', 'Agents IA', 'ITSM', 'Gestion de projet'],
  },
  {
    id: 'sncf',
    organisation: 'SNCF',
    domains: ['Systèmes d’information RH'],
  },
]
