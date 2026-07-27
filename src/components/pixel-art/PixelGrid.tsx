import type { ReactElement } from 'react'
import { warm } from './palette'

/**
 * Renders a pixel map as a crisp SVG.
 *
 * A drawing is a list of equal-length strings; each character is looked up in
 * the palette, and unknown characters (usually « . ») are transparent.
 * Horizontal runs of the same colour are merged into single rectangles to keep
 * the node count low.
 *
 * Every drawing produced this way is original local work: no icon library, no
 * emoji, no remote asset, no copyrighted sprite.
 */

interface PixelGridProps {
  readonly rows: readonly string[]
  readonly palette?: Record<string, string>
  readonly className?: string | undefined
}

export function PixelGrid({ rows, palette = warm, className }: PixelGridProps) {
  const height = rows.length
  const width = rows[0]?.length ?? 0
  const rects: ReactElement[] = []

  rows.forEach((row, y) => {
    let x = 0
    while (x < width) {
      const char = row[x] ?? '.'
      const fill = palette[char]

      if (fill === undefined) {
        x += 1
        continue
      }

      let end = x + 1
      while (end < width && row[end] === char) {
        end += 1
      }

      rects.push(<rect key={`${x}.${y}`} x={x} y={y} width={end - x} height={1} fill={fill} />)
      x = end
    }
  })

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      shapeRendering="crispEdges"
      aria-hidden="true"
      focusable="false"
      {...(className !== undefined ? { className } : {})}
    >
      {rects}
    </svg>
  )
}
