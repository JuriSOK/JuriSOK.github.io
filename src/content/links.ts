import type { SiteLinks } from './types'

/**
 * Liens externes du site.
 *
 * `null` signifie « pas encore fourni » : le lien correspondant n'est tout
 * simplement pas rendu. Aucun lien mort, aucun bouton désactivé.
 *
 * Pour activer le CV, déposer le PDF dans `public/cv/` et renseigner le chemin.
 */
export const links: SiteLinks = {
  github: 'https://github.com/JuriSOK',
  linkedin: null,
  email: null,
  cv: null,
}
