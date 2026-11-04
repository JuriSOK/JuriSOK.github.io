'use client'

import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useState, type FormEvent } from 'react'
import { contact } from '@/content/contact'
import { interests } from '@/content/interests'
import { links } from '@/content/links'
import { profile } from '@/content/profile'
import { visitorNotes } from '@/content/site'
import { hasDomainContent, skills } from '@/content/skills'
import { PixelArtIcon } from '@/components/pixel-art/PixelArtIcon'
import { useSound } from '@/components/sound/SoundProvider'
import { Icon } from '@/components/ui/Icon'

/* ---------- Skills: the keyboard ---------- */

const domains = skills.filter(hasDomainContent)

/**
 * The keyboard, close up. Each row is a domain; its keys are the tools.
 * Press one: the key goes down with a click, and the little screen above the
 * keys types out what that row is used for. No levels, no gauges — keys are
 * the same size whatever you think of them.
 */
export function KeyboardView() {
  const reduced = useReducedMotion()
  const { play } = useSound()
  const [pressed, setPressed] = useState<{ domain: string; tool: string } | null>(null)
  const active = domains.find((domain) => domain.id === pressed?.domain) ?? domains[0]

  return (
    <div className="w-[min(66rem,96vw)]">
      {/* The little screen. */}
      <div
        aria-live="polite"
        className="mx-auto mb-4 max-w-2xl rounded-lg bg-[#10140f] px-5 py-4 font-mono text-[0.875rem] leading-relaxed text-[#b8e39a] shadow-[inset_0_0_20px_rgb(0_0_0/80%)]"
      >
        <p className="text-[#7fa86a]">
          &gt; {pressed !== null ? pressed.tool.toLowerCase() : 'press any key'}
          <span
            aria-hidden="true"
            className="breathe ml-0.5 inline-block h-[1em] w-[0.55em] translate-y-[0.15em] bg-[#b8e39a]"
          />
        </p>
        {active !== undefined ? (
          <p className="mt-1">
            <span className="text-[#7fa86a]">{active.title.toLowerCase()}:</span> {active.usage}
          </p>
        ) : null}
      </div>

      <div className="rounded-2xl bg-[linear-gradient(#3a322c,#231d19)] p-3 shadow-[0_40px_80px_-30px_rgb(0_0_0/90%),inset_0_1px_0_rgb(255_255_255/10%)] sm:p-4">
        {domains.map((domain, row) => (
          <div key={domain.id} className="flex flex-wrap gap-1.5 py-1 sm:flex-nowrap sm:gap-2">
            <span className="condensed flex min-h-12 w-full shrink-0 items-center rounded-md bg-amber px-3 text-[0.75rem] leading-tight text-night shadow-[inset_0_-4px_0_rgb(0_0_0/25%)] sm:w-40">
              {domain.title}
            </span>
            {(domain.tools ?? []).map((tool) => {
              const isDown = pressed?.tool === tool && pressed.domain === domain.id
              return (
                <motion.button
                  key={tool}
                  type="button"
                  onClick={() => {
                    play('key')
                    setPressed({ domain: domain.id, tool })
                  }}
                  whileTap={reduced ? undefined : { y: 3 }}
                  aria-pressed={isDown}
                  className={`min-h-12 flex-1 rounded-md px-2 text-[0.8125rem] leading-tight text-ink shadow-[inset_0_-4px_0_rgb(0_0_0/22%)] transition-colors sm:min-w-0 ${
                    isDown
                      ? 'bg-[#d8ccb6] shadow-[inset_0_-1px_0_rgb(0_0_0/22%)]'
                      : row % 2 === 0
                        ? 'bg-[#ece4d4] hover:bg-[#f5efe3]'
                        : 'bg-[#e3d9c6] hover:bg-[#efe7d8]'
                  }`}
                >
                  {tool}
                </motion.button>
              )
            })}
          </div>
        ))}
      </div>
      <p className="font-hand mt-4 text-center text-[1.4rem] text-hazel">go on, press a few.</p>
    </div>
  )
}

/* ---------- Interests: the polaroids ---------- */

const frames = ['#2f4433', '#5a2a20', '#2b3550', '#6b4e26', '#3d3a45']
const tilts = [-7, 4, -2, 6, -4]

/**
 * Five polaroids from after hours. Pick one up and it turns over: the story
 * is written on the back.
 */
export function PolaroidsView() {
  const reduced = useReducedMotion()
  const { play } = useSound()
  const [picked, setPicked] = useState<string | null>(null)
  const current = interests.find((interest) => interest.id === picked)

  return (
    <div className="w-[min(64rem,96vw)]">
      <ul className="flex flex-wrap justify-center gap-4 sm:gap-6">
        {interests.map((interest, index) => (
          <li key={interest.id}>
            <motion.button
              type="button"
              aria-pressed={picked === interest.id}
              onClick={() => {
                play('flip')
                setPicked(picked === interest.id ? null : interest.id)
              }}
              initial={reduced ? false : { opacity: 0, y: 30, rotate: 0 }}
              animate={{
                opacity: picked !== null && picked !== interest.id ? 0.45 : 1,
                y: picked === interest.id ? -10 : 0,
                rotate: tilts[index] ?? 0,
              }}
              whileHover={reduced ? undefined : { rotate: 0, y: -8, scale: 1.04 }}
              transition={{
                type: 'spring',
                stiffness: 200,
                damping: 18,
                delay: reduced ? 0 : index * 0.05,
              }}
              className="block w-36 bg-[#fbf9f4] p-2 pb-9 text-ink shadow-[0_20px_40px_-18px_rgb(0_0_0/85%)] sm:w-40"
            >
              <span
                className="block aspect-square p-6"
                style={{ backgroundColor: frames[index % frames.length] }}
              >
                <PixelArtIcon
                  name={interest.icon}
                  className="size-full [image-rendering:pixelated]"
                />
              </span>
              <span className="font-hand mt-2 block text-[1.45rem] leading-none">
                {interest.label.toLowerCase()}
              </span>
            </motion.button>
          </li>
        ))}
      </ul>

      <div aria-live="polite" className="mx-auto mt-8 min-h-40 max-w-2xl">
        <AnimatePresence mode="wait">
          {current !== undefined ? (
            <motion.div
              key={current.id}
              initial={reduced ? false : { opacity: 0, rotateX: -60, y: 10 }}
              animate={{ opacity: 1, rotateX: 0, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.4 }}
              className="paper-tex rounded-sm bg-paper px-7 py-6 text-ink shadow-[0_24px_50px_-20px_rgb(0_0_0/85%)]"
            >
              <p className="font-hand text-[2.2rem] leading-none text-bordeaux">
                {current.label.toLowerCase()}
              </p>
              <div className="font-display mt-3 space-y-3 text-[1.0625rem] leading-relaxed">
                {current.detail.map((paragraph) => (
                  <p key={paragraph.slice(0, 24)}>{paragraph}</p>
                ))}
              </div>
              {current.link !== undefined ? (
                <a
                  href={current.link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-hand mt-3 inline-flex items-center gap-1.5 text-[1.5rem] text-bordeaux underline decoration-bordeaux/30 underline-offset-8 hover:decoration-bordeaux"
                >
                  {current.link.label.toLowerCase()} <Icon name="arrowUpRight" size={16} />
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              ) : null}
            </motion.div>
          ) : (
            <motion.p
              key="hint"
              initial={false}
              exit={{ opacity: 0 }}
              className="font-hand text-center text-[1.6rem] text-hazel"
            >
              pick one up — the story’s on the back.
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

/* ---------- Contact: the postcard ---------- */

/**
 * A postcard from Paris. It arrives picture side up, then turns over to the
 * message and the address. Writing back is one tap away.
 */
export function PostcardView() {
  const reduced = useReducedMotion()
  const { play } = useSound()
  const [back, setBack] = useState(true)
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(links.email)
      play('clink')
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1800)
    } catch {
      /* Clipboard refused: the address is written on the card, selectable. */
    }
  }

  return (
    <div className="flex flex-col items-center">
      <div className="w-[min(46rem,94vw)] [perspective:1800px]">
        <motion.div
          initial={reduced ? false : { rotateY: 180 }}
          animate={{ rotateY: back ? 0 : 180 }}
          transition={
            reduced ? { duration: 0 } : { type: 'spring', stiffness: 80, damping: 14, delay: 0.35 }
          }
          className="grid [transform-style:preserve-3d]"
        >
          {/* Back: message and address. */}
          <div className="paper-tex col-start-1 row-start-1 grid gap-6 rounded-md bg-[#f7f2e7] p-6 text-ink [backface-visibility:hidden] md:grid-cols-[1.15fr_1fr] md:p-8">
            <div className="md:border-r md:border-ink/20 md:pr-6">
              <p className="font-hand text-[1.75rem] leading-[1.15]">{contact.invitation}</p>
              <p className="font-hand mt-4 text-[1.75rem] text-bordeaux">— Arnaud</p>
            </div>
            <div className="flex flex-col">
              <div className="self-end border-2 border-dashed border-ink/30 p-1">
                <div className="grid size-16 place-items-center bg-[#2f4433] p-2">
                  <PixelArtIcon name="camera" className="size-full [image-rendering:pixelated]" />
                </div>
              </div>
              <div className="mt-4 space-y-1 font-mono text-[0.875rem]">
                <p className="border-b border-ink/25 pb-1">{profile.fullName}</p>
                <p className="flex items-center justify-between gap-2 border-b border-ink/25 pb-1">
                  <span className="truncate">{links.email}</span>
                  <button
                    type="button"
                    onClick={copy}
                    aria-label="Copy email address"
                    className="relative grid size-8 shrink-0 place-items-center rounded-full text-ink-2 hover:bg-ink/10 hover:text-ink"
                  >
                    <Icon name={copied ? 'check' : 'copy'} size={15} />
                    {copied ? (
                      <span
                        role="status"
                        className="condensed absolute -top-8 right-0 rounded-full bg-ink px-2.5 py-1 text-[0.625rem] whitespace-nowrap text-paper"
                      >
                        copied
                      </span>
                    ) : null}
                  </button>
                </p>
                <p className="border-b border-ink/25 pb-1">{profile.location}</p>
              </div>
              <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-2 pt-6">
                <a
                  href={`mailto:${links.email}`}
                  onClick={() => play('paper')}
                  className="font-hand rounded-full bg-ink px-5 py-1.5 text-[1.5rem] leading-none text-paper transition hover:bg-bordeaux"
                >
                  write back →
                </a>
                <a
                  href={links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="condensed text-[0.75rem] underline decoration-ink/30 underline-offset-4 hover:decoration-ink"
                >
                  linkedin<span className="sr-only"> (opens in a new tab)</span>
                </a>
                <a
                  href={links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="condensed text-[0.75rem] underline decoration-ink/30 underline-offset-4 hover:decoration-ink"
                >
                  github<span className="sr-only"> (opens in a new tab)</span>
                </a>
              </div>
            </div>
          </div>
          {/* Front: the picture. */}
          <div
            aria-hidden="true"
            className="col-start-1 row-start-1 rounded-md bg-[#f7f2e7] p-3 [backface-visibility:hidden] [transform:rotateY(180deg)]"
          >
            <div
              className="relative h-full min-h-64 bg-cover bg-center [image-rendering:pixelated]"
              style={{ backgroundImage: 'url(/jazz-cafe-background-still.png)' }}
            >
              <span className="absolute inset-0 bg-[linear-gradient(transparent_45%,rgb(20_10_5/70%))]" />
              <span className="font-display absolute bottom-5 left-6 text-[2.6rem] leading-none text-[#fff3df]">
                Greetings from Paris
              </span>
            </div>
          </div>
        </motion.div>
      </div>
      <button
        type="button"
        onClick={() => {
          play('flip')
          setBack((value) => !value)
        }}
        className="font-hand mt-6 rounded-full bg-paper px-5 py-1.5 text-[1.4rem] leading-none text-ink transition hover:rotate-2 hover:bg-amber"
      >
        {back ? 'see the picture ↻' : 'turn it over ↻'}
      </button>
    </div>
  )
}

/* ---------- Leave a note ---------- */

export interface VisitorNote {
  readonly id: string
  readonly text: string
  readonly name: string
  readonly x: number
  readonly y: number
  readonly r: number
}

/** Write on a sticky note; it goes on the desk when you put it down. */
export function PadView({ onStick }: { onStick: (text: string, name: string) => void }) {
  const [text, setText] = useState('')
  const [name, setName] = useState('')
  const submit = (event: FormEvent) => {
    event.preventDefault()
    if (text.trim() === '') {
      return
    }
    onStick(text.trim().slice(0, visitorNotes.maxLength), name.trim())
  }
  return (
    <form onSubmit={submit} className="flex w-[min(24rem,90vw)] flex-col items-center">
      <div className="w-full rotate-[-1.5deg] bg-[#f2d675] px-6 pt-7 pb-6 text-[#4a3b12] shadow-[0_30px_50px_-20px_rgb(0_0_0/85%)]">
        <label htmlFor="note-text" className="font-hand block text-[1.9rem] leading-none">
          {visitorNotes.title}
        </label>
        <textarea
          id="note-text"
          data-autofocus
          value={text}
          maxLength={visitorNotes.maxLength}
          onChange={(event) => setText(event.target.value)}
          placeholder={visitorNotes.placeholder}
          rows={4}
          className="font-hand mt-3 w-full resize-none bg-transparent text-[1.7rem] leading-[1.1] placeholder:text-[#4a3b12]/45 focus:outline-none"
        />
        <label htmlFor="note-name" className="sr-only">
          Your name
        </label>
        <input
          id="note-name"
          value={name}
          maxLength={30}
          onChange={(event) => setName(event.target.value)}
          placeholder={`— ${visitorNotes.signaturePlaceholder}`}
          className="font-hand w-full border-t border-[#4a3b12]/25 bg-transparent pt-2 text-[1.4rem] placeholder:text-[#4a3b12]/45 focus:outline-none"
        />
      </div>
      <p className="mt-4 text-center text-[0.8125rem] text-hazel">{visitorNotes.subtitle}</p>
      <button
        type="submit"
        disabled={text.trim() === ''}
        className="font-hand mt-3 rounded-full bg-paper px-5 py-1.5 text-[1.4rem] leading-none text-ink transition hover:bg-amber disabled:opacity-40"
      >
        {visitorNotes.submit}
      </button>
    </form>
  )
}
