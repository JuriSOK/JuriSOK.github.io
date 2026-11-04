import type { ProjectArtName } from '@/types/pixel-art'
import { FallbackScene, ProjectScene } from './ProjectPixelArt'

/** Hand-drawn scenes, by project id. Others get a deterministic fallback. */
const sceneByProject: Record<string, ProjectArtName> = {
  'personal-finance-tracker': 'personal-finance-tracker',
  MiniSGBDR: 'minisgbdr',
}

/** FNV-1a: the same project always gets the same fallback scene. */
function hash(value: string): number {
  let result = 0x811c9dc5
  for (let index = 0; index < value.length; index += 1) {
    result ^= value.charCodeAt(index)
    result = Math.imul(result, 0x01000193) >>> 0
  }
  return result
}

export function ProjectArtwork({ id, className }: { id: string; className?: string }) {
  const scene = sceneByProject[id]
  return scene !== undefined ? (
    <ProjectScene name={scene} className={className} />
  ) : (
    <FallbackScene seed={hash(id)} className={className} />
  )
}
