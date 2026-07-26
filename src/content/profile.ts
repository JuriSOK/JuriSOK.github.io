import type { Profile } from '../types/content'

/**
 * Contenu textuel du profil.
 *
 * Aucune expérience, mission, compétence ou réalisation n'est inventée ici :
 * ce fichier ne contient que des faits fournis par Sok Vibol Arnaud.
 */
export const profile: Profile = {
  fullName: 'Sok Vibol Arnaud',
  nameLines: ['Sok', 'Vibol', 'Arnaud'],
  role: 'Chef de projet IA',
  education: 'Master MIAGE',
  company: 'Crédit Agricole Assurances',
  intro:
    'Je conduis des projets d’intelligence artificielle et d’agents IA, à la croisée des systèmes d’information et de la gestion de projet.',
  location: 'France',
  year: '2026',
  edition: 'Édition 001',
  domains: [
    'Intelligence artificielle',
    'Agents IA',
    'ITSM',
    'Gestion de projet',
    'Développement logiciel',
    'Systèmes d’information',
  ],
}
