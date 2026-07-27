import type { SkillDomain } from '../types/content'

/**
 * Skills, grouped by domain.
 *
 * Four solid categories rather than many thin ones. Names known to the
 * `tech.ts` registry render with their logo; the others render as text badges,
 * which is a supported outcome and not a fallback failure.
 *
 * No percentage, no progress bar, no star rating, no beginner/expert label and
 * no years of experience: the type does not allow them, and they must not be
 * reintroduced.
 */
export const skills: readonly SkillDomain[] = [
  {
    id: 'ai-data',
    title: 'AI & Data',
    icon: 'ai-data',
    usage:
      'Exploring data, comparing models and transforming analytical results into practical use cases.',
    tools: ['Python', 'Machine Learning', 'Data Analysis', 'Power BI'],
    contexts: ['Academic projects', 'AI project management', 'Personal learning'],
  },
  {
    id: 'software-development',
    title: 'Software Development',
    icon: 'software',
    usage:
      'Building structured applications and working across frontend, backend and development tooling.',
    /* Ordered by prominence: the first entries carry the most weight visually. */
    tools: [
      'Java',
      'Spring Boot',
      'TypeScript',
      'Angular',
      'JavaScript',
      'SQL',
      'Git',
      'GitHub',
      'Docker',
      'Bash',
    ],
    contexts: ['University projects', 'GitHub projects', 'Full-stack development'],
  },
  {
    id: 'databases',
    title: 'Databases',
    icon: 'database',
    usage: 'Designing, querying and integrating relational and document-oriented databases.',
    tools: ['PostgreSQL', 'MySQL', 'MongoDB'],
    contexts: ['Academic applications', 'Backend projects', 'Database systems'],
  },
  {
    id: 'itsm-observability',
    title: 'ITSM, Project Management & Observability',
    icon: 'observability',
    usage:
      'Structuring use cases, coordinating projects and working with IT service management and observability tools.',
    tools: ['ServiceNow', 'Jira', 'Confluence', 'Dynatrace', 'Splunk', 'ELK', 'Trello'],
    contexts: ['Apprenticeship', 'Project coordination', 'IT service processes'],
  },
]

/**
 * `true` when a domain has more than a title to show.
 *
 * Single definition of « filled domain »: `sections.ts` uses it to decide
 * whether the page exists, and `Skills.tsx` to pick the rubrics to render.
 * The two therefore cannot disagree.
 */
export function hasDomainContent(domain: SkillDomain): boolean {
  return (
    domain.usage !== undefined ||
    (domain.tools?.length ?? 0) > 0 ||
    (domain.contexts?.length ?? 0) > 0
  )
}
