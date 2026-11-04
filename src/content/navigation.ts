import type { SectionDefinition } from '../types/content'

/**
 * Section registry, in reading order.
 *
 * The page reads as one evening at the club, from doors open to closing time.
 * Each `cue` is a moment of that evening: the header's set clock shows the cue
 * of the section in view, so the metaphor carries the navigation rather than
 * decorating it. The titles themselves stay plain — a recruiter skimming the
 * page never has to decode a pun to find the experience.
 *
 * Ids double as URL hashes — `#projects` is a shareable deep link.
 * Times are a set list, not the real time: the real Paris time is shown in the
 * Contact section, labelled as such.
 */
export const sectionRegistry: readonly SectionDefinition[] = [
  {
    id: 'about',
    label: 'About',
    title: 'The short version.',
    cue: '9:00 pm · liner notes',
  },
  {
    id: 'journey',
    label: 'Journey',
    title: 'Where I work, where I study.',
    cue: '9:45 pm · the road so far',
  },
  {
    id: 'projects',
    label: 'Projects',
    title: 'Things I’ve built.',
    cue: '10:30 pm · the set',
    kicker: 'A selection drawn from my GitHub repositories.',
  },
  {
    id: 'hackathons',
    label: 'Hackathons',
    title: 'Built against the clock.',
    cue: '11:15 pm · jam sessions',
  },
  {
    id: 'skills',
    label: 'Skills',
    title: 'What I work with.',
    cue: '12:00 am · the kit',
  },
  {
    id: 'life',
    label: 'Life',
    title: 'When the laptop closes.',
    cue: '12:45 am · after hours',
  },
  {
    id: 'contact',
    label: 'Contact',
    title: 'Let’s build something.',
    cue: '1:30 am · last call',
  },
]

/** Cue of the opening screen, before the first section. */
export const openingCue = '8:00 pm · doors open'

/** Cue of the footer. */
export const closingCue = '2:00 am · closing time'
