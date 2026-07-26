import { profile } from './profile'
import type { AboutContent, Fact } from '../types/content'

/**
 * Section « À propos ».
 *
 * Les paragraphes sont volontairement vides : ils doivent être écrits par Sok
 * Vibol Arnaud. Tant qu'ils le sont, la section se rend malgré tout grâce à la
 * fiche de faits ci-dessous, qui ne contient que des informations vérifiées.
 *
 * À REMPLIR — 2 à 4 paragraphes courts. Le site est lisible sans, mais creux.
 */
export const about: AboutContent = {
  paragraphs: [],
  portrait: null,
}

/**
 * Fiche de faits, dérivée du profil : aucune information nouvelle n'est
 * introduite ici, tout provient de `profile.ts`.
 */
export const facts: readonly Fact[] = [
  { label: 'Rôle', value: profile.role },
  { label: 'Formation', value: profile.education },
  { label: 'Actuellement', value: profile.company },
  { label: 'Localisation', value: profile.location },
  { label: 'Domaines', value: profile.domains.join(' · '), full: true },
]
