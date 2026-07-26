/** Types de la section Projets, de la synchronisation GitHub au rendu d'une carte. */

/** Dépôt tel que `scripts/sync-projects.mjs` le restitue. */
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
