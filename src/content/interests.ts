import type { Interest } from '../types/content'

/**
 * Centres d'intérêt, présentés en tracklist de face B.
 *
 * Les cinq intitulés sont des faits fournis : la section est donc complète et
 * se rend telle quelle, sans qu'aucun texte n'ait à être écrit.
 *
 * À REMPLIR, facultatif — `note` : trois à cinq mots par entrée. Sans note, le
 * filet de conduite s'étend simplement jusqu'au bord droit et la composition
 * reste juste. Une note ne doit affirmer ni niveau, ni performance, ni résultat.
 */
export const interests: readonly Interest[] = [
  { id: 'photographie', label: 'Photographie' },
  { id: 'beatbox', label: 'Beatbox' },
  { id: 'course', label: 'Course' },
  { id: 'musculation', label: 'Musculation' },
  { id: 'technologies', label: 'Nouvelles technologies' },
]
