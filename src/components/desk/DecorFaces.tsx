/**
 * Set dressing: the traces of someone who actually works at this desk.
 * Pure drawings — never interactive, never announced.
 */

/** A knot in the walnut, with the grain bending around it. */
export function KnotFace() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 130 70"
      className="absolute inset-0 size-full mix-blend-multiply"
    >
      {[0, 1, 2, 3, 4].map((ring) => (
        <ellipse
          key={ring}
          cx="62"
          cy="35"
          rx={10 + ring * 11}
          ry={5 + ring * 6}
          fill="none"
          stroke="#2a170c"
          strokeOpacity={0.5 - ring * 0.08}
          strokeWidth="1.6"
        />
      ))}
      <ellipse cx="62" cy="35" rx="8" ry="4" fill="#2a170c" fillOpacity="0.6" />
    </svg>
  )
}

/** Where wrists rest in front of the keyboard: the varnish is worn, the wood paler, a few scratches. */
export function WearFace() {
  return (
    <svg aria-hidden="true" viewBox="0 0 320 120" className="absolute inset-0 size-full">
      <defs>
        <radialGradient id="wear" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#c99a6a" stopOpacity="0.16" />
          <stop offset="1" stopColor="#c99a6a" stopOpacity="0" />
        </radialGradient>
      </defs>
      <ellipse cx="160" cy="60" rx="160" ry="60" fill="url(#wear)" />
      <g stroke="#e8c79c" strokeOpacity="0.16" strokeWidth="1" strokeLinecap="round">
        <path d="M60 52 L 148 40" />
        <path d="M110 78 L 196 70" />
        <path d="M200 44 L 262 52" />
        <path d="M150 90 L 172 88" />
      </g>
    </svg>
  )
}

/** A coffee ring, left by a mug that is no longer there. */
export function RingFace() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 96 96"
      className="absolute inset-0 size-full mix-blend-multiply"
    >
      <circle
        cx="48"
        cy="48"
        r="40"
        fill="none"
        stroke="#2b160a"
        strokeOpacity="0.45"
        strokeWidth="3.5"
        strokeDasharray="200 18 30 4"
      />
      <circle
        cx="50"
        cy="47"
        r="37"
        fill="none"
        stroke="#2b160a"
        strokeOpacity="0.18"
        strokeWidth="6"
      />
    </svg>
  )
}

/** A yellow pencil, sharpened a few times too many. */
export function PencilFace() {
  return (
    <svg aria-hidden="true" viewBox="0 0 210 16" className="absolute inset-0 size-full">
      <defs>
        <linearGradient id="pencil-body" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f6d36a" />
          <stop offset="0.45" stopColor="#e7b53a" />
          <stop offset="1" stopColor="#b9851d" />
        </linearGradient>
      </defs>
      <rect x="0" y="2" width="16" height="12" rx="3" fill="#e79a9a" />
      <rect x="14" y="1.5" width="14" height="13" fill="#b8b1a3" />
      <path d="M17 1.5 v13 M21 1.5 v13 M25 1.5 v13" stroke="#8a8476" strokeWidth="1" />
      <rect x="28" y="2" width="150" height="12" fill="url(#pencil-body)" />
      <path d="M28 8 H178" stroke="#fff3c4" strokeOpacity="0.5" strokeWidth="1" />
      <path d="M178 2 L 202 7 L 202 9 L 178 14 Z" fill="#e6c89b" />
      <path d="M196 5.8 L 208 8 L 196 10.2 Z" fill="#3a3530" />
    </svg>
  )
}

/** Two paper clips, one bent open. */
export function ClipsFace() {
  const clip = 'M10 30 V8 a6 6 0 0 1 12 0 v26 a9 9 0 0 1 -18 0 V12'
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 56 46"
      className="absolute inset-0 size-full"
      fill="none"
      stroke="#c9cdd2"
      strokeWidth="2"
      strokeLinecap="round"
    >
      <path d={clip} transform="translate(2 2) rotate(-12 16 22)" />
      <path d="M36 40 V14 a6 6 0 0 1 12 0 v18 l -8 6" transform="rotate(18 42 26)" />
    </svg>
  )
}

/** An eraser, grey at the end that does the work. */
export function EraserFace() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 overflow-hidden rounded-[0.35em] bg-[linear-gradient(90deg,#f2b8b5_0_62%,#f7efe6_62%)] shadow-[inset_0_-0.15em_0_rgb(0_0_0/18%)]"
    >
      <span className="absolute inset-y-0 left-0 w-[0.9em] bg-[linear-gradient(90deg,#9a8a86,transparent)] opacity-60" />
    </div>
  )
}

/** A crumpled draft that missed the bin. */
export function BallFace() {
  return (
    <svg aria-hidden="true" viewBox="0 0 74 70" className="absolute inset-0 size-full">
      <path d="M10 30 L 22 8 L 44 4 L 64 16 L 70 38 L 58 62 L 32 66 L 12 54 Z" fill="#ece3d2" />
      <g fill="#d5c9b2">
        <path d="M22 8 L 36 28 L 10 30 Z" />
        <path d="M64 16 L 50 34 L 70 38 Z" />
        <path d="M32 66 L 40 44 L 58 62 Z" />
      </g>
      <g fill="#fbf6ec">
        <path d="M44 4 L 36 28 L 50 34 L 64 16 Z" />
        <path d="M12 54 L 26 40 L 40 44 L 32 66 Z" />
      </g>
      <g stroke="#b9ab92" strokeWidth="0.8" fill="none">
        <path d="M36 28 L 50 34 L 40 44 L 26 40 Z" />
        <path d="M18 22 L 30 18 M52 48 L 62 44" stroke="#8a9ab8" strokeOpacity="0.5" />
      </g>
    </svg>
  )
}
