/**
 * Types de la couche contenu.
 *
 * Règle générale : tout ce qui n'est pas encore fourni est **optionnel** ou `null`.
 * Un champ absent n'est jamais rendu — ni texte de remplissage, ni lien mort.
 */

export interface Profile {
  readonly fullName: string
  /** Découpage du nom pour l'affichage sur trois lignes du hero. */
  readonly nameLines: readonly string[]
  readonly role: string
  readonly education: string
  readonly company: string
  /** Deux lignes courtes, affichées sous le nom. */
  readonly intro: string
  /** Niveau de précision volontairement large. */
  readonly location: string
  /** Millésime affiché dans le bandeau de crédits du hero. */
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

/* ---------- Registre de sections ---------- */

/**
 * Une section du site. Le registre ne décrit que des sections **réellement
 * construites** : une entrée ici garantit que l'ancre existe dans le document.
 * Sa présence à l'écran dépend ensuite de `hasContent`, calculé dans `sections.ts`.
 */
export interface SectionDefinition {
  readonly id: string
  /** Numéro de catalogue. Absent pour l'accueil, qui fait office de couverture. */
  readonly number?: string
  readonly label: string
  /** Ligne éditoriale affichée sous le titre de section. */
  readonly kicker?: string
  /** Visible dans la barre de navigation desktop. */
  readonly inNav: boolean
  readonly surface: 'ink' | 'paper'
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
