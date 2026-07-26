/** Types partagés de la couche contenu. */

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
}

export interface NavItem {
  /** Identifiant de la section, utilisé comme ancre. */
  readonly id: string
  readonly number: string
  readonly label: string
}

/** Liens externes. `null` signifie « pas encore fourni » : le lien n'est pas rendu. */
export interface SiteLinks {
  readonly github: string
  readonly linkedin: string | null
  readonly email: string | null
  readonly cv: string | null
}

/* ---------- Projets ---------- */

/** Dépôt tel que le script de synchronisation le restitue. */
export interface GeneratedRepo {
  readonly name: string
  readonly description: string | null
  readonly url: string
  readonly languages: readonly string[]
}

export interface GeneratedProjects {
  readonly generatedAt: string
  readonly owner: string
  readonly topic: string
  readonly repos: readonly GeneratedRepo[]
}

/** Retouche d'un dépôt isolé. Tous les champs sont optionnels. */
export interface ProjectOverride {
  readonly title?: string
  readonly summary?: string
  readonly tech?: readonly string[]
  readonly order?: number
  readonly image?: string
  readonly hidden?: boolean
}

export interface RepoRef {
  /** Libellé du bouton : « Frontend », « Backend »… */
  readonly label: string
  readonly name: string
}

/** Plusieurs dépôts réunis sous une seule carte éditoriale. */
export interface ProjectGroup {
  readonly id: string
  readonly title: string
  readonly summary?: string
  readonly tech?: readonly string[]
  readonly order?: number
  readonly image?: string
  readonly repos: readonly RepoRef[]
}

export interface ProjectLink {
  readonly label: string
  readonly url: string
}

/** Ce que reçoit `ProjectCard`, quelle que soit l'origine du projet. */
export interface ProjectCardData {
  readonly id: string
  readonly title: string
  readonly summary: string | null
  readonly tech: readonly string[]
  readonly image: string | null
  /** Un lien pour un projet simple, deux pour un projet regroupé. */
  readonly links: readonly ProjectLink[]
}
