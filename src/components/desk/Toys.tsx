'use client'

import { animate, useReducedMotion } from 'motion/react'
import { useRef, useState, type CSSProperties, type MouseEvent, type RefObject } from 'react'
import { useSound } from '@/components/sound/SoundProvider'
import { BallFace } from './DecorFaces'

/**
 * Two things on the desk that do nothing useful — on purpose. Knock the mug
 * over, flick the paper ball. They are real buttons (keyboard works too), but
 * they carry no content and are left out of the desk index.
 */

interface ToyProps {
  readonly style: CSSProperties
  readonly tallHidden: boolean | undefined
}

/* ---------- The mug ---------- */

/** The coffee, spreading across the wood. Irregular, glossy at its edge. */
function Puddle() {
  return (
    <svg viewBox="0 0 220 150" className="size-full overflow-visible" aria-hidden="true">
      <path
        d="M18 30 C 30 8, 70 4, 96 18 C 118 30, 150 14, 178 30 C 206 46, 214 78, 196 98 C 182 114, 196 134, 168 142 C 136 150, 118 128, 92 136 C 62 146, 30 134, 22 108 C 14 84, 2 52, 18 30 Z"
        fill="#2a1409"
        fillOpacity="0.88"
      />
      <circle cx="208" cy="122" r="6" fill="#2a1409" fillOpacity="0.85" />
      <circle cx="40" cy="146" r="4" fill="#2a1409" fillOpacity="0.8" />
      <path
        d="M40 30 C 70 18, 100 30, 128 26"
        stroke="#f3d7ae"
        strokeOpacity="0.28"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M150 128 C 170 126, 184 112, 188 98"
        stroke="#f3d7ae"
        strokeOpacity="0.16"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function MugToy({ style, tallHidden }: ToyProps) {
  const { play } = useSound()
  const [spilled, setSpilled] = useState(false)

  return (
    <div
      className="desk-item desk-decor desk-toy"
      data-spilled={spilled || undefined}
      data-tall-hidden={tallHidden}
      style={style}
    >
      {/* Under the mug, outside its shadow filter: coffee casts no shadow. */}
      <span className="mug-puddle pointer-events-none absolute top-[2.6em] left-[3.2em] block h-[10em] w-[14.5em]">
        <Puddle />
      </span>
      <div className="desk-face">
        {/* Standing: seen from above, the coffee at the top. */}
        <div className="mug-upright absolute inset-0">
          <span className="absolute top-[1.9em] right-0 h-[2.6em] w-[1.9em] rounded-r-full border-[0.55em] border-l-0 border-[#e8dcc6]" />
          <span className="absolute top-0 left-0 size-[6.5em] rounded-full bg-[radial-gradient(circle_at_38%_32%,#fbf4e6,#e2d4ba_60%,#b9a68a)]">
            <span className="absolute inset-[0.65em] rounded-full bg-[radial-gradient(circle_at_42%_38%,#5a3520,#2d180d_55%,#1b0e07)] shadow-[inset_0_0.3em_0.5em_rgb(0_0_0/55%)]">
              <span className="absolute top-[0.9em] left-[1.1em] h-[0.5em] w-[1.6em] rotate-[-30deg] rounded-full bg-[#f3d7ae]/25" />
            </span>
          </span>
          <span className="steam absolute top-[0.4em] left-[2em] block h-[3em] w-[1em] rounded-full bg-[radial-gradient(ellipse,rgb(255_245_230/22%),transparent_70%)]" />
          <span className="steam steam-2 absolute top-[1em] left-[3.2em] block h-[2.6em] w-[0.9em] rounded-full bg-[radial-gradient(ellipse,rgb(255_245_230/18%),transparent_70%)]" />
        </div>
        {/* Knocked over: the side of the mug, its open mouth toward the puddle. */}
        <div className="mug-tipped absolute top-[0.6em] left-[0.4em] h-[5.2em] w-[7.4em]">
          <span className="absolute top-[0.2em] left-[1.6em] h-[2.2em] w-[2.6em] rounded-t-full border-[0.55em] border-b-0 border-[#e2d4ba]" />
          <span className="absolute top-[1.4em] left-0 h-[4.2em] w-[6.4em] rounded-l-[0.9em] bg-[linear-gradient(180deg,#b9a68a,#fbf4e6_38%,#e2d4ba_70%,#a8957a)]" />
          <span className="absolute top-[1.4em] left-[5.6em] h-[4.2em] w-[1.7em] rounded-[50%] bg-[radial-gradient(ellipse_at_40%_50%,#1b0e07,#3a2213)] ring-[0.3em] ring-[#efe4d0]" />
        </div>
      </div>
      <button
        type="button"
        aria-label={spilled ? 'Stand the mug back up' : 'Knock the coffee over'}
        onClick={() => {
          play(spilled ? 'tick' : 'spill')
          setSpilled((value) => !value)
        }}
        className="absolute inset-0 cursor-pointer rounded-full"
      />
    </div>
  )
}

/* ---------- The paper ball ---------- */

export function BallToy({
  style,
  tallHidden,
  stageRef,
}: ToyProps & { stageRef: RefObject<HTMLDivElement | null> }) {
  const reduced = useReducedMotion()
  const { play } = useSound()
  const roller = useRef<HTMLDivElement | null>(null)
  const offset = useRef({ x: 0, y: 0, rotate: 0 })

  /** Roll away from where it was pushed — or anywhere, from the keyboard. */
  const flick = (event: MouseEvent<HTMLButtonElement>) => {
    const el = roller.current
    const stage = stageRef.current
    if (el === null || stage === null) {
      return
    }
    const box = el.getBoundingClientRect()
    const cx = box.left + box.width / 2
    const cy = box.top + box.height / 2
    const fromPointer = event.clientX !== 0 || event.clientY !== 0
    let dx = fromPointer ? cx - event.clientX : Math.random() - 0.5
    let dy = fromPointer ? cy - event.clientY : Math.random() - 0.5
    const norm = Math.hypot(dx, dy) || 1
    dx /= norm
    dy /= norm
    const distance = box.width * (2.4 + Math.random() * 1.4)

    /* Stay on the desk: walk the roll, bouncing off the edges like a ball
       off a skirting board, and record each bounce as a keyframe. */
    const area = stage.getBoundingClientRect()
    const margin = box.width * 0.6
    const minX = area.left + margin - cx
    const maxX = area.right - margin - cx
    const minY = area.top + margin - cy
    const maxY = area.bottom - margin - cy
    let px = offset.current.x
    let py = offset.current.y
    let left = distance
    const xs = [px]
    const ys = [py]
    const lengths = [0]
    for (let bounce = 0; bounce < 3 && left > 1; bounce += 1) {
      const relX = px - offset.current.x
      const relY = py - offset.current.y
      let step = left
      if (dx > 0) step = Math.min(step, (maxX - relX) / dx)
      if (dx < 0) step = Math.min(step, (minX - relX) / dx)
      if (dy > 0) step = Math.min(step, (maxY - relY) / dy)
      if (dy < 0) step = Math.min(step, (minY - relY) / dy)
      step = Math.max(0, step)
      px += dx * step
      py += dy * step
      left -= step
      xs.push(px)
      ys.push(py)
      lengths.push(step)
      /* Which wall was hit: flip that component, lose a little speed. */
      const atX = px - offset.current.x
      const atY = py - offset.current.y
      if (atX >= maxX - 0.5 || atX <= minX + 0.5) dx = -dx
      if (atY >= maxY - 0.5 || atY <= minY + 0.5) dy = -dy
      left *= 0.7
    }
    const travel = lengths.reduce((sum, length) => sum + length, 0)
    let elapsed = 0
    const times = lengths.map((length) => {
      elapsed += length
      return travel === 0 ? 0 : elapsed / travel
    })

    /* A ball rolls one circumference per turn; the spin follows the first push. */
    const startRotate = offset.current.rotate
    const spin = Math.sign((xs[1] ?? px) - (xs[0] ?? px)) || 1
    const endRotate = startRotate + (spin * travel * 360) / (Math.PI * box.width)
    const rotations = times.map((time) => startRotate + (endRotate - startRotate) * time)
    offset.current = { x: px, y: py, rotate: endRotate }
    play('roll')
    void animate(
      el,
      { x: xs, y: ys, rotate: rotations },
      reduced ? { duration: 0 } : { duration: 0.8 + travel / 650, times, ease: 'easeOut' },
    )
  }

  return (
    <div className="desk-item desk-decor desk-toy" data-tall-hidden={tallHidden} style={style}>
      <div ref={roller} className="absolute inset-0 will-change-transform">
        <div className="desk-face">
          <BallFace />
        </div>
        <button
          type="button"
          aria-label="Flick the paper ball"
          onClick={flick}
          className="absolute inset-0 cursor-pointer rounded-full"
        />
      </div>
    </div>
  )
}
