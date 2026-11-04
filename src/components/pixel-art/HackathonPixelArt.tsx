import type { HackathonArtName } from '@/types/pixel-art'
import { PixelGrid } from './PixelGrid'

/**
 * Scenes of the hackathon cards — 20 × 14 cells, warm café palette, original
 * work. Decorative: each card names its project in text. Coordinates were
 * placed with a small generator script and validated for a uniform 20 × 14
 * grid before being copied here.
 */

/* A draft board: a monitor showing ranked stat bars, on its stand, beside a
   basketball silhouette with seams. No team mark, no player likeness. */
const draftlens: readonly string[] = [
  'bbbbbbbbbbbbbbbbbbbb',
  'bbbbbbbbbbbbbbbbbbbb',
  'bkkkkkkkkkkkbbbbbbbb',
  'bkMMMMMMMMMkbbAkAbbb',
  'bkMCCCCCMMMkbAAkAAbb',
  'bkMAAAAMMMMkkkkkkkkb',
  'bkMGGGGGGMMkAAAkAAAb',
  'bkMCCCMMMMMkbAAkAAbb',
  'bkMAAMMMMMMkbbAkAbbb',
  'bkkkkkkkkkkkbbbbbbbb',
  'bbbbbAAAbbbbbbbbbbbb',
  'bbbbAAAAAbbbbbbbbbbb',
  'bbbbbbbbbbbbbbbbbbbb',
  'bbbbbbbbbbbbbbbbbbbb',
]

/* A vintage phone handset, a voice waveform, and three connected contact
   nodes: the trusted-circle cascade, one node marked for attention in a
   restrained bordeaux rather than an emergency red. */
const kincall: readonly string[] = [
  'bbbbbbbbbbbbbbbbbbbb',
  'bbbbbbbbbbbbbbbbbbbb',
  'bbkkkbbbbbbbbbbGGbbb',
  'bkkkkkbbbbbbbbbGGbbb',
  'bbkkkbbbbGbbbbbHHbbb',
  'bbCCCbbbbGbbbbbHHbbb',
  'bbCCCbbbCGCbbbHbbHbb',
  'bbCCCbbbCGCbbbHbbHbb',
  'bbkkkbbGCGCGbbHbbHbb',
  'bkkkkkbGCGCGbGGbbbBB',
  'bbkkkbbbbbbbbGGbbbBB',
  'bbbbbbbbbbbbbbbbbbbb',
  'bbbbbbbbbbbbbbbbbbbb',
  'bbbbbbbbbbbbbbbbbbbb',
]

const scenes: Record<HackathonArtName, readonly string[]> = {
  draftlens,
  kincall,
}

interface HackathonSceneProps {
  readonly name: HackathonArtName
  readonly className?: string | undefined
}

export function HackathonScene({ name, className }: HackathonSceneProps) {
  return <PixelGrid rows={scenes[name]} className={className} />
}
