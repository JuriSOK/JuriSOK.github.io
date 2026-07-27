/**
 * Types de la couche contenu.
 *
 * Règle générale : tout ce qui n'est pas encore fourni est **optionnel** ou `null`.
 * Un champ absent n'est jamais rendu — ni texte de remplissage, ni lien mort.
 */

export interface Profile {
  readonly fullName: string
  readonly role: string
  readonly education: string
  readonly company: string
  /** Phrase d'introduction, en ouverture de la page « À propos ». */
  readonly intro: string
  /** Niveau de précision volontairement large. */
  readonly location: string
  /** Millésime affiché dans la sidebar et le colophon. */
  readonly year: string
  readonly edition: string
  /** Domaines professionnels, repris dans la fiche de faits. */
  readonly domains: readonly string[]
}

/** Liens externes. `null` signifie « pas encore fourni » : le lien n'est pas rendu. */
export interface SiteLinks {
  readonly github: string
  readonly linkedin: string | null
  readonly email: string | null
  readonly cv: string | null
}

/* ---------- Registre de pages ---------- */

/**
 * Une page du panneau principal. Le registre ne décrit que des pages
 * **réellement construites** : une entrée ici garantit que le composant
 * existe. Sa présence en onglet dépend ensuite de `hasContent`, calculé
 * dans `sections.ts`.
 */
export interface SectionDefinition {
  readonly id: string
  /** Numéro de catalogue, affiché dans l'en-tête de page et l'onglet desktop. */
  readonly number?: string
  readonly label: string
  /** Ligne éditoriale affichée sous le titre de page. */
  readonly kicker?: string
}

/* ---------- À propos ---------- */

export interface AboutContent {
  /** Paragraphes de présentation. Vide tant qu'ils ne sont pas rédigés. */
  readonly paragraphs: readonly string[]
  /** Chemin d'un portrait, ou `null`. La section fonctionne parfaitement sans. */
  readonly portrait: string | null
}

/** Une ligne de la fiche de faits. */
export interface Fact {
  readonly label: string
  readonly value: string
  /** Occupe toute la largeur quand la fiche est étalée sur deux colonnes. */
  readonly full?: boolean
}

/* ---------- Parcours ---------- */

export interface Experience {
  readonly id: string
  /** Seul champ toujours renseigné : le reste s'ajoute au fil de l'eau. */
  readonly organisation: string
  readonly role?: string
  readonly period?: string
  readonly summary?: string
  readonly missions?: readonly string[]
  readonly domains?: readonly string[]
  readonly tools?: readonly string[]
  /** Affiche la pastille « en poste ». */
  readonly current?: boolean
}

export interface Education {
  readonly id: string
  readonly degree: string
  readonly school?: string
  readonly period?: string
  readonly fields?: readonly string[]
  /** Projets ou enseignements marquants. */
  readonly highlights?: readonly string[]
}

/* ---------- Compétences ---------- */

export interface SkillDomain {
  readonly id: string
  readonly title: string
  /** Ce que Sok Vibol Arnaud en fait concrètement. */
  readonly usage?: string
  /** Technologies et outils, rendus en pastilles logo + nom. */
  readonly tools?: readonly string[]
  readonly contexts?: readonly string[]
}

/* ---------- Centres d'intérêt ---------- */

export interface Interest {
  readonly id: string
  readonly label: string
  /** Note très courte, en colonne droite de la tracklist. */
  readonly note?: string
}

/* ---------- Contact ---------- */

export interface ContactContent {
  /** Phrase d'invitation ouvrant la section. */
  readonly invitation?: string
}
