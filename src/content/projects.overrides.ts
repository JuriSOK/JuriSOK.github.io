import type { ProjectGroup, ProjectOverride } from '../types/project'

/**
 * Manual edits to the selection produced by `npm run sync:projects`.
 *
 * Nothing is mandatory here: a repository absent from this file falls back to
 * its GitHub description and detected languages. We only write for repositories
 * whose description is empty, too technical, or not in English.
 */
export const overrides: Record<string, ProjectOverride> = {
  MiniSGBDR: {
    summary:
      'A lightweight database management system built from scratch, supporting core SQL-like operations and structured data storage.',
    tech: ['Rust'],
    order: 2,
  },
}

/**
 * Projects spread across several repositories, gathered under a single card.
 *
 * Repositories listed here are removed from the normal flow before any render:
 * they can therefore never produce an individual card on top of the group card,
 * whatever the number of repositories carrying the topic.
 */
export const groups: readonly ProjectGroup[] = [
  {
    id: 'personal-finance-tracker',
    title: 'Personal Finance Tracker',
    summary:
      'A personal finance tracking application with an Angular interface and a Spring Boot REST API.',
    tech: ['Angular', 'TypeScript', 'Java', 'Spring Boot', 'PostgreSQL'],
    order: 1,
    repos: [
      { label: 'Frontend', name: 'personal-finance-tracker-frontend' },
      { label: 'Backend', name: 'personal-finance-tracker-backend' },
    ],
  },
]
