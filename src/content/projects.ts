import generated from './projects.generated.json'
import { groups, overrides } from './projects.overrides'
import type { GeneratedProjects, GeneratedRepo, ProjectCardData, ProjectLink } from './types'

const data = generated as GeneratedProjects

/** Nombre maximal de technologies affichées sur une carte. */
const MAX_TECH = 5

/** Nombre de langages retenus quand aucune liste n'est fournie en override. */
const AUTO_TECH = 3

interface Sortable {
  readonly order: number | null
  readonly card: ProjectCardData
}

/**
 * Construit la liste des cartes à partir des dépôts synchronisés et des
 * retouches manuelles.
 *
 * Fonction pure : elle ne dépend que de ses deux sources et peut être vérifiée
 * isolément. C'est elle qui garantit qu'un projet réparti sur plusieurs dépôts
 * ne produit jamais de doublon.
 */
export function buildProjects(): readonly ProjectCardData[] {
  const byName = new Map<string, GeneratedRepo>()
  for (const repo of data.repos) {
    byName.set(repo.name, repo)
  }

  /* Les dépôts membres d'un groupe sortent du flux normal. */
  const grouped = new Set<string>()
  for (const group of groups) {
    for (const member of group.repos) {
      grouped.add(member.name)
    }
  }

  const entries: Sortable[] = []

  /* 1. Une carte par groupe dont au moins un dépôt membre est publié. */
  for (const group of groups) {
    const members = group.repos
      .map((member) => ({ member, repo: byName.get(member.name) }))
      .filter((entry): entry is { member: (typeof group.repos)[number]; repo: GeneratedRepo } =>
        entry.repo !== undefined,
      )

    if (members.length === 0) {
      continue
    }

    const links: ProjectLink[] = members.map(({ member, repo }) => ({
      label: member.label,
      url: repo.url,
    }))

    /* Technologies cumulées : union dédupliquée, dans l'ordre des dépôts. */
    const languages = members.flatMap(({ repo }) => repo.languages)

    entries.push({
      order: group.order ?? null,
      card: {
        id: group.id,
        title: group.title,
        summary: group.summary ?? members[0]?.repo.description ?? null,
        tech: pickTech(group.tech, languages),
        image: group.image ?? null,
        links,
      },
    })
  }

  /* 2. Une carte par dépôt restant. */
  for (const repo of data.repos) {
    if (grouped.has(repo.name)) {
      continue
    }

    const override = overrides[repo.name]

    if (override?.hidden === true) {
      continue
    }

    entries.push({
      order: override?.order ?? null,
      card: {
        id: repo.name,
        title: override?.title ?? repo.name,
        summary: override?.summary ?? repo.description,
        tech: pickTech(override?.tech, repo.languages),
        image: override?.image ?? null,
        links: [{ label: 'Voir sur GitHub', url: repo.url }],
      },
    })
  }

  /* 3. Tri par `order` croissant, les projets sans `order` en dernier. */
  entries.sort((a, b) => {
    if (a.order !== b.order) {
      if (a.order === null) return 1
      if (b.order === null) return -1
      return a.order - b.order
    }
    return a.card.title.localeCompare(b.card.title, 'fr')
  })

  return entries.map((entry) => entry.card)
}

/** Liste explicite si elle existe, sinon les principaux langages détectés. */
function pickTech(
  explicit: readonly string[] | undefined,
  languages: readonly string[],
): readonly string[] {
  if (explicit !== undefined) {
    return explicit.slice(0, MAX_TECH)
  }

  const unique = [...new Set(languages)]
  return unique.slice(0, AUTO_TECH)
}

export const projects = buildProjects()

/** Date de la dernière synchronisation, affichée dans le colophon. */
export const projectsSyncedAt = data.generatedAt
