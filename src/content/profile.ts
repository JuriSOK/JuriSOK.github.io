/**
 * Contenu textuel du portfolio.
 * Le contenu est volontairement séparé des composants : les composants
 * décrivent la mise en page, ce fichier décrit ce qui est affiché.
 */

export interface Profile {
  /** Nom complet affiché en titre principal. */
  readonly fullName: string
  /** État actuel du site. */
  readonly status: string
  /** Rôle et formation, affichés en sous-titre. */
  readonly headline: string
}

export const profile: Profile = {
  fullName: 'Sok Vibol Arnaud',
  status: 'Portfolio en construction',
  headline: 'Chef de projet IA · Master MIAGE',
}
