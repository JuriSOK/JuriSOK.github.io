import styles from './JazzCafeBackground.module.css'

/**
 * Animated pixel-art jazz café scene, behind the whole application.
 *
 * Drawn from scratch as an inline SVG of plain rectangles — no external
 * artwork, no GIF, no video, no canvas, no animation library. Every rectangle
 * snaps to a 4-unit grid and `shape-rendering="crispEdges"` keeps the pixel
 * look at any scale.
 *
 * The layer is fixed, decorative and inert: `aria-hidden`, `pointer-events:
 * none`, no tab stop, and it never scrolls with the content.
 *
 * Animation is CSS-only and limited to `transform` and `opacity`. Rain, steam,
 * lamp flicker and light motes all stop under `prefers-reduced-motion`, which
 * leaves a complete static scene rather than an empty one.
 */
export function JazzCafeBackground() {
  return (
    <div className={styles.layer} aria-hidden="true">
      <svg
        className={styles.scene}
        viewBox="0 0 320 180"
        preserveAspectRatio="xMidYMid slice"
        shapeRendering="crispEdges"
        focusable="false"
      >
        <defs>
          {/* Warm pools of light falling from the hanging lamps. */}
          <radialGradient id="lampGlow" cx="50%" cy="0%" r="72%">
            <stop offset="0%" stopColor="#c48a5a" stopOpacity="0.5" />
            <stop offset="55%" stopColor="#a66a3f" stopOpacity="0.16" />
            <stop offset="100%" stopColor="#a66a3f" stopOpacity="0" />
          </radialGradient>

          {/* Glow around the distant stage. */}
          <radialGradient id="stageGlow" cx="50%" cy="55%" r="60%">
            <stop offset="0%" stopColor="#d6a77a" stopOpacity="0.34" />
            <stop offset="100%" stopColor="#6e3b2d" stopOpacity="0" />
          </radialGradient>

          {/* Night sky seen through the window: cold enough to read as outside,
              warm enough to stay inside the espresso palette. */}
          <linearGradient id="night" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#241a15" />
            <stop offset="100%" stopColor="#14100d" />
          </linearGradient>

          {/* One rain column, repeated and offset. */}
          <g id="raindrop">
            <rect width="1" height="4" fill="#cbb8a0" opacity="0.5" />
          </g>
        </defs>

        {/* ---- Room ---- */}
        <rect width="320" height="180" fill="#1e1612" />
        <rect y="126" width="320" height="54" fill="#2a201b" />
        <rect y="124" width="320" height="2" fill="#3a2b24" />

        {/* Wainscot panelling */}
        {Array.from({ length: 16 }, (_, index) => (
          <rect key={index} x={index * 20} y="96" width="1" height="28" fill="#3a2b24" />
        ))}
        <rect y="94" width="320" height="2" fill="#3a2b24" />

        {/* ---- Window, rain outside ---- */}
        <g>
          <rect x="18" y="26" width="86" height="62" fill="#14100d" />
          <rect x="18" y="26" width="86" height="62" fill="url(#night)" />
          {/* Distant street lights */}
          <rect x="30" y="60" width="2" height="2" fill="#a66a3f" opacity="0.55" />
          <rect x="58" y="52" width="2" height="2" fill="#c48a5a" opacity="0.4" />
          <rect x="86" y="66" width="2" height="2" fill="#a66a3f" opacity="0.45" />

          {/* Rain: four columns, each with its own speed and delay. */}
          <g className={styles.rain}>
            {Array.from({ length: 22 }, (_, index) => (
              <use
                key={index}
                href="#raindrop"
                x={21 + ((index * 17) % 80)}
                y={-6 - ((index * 23) % 60)}
                className={styles[`rainDrop${(index % 4) + 1}` as keyof typeof styles]}
              />
            ))}
          </g>

          {/* Frame and mullions, drawn over the rain. */}
          <rect x="18" y="26" width="86" height="3" fill="#3a2b24" />
          <rect x="18" y="85" width="86" height="3" fill="#3a2b24" />
          <rect x="18" y="26" width="3" height="62" fill="#3a2b24" />
          <rect x="101" y="26" width="3" height="62" fill="#3a2b24" />
          <rect x="59" y="26" width="2" height="62" fill="#3a2b24" />
          <rect x="18" y="55" width="86" height="2" fill="#3a2b24" />
        </g>

        {/* ---- Distant stage with an upright piano silhouette ---- */}
        <g>
          <ellipse cx="248" cy="104" rx="52" ry="34" fill="url(#stageGlow)" className={styles.stage} />
          <rect x="214" y="86" width="60" height="4" fill="#3a2b24" />
          {/* Piano body */}
          <rect x="226" y="90" width="40" height="26" fill="#14100d" />
          <rect x="226" y="96" width="40" height="3" fill="#3a2b24" />
          {/* Keyboard */}
          <rect x="230" y="103" width="32" height="4" fill="#cbb8a0" opacity="0.65" />
          {Array.from({ length: 8 }, (_, index) => (
            <rect key={index} x={232 + index * 4} y="103" width="1" height="4" fill="#14100d" />
          ))}
          {/* Stool */}
          <rect x="274" y="106" width="10" height="3" fill="#3a2b24" />
          <rect x="276" y="109" width="2" height="7" fill="#3a2b24" />
          <rect x="281" y="109" width="2" height="7" fill="#3a2b24" />
        </g>

        {/* ---- Counter, right side ---- */}
        <g>
          <rect x="286" y="112" width="34" height="4" fill="#4a382e" />
          <rect x="288" y="116" width="30" height="12" fill="#3a2b24" />
          {/* Bottles on a shelf */}
          <rect x="292" y="72" width="4" height="12" fill="#6e3b2d" />
          <rect x="300" y="68" width="4" height="16" fill="#a66a3f" opacity="0.8" />
          <rect x="308" y="74" width="4" height="10" fill="#6e3b2d" />
          <rect x="288" y="84" width="30" height="2" fill="#3a2b24" />
        </g>

        {/* ---- Table, cup and rising steam ---- */}
        <g>
          <rect x="128" y="118" width="54" height="4" fill="#4a382e" />
          <rect x="152" y="122" width="6" height="18" fill="#3a2b24" />
          <rect x="142" y="140" width="26" height="3" fill="#3a2b24" />

          {/* Cup */}
          <rect x="144" y="110" width="10" height="8" fill="#f3e6d3" opacity="0.85" />
          <rect x="154" y="112" width="3" height="4" fill="#f3e6d3" opacity="0.7" />
          <rect x="145" y="110" width="8" height="2" fill="#3a2b24" opacity="0.5" />

          <g className={styles.steam}>
            <rect x="146" y="100" width="2" height="6" fill="#f3e6d3" className={styles.steam1} />
            <rect x="150" y="98" width="2" height="7" fill="#f3e6d3" className={styles.steam2} />
          </g>
        </g>

        {/* ---- Chairs ---- */}
        <g fill="#3a2b24">
          <rect x="112" y="112" width="4" height="26" />
          <rect x="112" y="112" width="12" height="3" />
          <rect x="192" y="112" width="4" height="26" />
          <rect x="186" y="112" width="12" height="3" />
        </g>

        {/* ---- Hanging lamps ---- */}
        <g className={styles.lamps}>
          <g className={styles.lampA}>
            <rect x="151" y="0" width="2" height="28" fill="#3a2b24" />
            <rect x="144" y="28" width="16" height="6" fill="#6e3b2d" />
            <rect x="147" y="34" width="10" height="3" fill="#d6a77a" />
            <ellipse cx="152" cy="60" rx="46" ry="46" fill="url(#lampGlow)" />
          </g>

          <g className={styles.lampB}>
            <rect x="243" y="0" width="2" height="18" fill="#3a2b24" />
            <rect x="237" y="18" width="14" height="5" fill="#6e3b2d" />
            <rect x="240" y="23" width="8" height="3" fill="#d6a77a" />
            <ellipse cx="244" cy="48" rx="38" ry="38" fill="url(#lampGlow)" />
          </g>
        </g>

        {/* ---- Warm light motes ---- */}
        <g className={styles.motes}>
          {Array.from({ length: 9 }, (_, index) => (
            <rect
              key={index}
              x={40 + ((index * 37) % 250)}
              y={40 + ((index * 29) % 70)}
              width="2"
              height="2"
              fill="#d6a77a"
              className={styles[`mote${(index % 3) + 1}` as keyof typeof styles]}
            />
          ))}
        </g>
      </svg>

      {/* Espresso veils between the scene and the vCard: the layout must stay
          the visual focus, and text must never fight the artwork. */}
      <div className={styles.veil} />
      <div className={styles.vignette} />
    </div>
  )
}
