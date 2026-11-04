/**
 * The desk lamp, seen from straight above.
 *
 * From above you never see the bulb: you see the heavy round base, the two
 * arm segments with their springs, and the back of the shade — a tilted cone
 * whose opening points down-right, at the pool of light on the wood. Only the
 * rim of the opening shows its lit lining. Coordinates are the lamp's own
 * units (420 × 380), matching `deskItems` and `SHADE` in content/desk.ts.
 */

/** Shade centre and the direction it points (degrees), in lamp units. */
const SHADE = { x: 300, y: 265, angle: 45 }
const BASE = { x: 92, y: 92 }
const ELBOW = { x: 152, y: 262 }
/** Where the arm meets the shade: its narrow end. */
const PIVOT = {
  x: SHADE.x - 62 * Math.cos((SHADE.angle * Math.PI) / 180),
  y: SHADE.y - 62 * Math.sin((SHADE.angle * Math.PI) / 180),
}

/** A rod with a spring running alongside it, offset by `side` units. */
function Arm({
  from,
  to,
  side,
}: {
  from: { x: number; y: number }
  to: { x: number; y: number }
  side: number
}) {
  const dx = to.x - from.x
  const dy = to.y - from.y
  const length = Math.hypot(dx, dy)
  const nx = (-dy / length) * side
  const ny = (dx / length) * side
  return (
    <g>
      <line
        x1={from.x}
        y1={from.y}
        x2={to.x}
        y2={to.y}
        stroke="url(#lamp-rod)"
        strokeWidth="11"
        strokeLinecap="round"
      />
      <line
        x1={from.x}
        y1={from.y}
        x2={to.x}
        y2={to.y}
        stroke="rgb(255 236 200 / 35%)"
        strokeWidth="2"
        strokeLinecap="round"
        transform="translate(-2 -2)"
      />
      <line
        x1={from.x + nx}
        y1={from.y + ny}
        x2={from.x + nx + dx * 0.55}
        y2={from.y + ny + dy * 0.55}
        stroke="#9c8a6e"
        strokeWidth="4"
        strokeDasharray="1.6 1.4"
      />
    </g>
  )
}

export function LampFace() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 420 380"
      className="absolute inset-0 size-full overflow-visible"
    >
      <defs>
        <radialGradient id="lamp-base" cx="0.42" cy="0.36" r="0.7">
          <stop offset="0" stopColor="#6d5a44" />
          <stop offset="0.55" stopColor="#3a2e22" />
          <stop offset="1" stopColor="#1d1711" />
        </radialGradient>
        <linearGradient id="lamp-rod" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#c9b089" />
          <stop offset="0.5" stopColor="#8a7454" />
          <stop offset="1" stopColor="#5a4a35" />
        </linearGradient>
        {/* Cylindrical shading across the shade: dark flanks, a soft highlight. */}
        <linearGradient
          id="lamp-shade"
          x1="0"
          y1="-1"
          x2="0"
          y2="1"
          gradientUnits="objectBoundingBox"
        >
          <stop offset="0" stopColor="#152019" />
          <stop offset="0.3" stopColor="#2f4a3a" />
          <stop offset="0.42" stopColor="#5d7c66" />
          <stop offset="0.55" stopColor="#2f4a3a" />
          <stop offset="1" stopColor="#101813" />
        </linearGradient>
        <radialGradient id="lamp-lining" cx="0.35" cy="0.5" r="0.7">
          <stop offset="0" stopColor="#fff4dc" />
          <stop offset="0.6" stopColor="#f6cf8e" />
          <stop offset="1" stopColor="#b88a4c" />
        </radialGradient>
      </defs>

      {/* Base: weighted disc, a felt ring, the switch. */}
      <circle cx={BASE.x} cy={BASE.y} r="74" fill="url(#lamp-base)" />
      <circle
        cx={BASE.x}
        cy={BASE.y}
        r="66"
        fill="none"
        stroke="rgb(255 230 190 / 12%)"
        strokeWidth="2"
      />
      <circle
        cx={BASE.x + 34}
        cy={BASE.y + 30}
        r="9"
        fill="#1a140f"
        stroke="#a48e6c"
        strokeWidth="2"
      />

      <Arm from={BASE} to={ELBOW} side={10} />
      <Arm from={ELBOW} to={PIVOT} side={-10} />
      {/* Joints. */}
      <circle cx={BASE.x} cy={BASE.y} r="13" fill="#b49a72" stroke="#5a4a35" strokeWidth="3" />
      <circle cx={ELBOW.x} cy={ELBOW.y} r="10" fill="#b49a72" stroke="#5a4a35" strokeWidth="3" />

      {/* The shade: a cone seen from above, opening toward the pool of light. */}
      <g transform={`translate(${SHADE.x} ${SHADE.y}) rotate(${SHADE.angle})`}>
        <path
          d="M -64 -21 L 56 -57 A 15 57 0 0 1 56 57 L -64 21 A 9 21 0 0 1 -64 -21 Z"
          fill="url(#lamp-shade)"
        />
        <path d="M -64 -21 L 56 -57" stroke="rgb(255 255 255 / 10%)" strokeWidth="2" />
        <ellipse cx="-64" cy="0" rx="7" ry="20" fill="#0f1712" />
        <circle cx="-64" cy="0" r="7" fill="#b49a72" stroke="#5a4a35" strokeWidth="2.5" />
        {/* The rim: the only place the lit lining shows. Dim when off. */}
        <ellipse cx="57" cy="0" rx="14" ry="56" fill="#3a3326" />
        <ellipse className="lamp-lining" cx="58" cy="0" rx="11" ry="51" fill="url(#lamp-lining)" />
      </g>
    </svg>
  )
}

/** Where the rim of the shade sits, in em (16 lamp units per em). */
export const LAMP_RIM_EM = {
  x: (SHADE.x + 57 * Math.cos((SHADE.angle * Math.PI) / 180)) / 16,
  y: (SHADE.y + 57 * Math.sin((SHADE.angle * Math.PI) / 180)) / 16,
}
