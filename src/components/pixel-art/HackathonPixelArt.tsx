import type { HackathonArtName } from '../../types/pixel-art'
import { PixelGrid } from './PixelGrid'

/**
 * Scenes of the hackathon concept cards — 20 × 14 cells, warm café palette,
 * original work. Decorative: each card names its concept in text.
 */

/* A support desk: monitoring screen with an alert on the curve, and a small
   helpful assistant standing by. */
const incidentCopilot: readonly string[] = [
  'bbbbbbbbbbbbbbbbbbbb',
  'bbbbbbbbbbbbbbbbbbbb',
  'bbbkkkkkkkkbbbbbbbbb',
  'bbbkKKKKKKkbbbbGbbbb',
  'bbbkKKKBKKkbbMMMMMbb',
  'bbbkKKLLKKkbbMgMgMbb',
  'bbbkLLKKKKkbbMMMMMbb',
  'bbbkKKKKKGkbbbCCCbbb',
  'bbbkkkkkkkkbbbCCCbbb',
  'bbbbbbkkbbbbbbCCCbbb',
  'bAAAAAAAAAAAAAAAAAAb',
  'bbkbbbbbbbbbbbbbbkbb',
  'bbkbbbbbbbbbbbbbbkbb',
  'bbbbbbbbbbbbbbbbbbbb',
]

/* Three workflow blocks linked left to right, feeding a small control panel. */
const workflowStudio: readonly string[] = [
  'bbbbbbbbbbbbbbbbbbbb',
  'bbbbbbbbbbbbbbbbbbbb',
  'bbLLLLbbCCCCbbGGGGbb',
  'bbLKKLHHCKKCHHGKKGbb',
  'bbLLLLbbCCCCbbGGGGbb',
  'bbbbbbbbbbbbbbbbbbbb',
  'bbbbbbbbbHHbbbbbbbbb',
  'bbbbbbbbbbbbbbbbbbbb',
  'bbbbkkkkkkkkkkkkbbbb',
  'bbbbkkMkGkCkLkkkbbbb',
  'bbbbkKKKKKKKKKKkbbbb',
  'bbbbkkkkkkkkkkkkbbbb',
  'bbbbbbbbbbbbbbbbbbbb',
  'bbbbbbbbbbbbbbbbbbbb',
]

/* A light interface panel: contrast swatch, text lines, a toggle, and a
   button wearing a visible copper focus ring. */
const accessibleToolkit: readonly string[] = [
  'bbbbbbbbbbbbbbbbbbbb',
  'bbkkkkkkkkkkkkkkkkbb',
  'bbkMMMMMMMMMMMMMMkbb',
  'bbkMKKMMMMAAAAAMMkbb',
  'bbkMKKMMMMAAAMMMMkbb',
  'bbkMMMMMMMMMMMMMMkbb',
  'bbkMkkkkkkkkkMMMMkbb',
  'bbkMkkkkkkMMMMMMMkbb',
  'bbkMMMMMMMMMMMMMMkbb',
  'bbkMggMMMMCCCCCMMkbb',
  'bbkMMMMMMMCkkkCMMkbb',
  'bbkMMMMMMMCCCCCMMkbb',
  'bbkkkkkkkkkkkkkkkkbb',
  'bbbbbbbbbbbbbbbbbbbb',
]

const scenes: Record<HackathonArtName, readonly string[]> = {
  'incident-copilot': incidentCopilot,
  'workflow-studio': workflowStudio,
  'accessible-toolkit': accessibleToolkit,
}

interface HackathonSceneProps {
  readonly name: HackathonArtName
  readonly className?: string | undefined
}

export function HackathonScene({ name, className }: HackathonSceneProps) {
  return <PixelGrid rows={scenes[name]} className={className} />
}
