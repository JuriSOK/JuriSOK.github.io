/**
 * Letterboxd brand mark.
 *
 * The mark is three overlapping discs, redrawn here as three `<circle>`
 * elements in the official colours rather than copied from a distributed
 * asset. Local SVG: no remote image, no CDN request at runtime.
 *
 * `Icon.tsx` cannot host it — that registry paints a single path in
 * `currentColor`, and this mark needs three fixed colours.
 *
 * Decorative: every use displays the visible label « Letterboxd » beside it.
 */

const GREEN = '#00e054'
const ORANGE = '#ff8000'
const BLUE = '#40bcf4'

interface LetterboxdMarkProps {
  readonly size?: number
  readonly className?: string | undefined
}

export function LetterboxdMark({ size = 18, className }: LetterboxdMarkProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 44 20"
      aria-hidden="true"
      focusable="false"
      {...(className !== undefined ? { className } : {})}
    >
      {/* Outer discs first, centre disc last: the overlaps read as on the
          original mark, where the middle sits above its neighbours. */}
      <circle cx="10" cy="10" r="10" fill={ORANGE} />
      <circle cx="34" cy="10" r="10" fill={BLUE} />
      <circle cx="22" cy="10" r="10" fill={GREEN} />
    </svg>
  )
}
