import type { ProjectGroup, ProjectOverride } from '../types/project'

/**
 * Retouches manuelles de la sélection produite par `npm run sync:projects`.
 *
 * Rien n'est obligatoire ici : un dépôt absent de ce fichier utilise sa
 * description GitHub et ses langages détectés. On n'écrit donc que pour les
 * dépôts dont la description est vide, trop technique ou mal tournée.
 */
export const overrides: Record<string, ProjectOverride> = {
  MiniSGBDR: {
    summary:
      'Mini système de gestion de base de données en Rust : stockage et interrogation de données structurées.',
    order: 2,
  },
}

/**
 * Projets répartis sur plusieurs dépôts, réunis sous une seule carte.
 *
 * Les dépôts cités ici sont retirés du flux normal avant tout rendu : ils ne
 * peuvent donc jamais produire de carte individuelle en plus de la carte du
 * groupe, quel que soit le nombre de dépôts portant le topic.
 */
export const groups: readonly ProjectGroup[] = [
  {
    id: 'personal-finance-tracker',
    title: 'Personal Finance Tracker',
    summary:
      'Suivi de finances personnelles : interface Angular et API REST Spring Boot.',
    tech: ['Angular', 'TypeScript', 'Java', 'Spring Boot'],
    order: 1,
    repos: [
      { label: 'Frontend', name: 'personal-finance-tracker-frontend' },
      { label: 'Backend', name: 'personal-finance-tracker-backend' },
    ],
  },
]
