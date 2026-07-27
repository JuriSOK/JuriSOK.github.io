import type { ProjectArtName } from '../../types/pixel-art'
import { PixelGrid } from './PixelGrid'

/**
 * Sleeve scenes for the current projects (24 × 24), plus thematic fallback
 * motifs for future repositories (20 × 20) — warm café palette, original work.
 *
 * No bank logo, currency brand or copyrighted asset appears anywhere.
 */

/* A presentation board on its tripod: gridded chart face, a green trend line
   climbing to the top right, and a gold coin resting on the horizontal axis.
   The coin carries no currency symbol — no brand, no bank, no copyrighted
   mark, and the whole scene is redrawn in the warm café palette. */
const personalFinanceTracker: readonly string[] = [
  'bbbbbbbbbbbKKbbbbbbbbbbb',
  'bbbbbbbbKKKKKKKKbbbbbbbb',
  'bbbbKKKKKKKKKKKKKKKKbbbb',
  'bKKKKKKKKKKKKKKKKKKKKKKb',
  'bKMMMMMMMMMMMMMMMMMMMMKb',
  'bKMkMMMMHMMMMHMMMMHGGMKb',
  'bKkkkMMMHMMMMHMMMMGGGMKb',
  'bKMkMMMMHMMMMHMMMGGGGMKb',
  'bKMkHHHHHHHHHHHGGGGHGHKb',
  'bKMkMMMMHMMMMHGGGGGMMMKb',
  'bKMkMMMMHMMMGGGGMMHMMMKb',
  'bKMkMMMMHMMGGGGGMMHMMMKb',
  'bKMkHHHHHGGGGHHHHHHHHHKb',
  'bKMkMMMMGGGGGHMMMMHMMMKb',
  'bKMMKKKMGGMMMHMMMMHMMMKb',
  'bKMKCCCKGGMMMHMMMMHMMMKb',
  'bKMKCACKHHHHHHHHHHHHHkKb',
  'bKMKCCCKkkkkkkkkkkkkkkKb',
  'bKMMKKKMMMMMMMMMMMMMMkKb',
  'bKKKKKKKKKKKKKKKKKKKKKKb',
  'bbbbbbbbbbbAAbbbbbbbbbbb',
  'bbbbbbbbbAbAAbAbbbbbbbbb',
  'bbbbbbbbAbbAAbbAbbbbbbbb',
  'bbbbbbbAbbbAAbbbAbbbbbbb',
]

/* A filing cabinet of three labelled drawers with a metal top, beside a stack
   of data cylinders — the paper archive and the database, side by side. */
const minisgbdr: readonly string[] = [
  'bbbbbbbbbbbbbbbbbbbbbbbb',
  'bbbHHHHHHHHHHHHHbbbbbbbb',
  'bbHHHHHHHHHHHHHHHbbbbbbb',
  'bKKKKKKKKKKKKKKKKbbbbbbb',
  'bKLLLLLLLLLLLLLLKbbbbbbb',
  'bKLLLLKKKKKKLLLLKbbbbbbb',
  'bKLLLLKMMMMKLLLLKbbbbbbb',
  'bKLLLLKKKKKKLLLLKbbbbbbb',
  'bKLLLLLLLLLLLLLLKbbbbbbb',
  'bKKKKKKKKKKKKKKKKbbbbbbb',
  'bKLLLLLLLLLLLLLLKbbbbbbb',
  'bKLLLLKKKKKKLLLLKbbbbbbb',
  'bKLLLLKMMMMKLLLLKKKKKKKb',
  'bKLLLLKKKKKKLLLLKKGGGGKb',
  'bKLLLLLLLLLLLLLLKKggggKb',
  'bKKKKKKKKKKKKKKKKKGGGGKb',
  'bKLLLLLLLLLLLLLLKKGGGGKb',
  'bKLLLLKKKKKKLLLLKKggggKb',
  'bKLLLLKMMMMKLLLLKKGGGGKb',
  'bKLLLLKKKKKKLLLLKKGGGGKb',
  'bKLLLLLLLLLLLLLLKKggggKb',
  'bbbbbbbbbbbbbbbbbKGGGGKb',
  'bbbbbbbbbbbbbbbbbKKKKKKb',
  'bbbbbbbbbbbbbbbbbbbbbbbb',
]

const scenes: Record<ProjectArtName, readonly string[]> = {
  'personal-finance-tracker': personalFinanceTracker,
  minisgbdr,
}

/* ---- Thematic fallbacks for future repositories ---- */

/* A terminal window with a running prompt. */
const fallbackTerminal: readonly string[] = [
  'bbbbbbbbbbbbbbbbbbbb',
  'bbbbbbbbbbbbbbbbbbbb',
  'bbbbbbbbbbbbbbbbbbbb',
  'bbbkkkkkkkkkkkkkkbbb',
  'bbbkCkLkGkkkkkkkkbbb',
  'bbbkkkkkkkkkkkkkkbbb',
  'bbbkKKKKKKKKKKKKkbbb',
  'bbbkKGGGGGKKKKKKkbbb',
  'bbbkKKKKKKKKKKKKkbbb',
  'bbbkKLLLLLLLLKKKkbbb',
  'bbbkKKKKKKKKKKKKkbbb',
  'bbbkKLLLLKKKKKKKkbbb',
  'bbbkKKKKKKKKKKKKkbbb',
  'bbbkKGGKMKKKKKKKkbbb',
  'bbbkKKKKKKKKKKKKkbbb',
  'bbbkkkkkkkkkkkkkkbbb',
  'bbbbbbbbbbbbbbbbbbbb',
  'bbbbbbbbbbbbbbbbbbbb',
  'bbbbbbbbbbbbbbbbbbbb',
  'bbbbbbbbbbbbbbbbbbbb',
]

/* Three file folders lined up on a shelf. */
const fallbackFolders: readonly string[] = [
  'bbbbbbbbbbbbbbbbbbbb',
  'bbbbbbbbbbbbbbbbbbbb',
  'bbbbbbbbbbbbbbbbbbbb',
  'bbbbbbbbbbbbbbbbbbbb',
  'bbbbbbbbbbbbbbbbbbbb',
  'bbbbbbbbbbbbbbbbbbbb',
  'bbbbbbbbbbbbbbbbbbbb',
  'bbCCbbbLLbbbGGbbbbbb',
  'bbCCCCbLLLLbGGGGbbbb',
  'bbCKCCbLKLLbGKGGbbbb',
  'bbCCCCbLLLLbGGGGbbbb',
  'bbCCCCbLLLLbGGGGbbbb',
  'bbCCCCbLLLLbGGGGbbbb',
  'bAAAAAAAAAAAAAAAAAAb',
  'bbbbbbbbbbbbbbbbbbbb',
  'bbbbbbbbbbbbbbbbbbbb',
  'bbbbbbbbbbbbbbbbbbbb',
  'bbbbbbbbbbbbbbbbbbbb',
  'bbbbbbbbbbbbbbbbbbbb',
  'bbbbbbbbbbbbbbbbbbbb',
]

/* Data cubes stacked on the counter, a couple still floating. */
const fallbackBlocks: readonly string[] = [
  'bbbbbbbbbbbbbbbbbbbb',
  'bbbbbbbbbbbbbbbbbbbb',
  'bbbbbbbbbbbbbbbbbbbb',
  'bbbbbbbbbbbbbCCbbbbb',
  'bbbbbbbbbbbbbCCbbbbb',
  'bbbbbbbbbbbbbbbbbbbb',
  'bbbbbbbbbLLbbbbbbbbb',
  'bbbbbbbbbLLbbbbbbbbb',
  'bbbbbbbbbbbbbbbbbbbb',
  'bbbbGGGbbbbbbbbbbbbb',
  'bbbbGKGbbbbbbbbbbbbb',
  'bbbbGGGbbbbbbbbbbbbb',
  'bbCCCbbLLLbbbbGGGbbb',
  'bbCKCbbLKLbbbbGKGbbb',
  'bbCCCbbLLLbbbbGGGbbb',
  'AAAAAAAAAAAAAAAAAAAA',
  'kkkkkkkkkkkkkkkkkkkk',
  'kkkkkkkkkkkkkkkkkkkk',
  'kkkkkkkkkkkkkkkkkkkk',
  'kkkkkkkkkkkkkkkkkkkk',
]

const fallbacks: readonly (readonly string[])[] = [
  fallbackTerminal,
  fallbackFolders,
  fallbackBlocks,
]

interface ProjectSceneProps {
  readonly name: ProjectArtName
  readonly className?: string | undefined
}

export function ProjectScene({ name, className }: ProjectSceneProps) {
  return <PixelGrid rows={scenes[name]} className={className} />
}

interface FallbackSceneProps {
  /** Stable hash of the project id: the same project always gets the same scene. */
  readonly seed: number
  readonly className?: string | undefined
}

export function FallbackScene({ seed, className }: FallbackSceneProps) {
  const rows = fallbacks[seed % fallbacks.length] ?? fallbackTerminal
  return <PixelGrid rows={rows} className={className} />
}
