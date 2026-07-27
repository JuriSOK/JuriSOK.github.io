import type { SectionDefinition } from '../types/content'

/**
 * Page registry.
 *
 * The site follows a « vCard » format: a fixed identity sidebar, and a main
 * panel whose content switches by tabs. Each entry is a potential tab; whether
 * it actually appears depends on its content, computed in `sections.ts`.
 *
 * Interests live inside the About page, and skills inside Resume: neither has
 * a tab of its own.
 *
 * Ids double as URL hashes — `#projects` is a shareable deep link.
 */
export const sectionRegistry: readonly SectionDefinition[] = [
  {
    id: 'about',
    label: 'About',
  },
  {
    id: 'resume',
    label: 'Resume',
    kicker: 'Experience, education and skills.',
  },
  {
    id: 'projects',
    label: 'Projects',
    kicker: 'A selection drawn from my repositories.',
  },
  {
    id: 'hackathons',
    label: 'Hackathons',
    kicker: 'Concepts I would like to explore during future hackathons.',
  },
  {
    id: 'contact',
    label: 'Contact',
  },
]
