import type { Interest } from '../types/content'

/**
 * Interests.
 *
 * TODO — provisional notes, to be reviewed by Vibol Arnaud Sok. The word
 * « TODO » must never reach the rendered page: this note is a code comment only.
 *
 * A note must never claim a level, a performance or a result.
 */
export const interests: readonly Interest[] = [
  { id: 'photography', label: 'Photography', note: 'Framing moments and visual stories.' },
  { id: 'beatbox', label: 'Beatbox', note: 'Rhythm, creativity and improvisation.' },
  { id: 'running', label: 'Running', note: 'Consistency, endurance and progress.' },
  {
    id: 'strength-training',
    label: 'Strength Training',
    note: 'Discipline and long-term progression.',
  },
  {
    id: 'new-technologies',
    label: 'New Technologies',
    note: 'Exploring emerging tools and ideas.',
  },
  {
    id: 'series-films',
    label: 'Series & Films',
    note: 'Stories, direction and visual universes.',
  },
  { id: 'reading', label: 'Reading', note: 'Learning through ideas and perspectives.' },
]
