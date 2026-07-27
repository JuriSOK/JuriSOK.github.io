import type { ProjectArtName } from '../../types/pixel-art'
import { PixelGrid } from './PixelGrid'

/**
 * Sleeve scenes for the current projects, plus thematic fallback motifs for
 * future repositories — 20 × 20 cells, warm café palette, original work.
 *
 * No bank logo, currency brand or copyrighted asset appears anywhere.
 */

/* A café accounting desk: wall receipt, framed rising chart, open ledger and a
   stack of coins on the counter. */
const personalFinanceTracker: readonly string[] = [
  'bbbbbbbbbbbbbbbbbbbb',
  'bbbbbbbbbbbbbbbbbbbb',
  'bbbMMMMbbbbAAAAAAAbb',
  'bbbMHHMbbbbAKKKKKAbb',
  'bbbMMMMbbbbAKKKKCAbb',
  'bbbMHHMbbbbAKKLKCAbb',
  'bbbMMMMbbbbAGKLKCAbb',
  'bbbMHHMbbbbAGKLKCAbb',
  'bbbMMMMbbbbAAAAAAAbb',
  'bbbMMMMbbbbbbbbbbbbb',
  'bbbbbbbbbbbbbbbbbbbb',
  'bbbbbbbbbbbbbbbbbbbb',
  'bbbbbbbbbbbbbbbbbbbb',
  'AAAAAAAAAAAAAAAAAAAA',
  'kkBMMMMBMMMMBkkkkkkk',
  'kkBMAAMBMAAMBkCCCkkk',
  'kkBMMMMBMMMMBkCCCkkk',
  'kkBBBBBBBBBBBGAAACCk',
  'kkkkkkkkkkkkkkkkkkkk',
  'kkkkkkkkkkkkkkkkkkkk',
]

/* A server cabinet with lit drawers, a terminal showing a green prompt, and a
   few data blocks drifting between the two. */
const minisgbdr: readonly string[] = [
  'bbbbbbbbbbbbbbbbbbbb',
  'bbbbbbbbbbbbbbbbbbbb',
  'bbKKKKKKKbbbbbbbbbbb',
  'bbKLkkGgKbbbbbbbbbbb',
  'bbKkkkkkKCbbbbbbbbbb',
  'bbKKKKKKKbbbkkkkkkbb',
  'bbKLkkGgKbbbkKKKKkbb',
  'bbKkkkkkKbLbkGGKKkbb',
  'bbKKKKKKKbbbkKKKKkbb',
  'bbKLkkGgKGbbkGGGKkbb',
  'bbKkkkkkKbbbkKKKLkbb',
  'bbKKKKKKKbCbkkkkkkbb',
  'bbKLkkGgKbbAAAAAAAAb',
  'bbKkkkkkKbbbkbbbbkbb',
  'bbKKKKKKKbbbkbbbbkbb',
  'AAAAAAAAAAAAAAAAAAAA',
  'kkkkkkkkkkkkkkkkkkkk',
  'kkkkkkkkkkkkkkkkkkkk',
  'kkkkkkkkkkkkkkkkkkkk',
  'kkkkkkkkkkkkkkkkkkkk',
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
