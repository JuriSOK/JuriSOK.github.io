import { lampSource, type DeskItem, type DeskLayout, type Placement } from '@/content/desk'

interface Lighting {
  /** Brightness under the lamp: 1.06 in the middle of the pool, 0.5 in the far corners. */
  readonly b: number
  /** Shadow offset, in desk units, cast away from the shade. */
  readonly sx: number
  readonly sy: number
  /** Shadow softness, in desk units: sharper close to the source. */
  readonly blur: number
}

/**
 * How the lamp lights an object at a placement.
 *
 * Brightness is read from the pool of light on the wood. The shadow is cast
 * away from the shade — the real source — and grows longer and softer with
 * distance, as under a desk lamp held low over the table. A constant downward
 * component stands for the faint room light.
 */
export function lightingFor(item: DeskItem, place: Placement, layout: DeskLayout): Lighting {
  if (item.id === 'lamp') {
    return { b: 1, sx: 4, sy: 12, blur: 14 }
  }
  /* Stains, knots and worn varnish are in the wood: no shadow of their own. */
  if (item.id === 'knot' || item.id === 'wear' || item.id === 'ring') {
    return { b: 1, sx: 0, sy: 0, blur: 0 }
  }
  const scale = place.s ?? 1
  const cx = place.x + (item.w * scale) / 2
  const cy = place.y + (item.h * scale) / 2
  const pool = Math.hypot(cx - layout.light.x, cy - layout.light.y)
  const reach = Math.min(1, pool / layout.light.radius)

  const source = lampSource(layout)
  const dx = cx - source.x
  const dy = cy - source.y
  const distance = Math.hypot(dx, dy) || 1
  const fall = Math.min(1, distance / layout.light.radius)
  /* Flat things (decor, paper) cast short shadows; thick ones a bit longer. */
  const thickness = item.decor === true ? 0.55 : 1
  const length = (5 + fall * 18) * thickness
  return {
    b: Number((1.06 - reach * 0.56).toFixed(3)),
    sx: Number(((dx / distance) * length).toFixed(1)),
    sy: Number(((dy / distance) * length + 3).toFixed(1)),
    blur: Number((5 + fall * 12).toFixed(1)),
  }
}
