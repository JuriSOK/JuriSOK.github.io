'use client'

import { motion, useAnimate, useReducedMotion } from 'motion/react'
import { useCallback, useEffect, useLayoutEffect, useRef, type ReactNode } from 'react'
import { useSound } from '@/components/sound/SoundProvider'
import { Icon } from '@/components/ui/Icon'

interface InspectorProps {
  readonly label: string
  /** The object on the desk: where the view flies out of, and back into. */
  readonly getSource: () => HTMLElement | null
  /** Its resting angle on the desk, in degrees. */
  readonly sourceRotation: number
  readonly onClosed: () => void
  /** Increment to ask the inspector to close itself (animated). */
  readonly closeSignal: number
  readonly children: ReactNode
}

/**
 * Picking an object up.
 *
 * The view is laid out at its final place first, then moved — with a spring —
 * from the object's exact spot and angle on the desk: the object seems to be
 * lifted off the wood and brought close. Closing plays it in reverse, landing
 * on wherever the object lies now (it may have been dragged). The desk behind
 * dims and softens.
 *
 * A dialog: labelled, Escape and the backdrop close it, Tab stays inside, and
 * focus returns to the object.
 */
export function Inspector({
  label,
  getSource,
  sourceRotation,
  onClosed,
  closeSignal,
  children,
}: InspectorProps) {
  const reduced = useReducedMotion()
  const { play } = useSound()
  const [scope, animate] = useAnimate<HTMLDivElement>()
  const backdrop = useRef<HTMLDivElement | null>(null)
  const dialog = useRef<HTMLDivElement | null>(null)
  const closing = useRef(false)

  /** Offset and scale that put the view exactly over the object on the desk. */
  const fromSource = useCallback(() => {
    const panel = scope.current
    const source = getSource()
    if (panel === null || source === null) {
      return null
    }
    const to = panel.getBoundingClientRect()
    const from = source.getBoundingClientRect()
    return {
      x: from.left + from.width / 2 - (to.left + to.width / 2),
      y: from.top + from.height / 2 - (to.top + to.height / 2),
      scale: Math.max(0.12, Math.min(from.width / to.width, from.height / to.height)),
    }
  }, [scope, getSource])

  useLayoutEffect(() => {
    const panel = scope.current
    if (panel === null) {
      return
    }
    const start = fromSource()
    if (reduced || start === null) {
      void animate(panel, { opacity: [0, 1] }, { duration: 0.2 })
      return
    }
    void animate(
      panel,
      {
        x: [start.x, 0],
        y: [start.y, 0],
        scale: [start.scale, 1],
        rotate: [sourceRotation, 0],
        opacity: [0.4, 1],
      },
      { type: 'spring', stiffness: 170, damping: 23, mass: 0.9 },
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps -- play the entrance once
  }, [])

  const close = useCallback(async () => {
    if (closing.current) {
      return
    }
    closing.current = true
    play('paper')
    const panel = scope.current
    const end = fromSource()
    if (backdrop.current !== null) {
      void animate(backdrop.current, { opacity: 0 }, { duration: 0.35 })
    }
    if (panel !== null) {
      if (reduced || end === null) {
        await animate(panel, { opacity: 0 }, { duration: 0.15 })
      } else {
        // Measure against the untransformed layout, then fly back.
        await animate(
          panel,
          { x: end.x, y: end.y, scale: end.scale, rotate: sourceRotation, opacity: 0.6 },
          { type: 'spring', stiffness: 260, damping: 30 },
        )
      }
    }
    onClosed()
  }, [animate, fromSource, onClosed, play, reduced, scope, sourceRotation])

  useEffect(() => {
    if (closeSignal > 0) {
      void close()
    }
  }, [closeSignal, close])

  /* Escape, focus trap, focus on open. */
  useEffect(() => {
    const panel = scope.current
    panel
      ?.querySelector<HTMLElement>('[data-autofocus], button, a[href], textarea, input')
      ?.focus({ preventScroll: true })
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        void close()
        return
      }
      if (event.key !== 'Tab' || panel === null) {
        return
      }
      const focusable = [
        ...panel.querySelectorAll<HTMLElement>('button, a[href], textarea, input'),
      ].filter((element) => !element.hasAttribute('disabled') && element.tabIndex !== -1)
      const first = focusable[0]
      const last = focusable.at(-1)
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last?.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first?.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    const scrollY = window.scrollY
    document.documentElement.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.documentElement.style.overflow = ''
      window.scrollTo({ top: scrollY })
    }
  }, [close, scope])

  return (
    <div
      ref={dialog}
      role="dialog"
      aria-modal="true"
      aria-label={label}
      className="fixed inset-0 z-[120] overflow-y-auto"
    >
      <motion.div
        ref={backdrop}
        aria-hidden="true"
        className="fixed inset-0 bg-[radial-gradient(ellipse_at_center,rgb(30_18_10/55%),rgb(8_5_3/88%))] backdrop-blur-[6px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        onClick={() => void close()}
      />
      <div className="pointer-events-none relative flex min-h-full items-center justify-center px-3 pt-20 pb-24 sm:px-6">
        <div ref={scope} className="pointer-events-auto relative will-change-transform">
          {children}
        </div>
      </div>
      <button
        type="button"
        onClick={() => void close()}
        className="font-hand fixed top-4 right-4 z-10 inline-flex items-center gap-2 rounded-full bg-night/80 px-4 py-2 text-[1.35rem] leading-none text-cream ring-1 ring-cream/20 backdrop-blur transition hover:bg-night hover:text-amber"
      >
        put it back
        <Icon name="close" size={16} />
      </button>
    </div>
  )
}
