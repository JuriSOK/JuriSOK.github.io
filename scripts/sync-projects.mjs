/**
 * Synchronise la sélection de projets depuis GitHub.
 *
 * Un dépôt est retenu s'il porte le topic `portfolio`. Le résultat est écrit dans
 * src/content/projects.generated.json, qui est commité : le site ne fait donc
 * aucun appel réseau chez le visiteur, ne dépend d'aucune limite de débit et se
 * construit hors-ligne.
 *
 *   npm run sync:projects
 *
 * L'API publique suffit pour des dépôts publics. GITHUB_TOKEN est facultatif et
 * ne sert qu'à relever la limite de débit ; il n'est jamais embarqué dans le
 * frontend.
 */

import { writeFile, readFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const OWNER = 'JuriSOK'
const TOPIC = 'portfolio'

const here = dirname(fileURLToPath(import.meta.url))
const outputPath = join(here, '..', 'src', 'content', 'projects.generated.json')

const headers = {
  Accept: 'application/vnd.github+json',
  'X-GitHub-Api-Version': '2022-11-28',
  'User-Agent': `${OWNER}-portfolio-sync`,
}

if (process.env.GITHUB_TOKEN) {
  headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`
}

async function api(path) {
  const response = await fetch(`https://api.github.com/${path}`, { headers })

  if (!response.ok) {
    const limit = response.headers.get('x-ratelimit-remaining')
    const hint = limit === '0' ? ' (limite de débit atteinte, réessayez plus tard)' : ''
    throw new Error(`GitHub a répondu ${response.status} sur /${path}${hint}`)
  }

  return response.json()
}

async function main() {
  console.log(`Recherche des dépôts de ${OWNER} portant le topic « ${TOPIC} »…`)

  const search = await api(
    `search/repositories?q=${encodeURIComponent(`user:${OWNER} topic:${TOPIC}`)}&per_page=100`,
  )

  const found = search.items ?? []

  if (found.length === 0) {
    console.error(
      `\nAucun dépôt ne porte le topic « ${TOPIC} ».\n` +
        `Le fichier existant n'a pas été écrasé : une erreur de configuration ne doit pas\n` +
        `vider la section Projets.\n\n` +
        `Pour ajouter le topic à un dépôt :\n` +
        `  gh repo edit ${OWNER}/NOM-DU-DEPOT --add-topic ${TOPIC}\n`,
    )
    process.exitCode = 1
    return
  }

  const repos = []

  for (const repo of found) {
    const languages = await api(`repos/${OWNER}/${repo.name}/languages`)

    repos.push({
      name: repo.name,
      description: repo.description ?? null,
      url: repo.html_url,
      languages: Object.keys(languages),
    })
  }

  repos.sort((a, b) => a.name.localeCompare(b.name, 'fr'))

  const payload = {
    generatedAt: new Date().toISOString(),
    owner: OWNER,
    topic: TOPIC,
    repos,
  }

  await writeFile(outputPath, `${JSON.stringify(payload, null, 2)}\n`, 'utf8')

  console.log(`\n${repos.length} dépôt(s) écrit(s) dans src/content/projects.generated.json :`)
  for (const repo of repos) {
    console.log(`  · ${repo.name} — ${repo.languages.join(', ') || 'aucun langage détecté'}`)
  }

  await reportMissingDescriptions(repos)
}

/** Signale les dépôts qui n'ont ni description GitHub ni override rédigé. */
async function reportMissingDescriptions(repos) {
  let overrideSource = ''

  try {
    overrideSource = await readFile(join(here, '..', 'src', 'content', 'projects.overrides.ts'), 'utf8')
  } catch {
    return
  }

  const missing = repos.filter(
    (repo) => repo.description === null && !overrideSource.includes(`'${repo.name}'`),
  )

  if (missing.length > 0) {
    console.log(
      `\nSans description GitHub ni override — leur carte s'affichera sans paragraphe :\n` +
        missing.map((repo) => `  · ${repo.name}`).join('\n') +
        `\nAjoutez-leur un \`summary\` dans src/content/projects.overrides.ts.`,
    )
  }
}

main().catch((error) => {
  console.error(`\nÉchec de la synchronisation : ${error.message}`)
  console.error(`Le fichier existant n'a pas été modifié.`)
  process.exitCode = 1
})
