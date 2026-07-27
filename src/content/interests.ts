import type { Interest } from '../types/content'

/**
 * Interests, rendered as an accessible accordion inside the About page.
 *
 * TODO — the detail paragraphs are provisional and will be reviewed by Vibol
 * Arnaud Sok. The word « TODO » must never reach the rendered page: this note
 * is a code comment only.
 *
 * A detail must never claim a level, a performance or a result.
 */
export const interests: readonly Interest[] = [
  {
    id: 'photography',
    label: 'Photography',
    icon: 'camera',
    detail:
      'I enjoy experimenting with composition, light and visual storytelling. Photography encourages me to observe details and capture atmospheres that might otherwise go unnoticed.',
  },
  {
    id: 'beatbox',
    label: 'Beatbox',
    icon: 'microphone',
    detail:
      'Beatbox allows me to explore rhythm, creativity and improvisation using only the voice. It is both a personal challenge and a different way of expressing musical ideas.',
  },
  {
    id: 'new-technologies',
    label: 'New Technologies',
    icon: 'chip',
    detail:
      'I closely follow emerging technologies, especially artificial intelligence tools, developer platforms and new ways of creating digital products.',
  },
  {
    id: 'series-films',
    label: 'Series & Films',
    icon: 'cinema',
    detail:
      'I enjoy discovering distinctive visual universes, storytelling choices and creative direction across films and television series.',
    link: {
      label: 'View my Letterboxd profile',
      href: 'https://letterboxd.com/arnaud_sk/',
      mark: 'letterboxd',
    },
  },
  {
    id: 'reading',
    label: 'Reading',
    icon: 'book',
    detail:
      'Reading helps me explore new ideas, broaden my perspective and continue learning beyond academic and professional contexts.',
  },
]
