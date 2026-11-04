'use client'

import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from 'react'
import { deskItems, deskLayouts, type DeskItem, type DeskItemId } from '@/content/desk'
import { profile } from '@/content/profile'
import { site, visitorNotes } from '@/content/site'
import { lightingFor } from '@/lib/desk'
import { useSound } from '@/components/sound/SoundProvider'
import { Icon } from '@/components/ui/Icon'
import {
  BadgeFace,
  CardsFace,
  ClockFace,
  IndexFace,
  IntroFace,
  KeyboardFace,
  NotebookFace,
  PadFace,
  PolaroidsFace,
  PostcardFace,
  ReceiptFace,
  SlipFace,
  TradingFace,
} from './faces'
import { ClipsFace, EraserFace, KnotFace, PencilFace, RingFace, WearFace } from './DecorFaces'
import { Inspector } from './Inspector'
import { BallToy, MugToy } from './Toys'
import { LAMP_RIM_EM, LampFace } from './LampFace'
import { LaptopFace, RadioFace } from './LiveFaces'
import { BadgeView, CardsView, NotebookView } from './views/PeopleViews'
import {
  KeyboardView,
  PadView,
  PolaroidsView,
  PostcardView,
  type VisitorNote,
} from './views/LifeViews'
import { IndexView, ReceiptView, SlipView, TradingView } from './views/WorkViews'

const faces: Record<DeskItemId, () => ReactNode> = {
  lamp: LampFace,
  intro: IntroFace,
  notebook: NotebookFace,
  badge: BadgeFace,
  cards: CardsFace,
  receipt: ReceiptFace,
  index: IndexFace,
  slip: SlipFace,
  trading: TradingFace,
  keyboard: KeyboardFace,
  polaroids: PolaroidsFace,
  postcard: PostcardFace,
  laptop: LaptopFace,
  radio: RadioFace,
  clock: ClockFace,
  pad: PadFace,
  mug: () => null,
  ring: RingFace,
  pencil: PencilFace,
  clips: ClipsFace,
  eraser: EraserFace,
  ball: () => null,
  knot: KnotFace,
  wear: WearFace,
}

/** CSS variables placing an object in both layouts; the stylesheet picks one. */
function placementVars(item: DeskItem): CSSProperties {
  const wide = deskLayouts.wide.place[item.id]
  const tall = deskLayouts.tall.place[item.id]
  const lw = lightingFor(item, wide, deskLayouts.wide)
  const lt = lightingFor(item, tall, deskLayouts.tall)
  return {
    '--w': item.w,
    '--h': item.h,
    '--xw': wide.x,
    '--yw': wide.y,
    '--rw': wide.r,
    '--sw': wide.s ?? 1,
    '--bw': lw.b,
    '--sxw': lw.sx,
    '--syw': lw.sy,
    '--blw': lw.blur,
    '--xt': tall.x,
    '--yt': tall.y,
    '--rt': tall.r,
    '--st': tall.s ?? 1,
    '--bt': lt.b,
    '--sxt': lt.sx,
    '--syt': lt.sy,
    '--blt': lt.blur,
  } as CSSProperties
}

const lightVars = {
  '--lxw': deskLayouts.wide.light.x,
  '--lyw': deskLayouts.wide.light.y,
  '--lrw': deskLayouts.wide.light.radius,
  '--lxt': deskLayouts.tall.light.x,
  '--lyt': deskLayouts.tall.light.y,
  '--lrt': deskLayouts.tall.light.radius,
} as CSSProperties

function parisTime(): string {
  return new Intl.DateTimeFormat('en-GB', {
    timeZone: profile.timezone,
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date())
}

function loadNotes(): VisitorNote[] {
  try {
    const parsed: unknown = JSON.parse(localStorage.getItem(visitorNotes.storageKey) ?? '[]')
    return Array.isArray(parsed) ? (parsed as VisitorNote[]) : []
  } catch {
    return []
  }
}

/**
 * Arnaud's desk, 2 a.m., seen from above.
 *
 * The page is a single scene. Objects lie where they were left; the lamp
 * lights the middle of the desk and lets the corners sink into the night.
 * Every object can be picked up (click, tap, Enter) — it flies into your hands
 * and opens — and, with a mouse, pushed around the desk.
 */
export function Desk() {
  const reduced = useReducedMotion()
  const { inside, enter, play } = useSound()
  const stageRef = useRef<HTMLDivElement | null>(null)
  const itemRefs = useRef<Partial<Record<string, HTMLDivElement | null>>>({})
  const buttonRefs = useRef<Partial<Record<string, HTMLButtonElement | null>>>({})
  const dragged = useRef(false)
  const zCounter = useRef(100)

  const [lamp, setLamp] = useState(false)
  const [hints, setHints] = useState(false)
  const [open, setOpen] = useState<DeskItemId | null>(null)
  const [closeSignal, setCloseSignal] = useState(0)
  const [z, setZ] = useState<Record<string, number>>({})
  const [canDrag, setCanDrag] = useState(false)
  const [time, setTime] = useState<string | null>(null)
  const [notes, setNotes] = useState<VisitorNote[]>([])
  const [indexOpen, setIndexOpen] = useState(false)
  /* Set once the session says the lamp was already on: no gate, no flicker. */
  const [remembered, setRemembered] = useState(false)

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- client-only: pointer, storage, clock
    setCanDrag(matchMedia('(pointer: fine) and (min-width: 768px)').matches)
    setNotes(loadNotes())
    /* Within a visit, the lamp stays as it was left: a reload is not a new night. */
    try {
      if (sessionStorage.getItem('desk:lamp') === 'on') {
        setRemembered(true)
        setLamp(true)
      }
    } catch {
      /* Storage unavailable: start in the dark. */
    }
    const tick = () => setTime(parisTime())
    tick()
    const timer = window.setInterval(tick, 30_000)
    return () => window.clearInterval(timer)
  }, [])

  useEffect(() => {
    try {
      sessionStorage.setItem('desk:lamp', lamp ? 'on' : 'off')
    } catch {
      /* Not remembered: fine. */
    }
  }, [lamp])

  const switchOn = useCallback(
    (withRadio: boolean) => {
      setLamp(true)
      if (!inside) {
        enter(withRadio)
      } else {
        play('lamp')
      }
      /* Name everything on the desk for a moment, then let the visitor explore. */
      setHints(true)
      window.setTimeout(() => setHints(false), 3200)
    },
    [enter, inside, play],
  )

  const raise = (id: string) => {
    zCounter.current += 1
    setZ((current) => ({ ...current, [id]: zCounter.current }))
  }

  const openItem = (id: DeskItemId) => {
    if (dragged.current) {
      dragged.current = false
      return
    }
    if (!lamp) {
      switchOn(false)
    }
    play('paper')
    setIndexOpen(false)
    setOpen(id)
  }

  const closed = useCallback(() => {
    const id = open
    setOpen(null)
    if (id !== null) {
      window.setTimeout(() => buttonRefs.current[id]?.focus({ preventScroll: true }), 20)
    }
  }, [open])

  /* Stable per opened object: the inspector's effects must not re-run on
     every re-render of the desk (the clock ticks, objects get raised…). */
  const getSource = useCallback(
    () => (open === null ? null : (itemRefs.current[open] ?? null)),
    [open],
  )

  const stick = (text: string, name: string) => {
    const layout = window.matchMedia('(width < 768px)').matches
      ? deskLayouts.tall
      : deskLayouts.wide
    const note: VisitorNote = {
      id: `${Date.now()}`,
      text,
      name: name || 'someone',
      x: 0.12 + Math.random() * 0.7,
      y: layout === deskLayouts.wide ? 0.08 + Math.random() * 0.75 : 0.25 + Math.random() * 0.65,
      r: Math.round(Math.random() * 14 - 7),
    }
    const next = [note, ...notes].slice(0, visitorNotes.maxNotes)
    setNotes(next)
    try {
      localStorage.setItem(visitorNotes.storageKey, JSON.stringify(next))
    } catch {
      /* Storage refused: the note stays for this visit. */
    }
    play('paper')
    setCloseSignal((value) => value + 1)
  }

  const views: Partial<Record<DeskItemId, ReactNode>> = useMemo(
    () => ({
      notebook: <NotebookView />,
      badge: <BadgeView />,
      cards: <CardsView />,
      receipt: <ReceiptView />,
      index: <IndexView />,
      slip: <SlipView />,
      trading: <TradingView />,
      keyboard: <KeyboardView />,
      polaroids: <PolaroidsView />,
      postcard: <PostcardView />,
    }),
    [],
  )

  const openable = deskItems.filter((item) => item.opens)
  const openItemData = deskItems.find((item) => item.id === open)
  const wideRotation = open !== null ? deskLayouts.wide.place[open].r : 0

  return (
    <section
      aria-label="Arnaud’s desk"
      /* Exactly one screen on desktop (the stage fits the viewport); on phones
         the portrait desk is the page. Nothing below it. */
      className="wood relative flex min-h-svh items-center overflow-hidden"
    >
      <p className="sr-only">{site.srGuide}</p>
      <div
        ref={stageRef}
        className="stage"
        style={lightVars}
        data-lit={lamp || undefined}
        data-hints={hints ? 'on' : undefined}
      >
        <div aria-hidden="true" className="desk-light" />

        {deskItems.map((item, order) => {
          const Face = faces[item.id]
          const picked = open === item.id
          if (item.toy === true) {
            const toyStyle = { ...placementVars(item), zIndex: item.id === 'ball' ? 70 : 3 }
            const tallHidden = deskLayouts.tall.place[item.id].hidden || undefined
            return item.id === 'mug' ? (
              <MugToy key={item.id} style={toyStyle} tallHidden={tallHidden} />
            ) : (
              <BallToy key={item.id} style={toyStyle} tallHidden={tallHidden} stageRef={stageRef} />
            )
          }
          if (item.decor === true) {
            /* Set dressing: drawn, lit and shadowed like the rest, but inert. */
            return (
              <div
                key={item.id}
                aria-hidden="true"
                className="desk-item desk-decor"
                data-tall-hidden={deskLayouts.tall.place[item.id].hidden || undefined}
                style={{ ...placementVars(item), zIndex: 1 + (order % 8) }}
              >
                <div className="desk-face">
                  <Face />
                </div>
              </div>
            )
          }
          return (
            <motion.div
              key={item.id}
              ref={(node) => {
                itemRefs.current[item.id] = node
              }}
              className="desk-item"
              data-tall-hidden={deskLayouts.tall.place[item.id].hidden || undefined}
              style={{
                ...placementVars(item),
                zIndex:
                  z[item.id] ?? (item.id === 'lamp' ? 90 : item.id === 'intro' ? 40 : 10 + order),
                visibility: picked ? 'hidden' : 'visible',
              }}
              /* The lamp stays put: the light on the desk is cast from it. */
              drag={canDrag && !reduced && item.id !== 'lamp'}
              dragMomentum
              dragElastic={0.06}
              dragConstraints={stageRef}
              dragTransition={{ power: 0.18, timeConstant: 220 }}
              whileDrag={{ scale: 1.04, cursor: 'grabbing' }}
              onPointerDown={() => raise(item.id)}
              onDragStart={() => {
                dragged.current = true
              }}
              onDragEnd={() => {
                play('paper')
                window.setTimeout(() => {
                  dragged.current = false
                }, 50)
              }}
            >
              <div className="desk-face">
                <Face />
              </div>
              {item.id === 'lamp' ? (
                /* The light spilling out of the shade, on its own layer so
                   switching it on only fades one composited element. */
                <span
                  aria-hidden="true"
                  className="lamp-spill pointer-events-none absolute size-[26em] -translate-1/2 rounded-full"
                  style={{ left: `${LAMP_RIM_EM.x + 3}em`, top: `${LAMP_RIM_EM.y + 3}em` }}
                />
              ) : null}
              {item.id === 'lamp' ? (
                <button
                  type="button"
                  aria-pressed={lamp}
                  aria-label={lamp ? 'Switch the lamp off' : 'Switch the lamp on'}
                  onClick={() => {
                    if (dragged.current) {
                      dragged.current = false
                      return
                    }
                    if (lamp) {
                      play('lamp')
                      setLamp(false)
                    } else {
                      switchOn(false)
                    }
                  }}
                  className="absolute top-[11.6em] left-[13.75em] size-[10em] rounded-full"
                />
              ) : null}
              {item.opens ? (
                <button
                  type="button"
                  ref={(node) => {
                    buttonRefs.current[item.id] = node
                  }}
                  aria-label={item.label}
                  aria-haspopup="dialog"
                  onClick={() => openItem(item.id)}
                  className="absolute inset-0 cursor-pointer rounded-[0.4em]"
                />
              ) : null}
              {item.tag !== undefined ? (
                <span
                  aria-hidden="true"
                  className="desk-tag font-hand pointer-events-none absolute -top-[1.9em] left-1/2 z-10 rounded-full bg-night/80 px-[0.6em] py-[0.1em] text-[1.35em] whitespace-nowrap text-amber"
                >
                  {item.tag}
                </span>
              ) : null}
            </motion.div>
          )
        })}

        {/* Notes left by this visitor. */}
        {notes.map((note) => (
          <motion.div
            key={note.id}
            className="absolute z-[60] w-[calc(150*var(--u))]"
            style={{
              left: `${note.x * 100}%`,
              top: `${note.y * 100}%`,
              rotate: `${note.r}deg`,
              fontSize: 'calc(16 * var(--u))',
            }}
            initial={reduced ? false : { scale: 1.6, opacity: 0, y: -40 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 18 }}
            drag={canDrag && !reduced}
            dragMomentum={false}
            dragConstraints={stageRef}
          >
            <div className="bg-[#f2d675] px-[0.8em] pt-[0.9em] pb-[0.7em] text-[#4a3b12] shadow-[0_0.6em_1em_-0.4em_rgb(0_0_0/70%)]">
              <p className="font-hand text-[1.35em] leading-[1.05] break-words">{note.text}</p>
              <p className="font-hand mt-[0.4em] text-right text-[1.05em] text-[#7a6420]">
                — {note.name}
              </p>
            </div>
          </motion.div>
        ))}

        <div aria-hidden="true" className="desk-dark" />
      </div>

      {/* The way in: the room is dark until the lamp comes on. */}
      <AnimatePresence>
        {!lamp && !inside && !remembered ? (
          <motion.div
            key="arrival"
            className="arrival fixed inset-0 z-[110] flex items-center justify-center px-6"
            exit={{ opacity: 0, transition: { duration: 0.9 } }}
          >
            <div className="max-w-md text-center">
              <p className="font-hand text-[clamp(2rem,6vw,3rem)] leading-[1.05] text-cream">
                {site.arrival.line.replace('{time}', time ?? 'late')}
              </p>
              <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => switchOn(false)}
                  className="group inline-flex items-center gap-3 rounded-full bg-amber px-6 py-3 text-night shadow-[0_0_40px_-6px_rgb(255_184_103/70%)] transition hover:scale-[1.03] active:scale-[0.98]"
                >
                  <Icon name="lamp" size={18} />
                  <span className="font-hand text-[1.6rem] leading-none">{site.arrival.lamp}</span>
                </button>
                <button
                  type="button"
                  onClick={() => switchOn(true)}
                  className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-cream ring-1 ring-cream/30 transition hover:bg-cream/10 hover:ring-cream/60"
                >
                  <Icon name="speaker" size={17} />
                  <span className="font-hand text-[1.5rem] leading-none">
                    {site.arrival.lampAndRadio}
                  </span>
                </button>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {/* The few things that must always be reachable. */}
      <header className="pointer-events-none fixed inset-x-0 top-0 z-[115] flex items-start justify-end gap-4 p-3 sm:p-4">
        <nav aria-label="On the desk" className="pointer-events-auto relative">
          <button
            type="button"
            aria-expanded={indexOpen}
            onClick={() => setIndexOpen((value) => !value)}
            className="font-hand rounded-full bg-night/70 px-4 py-1.5 text-[1.3rem] leading-none text-cream backdrop-blur transition hover:text-amber"
          >
            what’s on the desk?
          </button>
          <AnimatePresence>
            {indexOpen ? (
              <motion.ul
                initial={reduced ? false : { opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                className="absolute top-[calc(100%+0.5rem)] right-0 w-72 rounded-xl bg-night-2/95 p-2 shadow-2xl ring-1 ring-cream/10 backdrop-blur"
              >
                {openable.map((item) => (
                  <li key={item.id}>
                    <button
                      type="button"
                      onClick={() => openItem(item.id)}
                      className="flex w-full items-baseline justify-between gap-3 rounded-lg px-3 py-2 text-left text-[0.875rem] text-cream transition hover:bg-cream/8"
                    >
                      <span>{item.label?.split(' — ')[1] ?? item.label}</span>
                      <span className="font-hand text-[1.15rem] text-amber">{item.tag}</span>
                    </button>
                  </li>
                ))}
              </motion.ul>
            ) : null}
          </AnimatePresence>
        </nav>
      </header>

      {open !== null && openItemData !== undefined ? (
        <Inspector
          key={open}
          label={openItemData.label ?? openItemData.id}
          getSource={getSource}
          sourceRotation={wideRotation}
          closeSignal={closeSignal}
          onClosed={closed}
        >
          {open === 'pad' ? <PadView onStick={stick} /> : views[open]}
        </Inspector>
      ) : null}
    </section>
  )
}
