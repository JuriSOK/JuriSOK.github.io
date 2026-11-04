'use client'

import { motion, useReducedMotion } from 'motion/react'
import { useEffect, useState, type ReactNode } from 'react'
import { hackathons } from '@/content/hackathons'
import { projects } from '@/content/projects'
import { HackathonScene } from '@/components/pixel-art/HackathonPixelArt'
import { ProjectArtwork } from '@/components/pixel-art/ProjectArtwork'
import { useSound } from '@/components/sound/SoundProvider'
import { Icon } from '@/components/ui/Icon'

const finance = projects.find((project) => project.id === 'personal-finance-tracker')
const sgbd = projects.find((project) => project.id === 'MiniSGBDR')
const kincall = hackathons.find((hackathon) => hackathon.id === 'kincall')
const draftlens = hackathons.find((hackathon) => hackathon.id === 'draftlens')

function linkLabel(label: string): string {
  return label === 'View on GitHub' ? 'source' : label.toLowerCase()
}

/* ---------- Personal Finance Tracker: the receipt prints ---------- */

/**
 * A thermal receipt, printed line by line. The project reads like a till
 * slip: what it is, what it is made of, where the two halves live.
 */
export function ReceiptView() {
  const reduced = useReducedMotion()
  const { play } = useSound()
  const lines: { key: string; node: ReactNode }[] = []
  if (finance !== undefined) {
    lines.push({
      key: 'title',
      node: (
        <p className="text-center text-[1.05rem] font-medium tracking-[0.08em] uppercase">
          {finance.title}
        </p>
      ),
    })
    lines.push({
      key: 'kind',
      node: <p className="text-center text-[0.75rem] text-[#6d625a]">— a project, itemised —</p>,
    })
    lines.push({
      key: 'rule-1',
      node: <p className="border-t border-dashed border-[#2d2622]/40" />,
    })
    if (finance.summary !== null) {
      lines.push({
        key: 'summary',
        node: <p className="text-[0.8125rem] leading-relaxed normal-case">{finance.summary}</p>,
      })
    }
    lines.push({
      key: 'rule-2',
      node: <p className="border-t border-dashed border-[#2d2622]/40" />,
    })
    finance.tech.forEach((tech) =>
      lines.push({
        key: `tech-${tech}`,
        node: (
          <p className="flex items-baseline gap-2 uppercase">
            <span>{tech}</span>
            <span
              aria-hidden="true"
              className="flex-1 border-b border-dotted border-[#2d2622]/40"
            />
            <Icon name="check" size={13} />
          </p>
        ),
      }),
    )
    lines.push({
      key: 'rule-3',
      node: <p className="border-t border-dashed border-[#2d2622]/40" />,
    })
    lines.push({
      key: 'total',
      node: (
        <p className="flex justify-between text-[1rem] font-medium uppercase">
          <span>repositories</span>
          <span>{finance.links.length}</span>
        </p>
      ),
    })
    lines.push({
      key: 'links',
      node: (
        <ul className="flex flex-wrap justify-center gap-x-5 gap-y-1 pt-1">
          {finance.links.map((link) => (
            <li key={link.url}>
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 uppercase underline decoration-[#2d2622]/40 underline-offset-4 hover:text-bordeaux"
              >
                {linkLabel(link.label)} <Icon name="arrowUpRight" size={13} />
                <span className="sr-only"> — {finance.title} (opens in a new tab)</span>
              </a>
            </li>
          ))}
        </ul>
      ),
    })
    lines.push({
      key: 'thanks',
      node: (
        <p className="pt-2 text-center text-[0.75rem] text-[#6d625a]">thank you for stopping by</p>
      ),
    })
  }

  const [printed, setPrinted] = useState(reduced ? lines.length : 0)
  useEffect(() => {
    if (printed >= lines.length) {
      return
    }
    const timer = window.setTimeout(
      () => {
        play('print')
        setPrinted((value) => value + 1)
      },
      printed === 0 ? 350 : 110,
    )
    return () => window.clearTimeout(timer)
  }, [printed, lines.length, play])

  return (
    <div className="flex w-[min(24rem,92vw)] flex-col items-center">
      {/* The printer's mouth. */}
      <span
        aria-hidden="true"
        className="relative z-10 h-4 w-[calc(100%+1.5rem)] rounded-md bg-[linear-gradient(#3a3532,#1e1b19)] shadow-[0_6px_10px_rgb(0_0_0/50%)]"
      />
      <div className="paper-tex -mt-1 w-full bg-[#f8f5ef] px-6 pt-6 pb-10 font-mono text-[0.875rem] leading-[1.7] text-[#2d2622] [clip-path:polygon(0_0,100%_0,100%_calc(100%-10px),95%_100%,90%_calc(100%-10px),85%_100%,80%_calc(100%-10px),75%_100%,70%_calc(100%-10px),65%_100%,60%_calc(100%-10px),55%_100%,50%_calc(100%-10px),45%_100%,40%_calc(100%-10px),35%_100%,30%_calc(100%-10px),25%_100%,20%_calc(100%-10px),15%_100%,10%_calc(100%-10px),5%_100%,0_calc(100%-10px))]">
        <div className="space-y-2.5">
          {lines.slice(0, printed).map((line) => (
            <motion.div
              key={line.key}
              initial={reduced ? false : { opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.18 }}
            >
              {line.node}
            </motion.div>
          ))}
        </div>
        {/* The full text is always available to assistive technology at once. */}
        <span
          aria-hidden="true"
          className={`mx-auto mt-6 block h-12 w-[85%] bg-[repeating-linear-gradient(90deg,#2d2622_0_2px,transparent_2px_5px,#2d2622_5px_6px,transparent_6px_9px)] transition-opacity duration-500 ${printed >= lines.length ? 'opacity-100' : 'opacity-0'}`}
        />
      </div>
      <figure className="mt-6 w-28 rotate-3 bg-[#f7f4ee] p-1.5 pb-5 shadow-lg">
        <div className="aspect-square bg-[#1d1511] p-2">
          <ProjectArtwork
            id="personal-finance-tracker"
            className="size-full [image-rendering:pixelated]"
          />
        </div>
        <figcaption className="font-hand mt-1 text-center text-[1rem] text-ink">
          the cover, pinned on
        </figcaption>
      </figure>
    </div>
  )
}

/* ---------- MiniSGBDR: a bundle of index cards ---------- */

/** Three catalogue cards, shuffled through one at a time — a database, filed. */
export function IndexView() {
  const reduced = useReducedMotion()
  const { play } = useSound()
  const [top, setTop] = useState(0)
  if (sgbd === undefined) {
    return null
  }
  const cards: { key: string; heading: string; body: ReactNode }[] = [
    {
      key: 'entry',
      heading: sgbd.title,
      body: <p className="font-display text-[1.25rem] leading-[2rem]">{sgbd.summary}</p>,
    },
    {
      key: 'fields',
      heading: 'catalogue entry',
      body: (
        <dl className="grid grid-cols-[7.5rem_1fr] gap-y-[0.55rem] font-mono text-[0.9375rem] leading-[1.45rem]">
          <dt className="text-ink-2">language</dt>
          <dd>{sgbd.tech.join(', ')}</dd>
          <dt className="text-ink-2">kind</dt>
          <dd>database management system</dd>
          <dt className="text-ink-2">built</dt>
          <dd>from scratch</dd>
        </dl>
      ),
    },
    {
      key: 'where',
      heading: 'where to find it',
      body: (
        <ul className="space-y-2">
          {sgbd.links.map((link) => (
            <li key={link.url}>
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-hand inline-flex items-center gap-2 text-[2rem] leading-none text-bordeaux underline decoration-bordeaux/30 underline-offset-8 hover:decoration-bordeaux"
              >
                {linkLabel(link.label)} on GitHub <Icon name="arrowUpRight" size={18} />
                <span className="sr-only"> — {sgbd.title} (opens in a new tab)</span>
              </a>
            </li>
          ))}
        </ul>
      ),
    },
  ]
  const next = () => {
    play('paper')
    setTop((value) => (value + 1) % cards.length)
  }
  const ordered = [...cards.slice(top), ...cards.slice(0, top)]

  return (
    <div className="flex w-[min(38rem,92vw)] flex-col items-center">
      <div className="relative h-[19rem] w-full">
        {ordered
          .map((card, depth) => ({ card, depth }))
          .reverse()
          .map(({ card, depth }) => (
            <motion.article
              key={card.key}
              aria-hidden={depth !== 0}
              animate={{
                y: depth * 10,
                x: depth * 8,
                rotate: depth === 0 ? -1 : depth * 2.5,
                scale: 1 - depth * 0.03,
              }}
              transition={
                reduced ? { duration: 0 } : { type: 'spring', stiffness: 220, damping: 24 }
              }
              className="paper-tex absolute inset-0 rounded-sm bg-[#fbf8f1] px-7 pt-5 pb-6 text-ink shadow-[0_24px_40px_-20px_rgb(0_0_0/80%)] [background-image:linear-gradient(to_bottom,transparent_3.4rem,rgb(196_70_60/55%)_3.4rem,rgb(196_70_60/55%)_calc(3.4rem+1px),transparent_calc(3.4rem+1px)),repeating-linear-gradient(to_bottom,transparent_0_2rem,rgb(90_120_170/18%)_2rem_calc(2rem+1px))]"
            >
              <h3 className="font-mono text-[1.25rem] font-medium">{card.heading}</h3>
              <div className="mt-8">{card.body}</div>
            </motion.article>
          ))}
      </div>
      <button
        type="button"
        onClick={next}
        className="font-hand mt-8 rounded-full bg-paper px-5 py-1.5 text-[1.4rem] leading-none text-ink transition hover:-rotate-2 hover:bg-amber"
      >
        next card →
      </button>
    </div>
  )
}

/* ---------- KinCall: a phone message ---------- */

function SlipLine({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="grid grid-cols-[5.5rem_1fr] items-baseline gap-3 border-b border-[#5b2a22]/25 py-2.5">
      <dt className="condensed text-[0.75rem] text-[#7a3a2e]">{label}</dt>
      <dd>{children}</dd>
    </div>
  )
}

/** « While you were out » — the hackathon, taken down as a phone message. */
export function SlipView() {
  if (kincall === undefined) {
    return null
  }
  return (
    <article className="paper-tex w-[min(36rem,92vw)] rotate-[-1deg] rounded-sm bg-[#f6cfc4] px-8 pt-7 pb-8 text-[#3f1d17] shadow-[0_30px_60px_-25px_rgb(0_0_0/85%)]">
      <header className="flex items-baseline justify-between border-b-2 border-[#5b2a22] pb-2">
        <h3 className="condensed text-[1.6rem] font-bold tracking-[0.1em]">while you were out</h3>
        <span className="font-mono text-[0.8125rem]">{kincall.period}</span>
      </header>
      <dl className="mt-3">
        <SlipLine label="from">
          <span className="font-mono text-[0.9375rem]">{kincall.event}</span>
        </SlipLine>
        <SlipLine label="re">
          <span className="font-hand text-[2.2rem] leading-none">{kincall.title}</span>
        </SlipLine>
        <SlipLine label="message">
          <span className="font-hand text-[1.6rem] leading-[1.15]">{kincall.summary}</span>
        </SlipLine>
        <SlipLine label="my part">
          <span className="text-[0.9375rem] leading-relaxed">{kincall.role}</span>
        </SlipLine>
        {kincall.outcome !== undefined ? (
          <SlipLine label="outcome">
            <span className="flex items-start gap-2 text-[0.9375rem] leading-relaxed">
              <span
                aria-hidden="true"
                className="mt-1 grid size-4 shrink-0 place-items-center border border-current"
              >
                <Icon name="check" size={12} />
              </span>
              {kincall.outcome}
            </span>
          </SlipLine>
        ) : null}
        <SlipLine label="stack">
          <span className="font-mono text-[0.8125rem]">{kincall.technologies.join(' · ')}</span>
        </SlipLine>
      </dl>
      <ul className="mt-5 flex gap-5">
        {kincall.links.map((link) => (
          <li key={link.url}>
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-hand inline-flex items-center gap-1.5 text-[1.6rem] leading-none underline decoration-[#5b2a22]/30 underline-offset-8 hover:decoration-[#5b2a22]"
            >
              call back — {linkLabel(link.label)} <Icon name="arrowUpRight" size={16} />
              <span className="sr-only"> — {kincall.title} (opens in a new tab)</span>
            </a>
          </li>
        ))}
      </ul>
    </article>
  )
}

/* ---------- DraftLens: the trading card ---------- */

/** A draft-night trading card. Flip it for the scouting report. */
export function TradingView() {
  const reduced = useReducedMotion()
  const { play } = useSound()
  const [back, setBack] = useState(false)
  if (draftlens === undefined) {
    return null
  }
  return (
    <div className="flex flex-col items-center">
      <div className="w-[min(22rem,86vw)] [perspective:1600px]">
        <motion.div
          animate={{ rotateY: back ? 180 : 0 }}
          transition={reduced ? { duration: 0 } : { type: 'spring', stiffness: 110, damping: 15 }}
          className="grid [transform-style:preserve-3d]"
        >
          <div className="col-start-1 row-start-1 rounded-[1.4rem] bg-[linear-gradient(160deg,#c9622e,#7a2f17)] p-3 [backface-visibility:hidden]">
            <div className="flex h-full flex-col rounded-[1rem] bg-[#1b1310] p-4">
              <div className="aspect-[20/14] overflow-hidden rounded-lg bg-[#2a201b] p-2">
                <HackathonScene
                  name="draftlens"
                  className="size-full [image-rendering:pixelated]"
                />
              </div>
              <h3 className="font-display mt-4 text-[2.4rem] leading-none text-cream">
                {draftlens.title}
              </h3>
              <p className="condensed mt-2 text-[0.8125rem] text-amber">{draftlens.event}</p>
              <p className="mt-auto pt-6 font-mono text-[0.8125rem] text-hazel">
                {draftlens.period}
              </p>
            </div>
          </div>
          <div className="col-start-1 row-start-1 rounded-[1.4rem] bg-[linear-gradient(160deg,#c9622e,#7a2f17)] p-3 [backface-visibility:hidden] [transform:rotateY(180deg)]">
            <div className="h-full rounded-[1rem] bg-[#f3ead9] p-5 text-ink">
              <p className="condensed border-b-2 border-ink pb-1 text-[1rem] font-bold">
                scouting report
              </p>
              <dl className="mt-3 space-y-3 text-[0.875rem] leading-relaxed">
                <div>
                  <dt className="condensed text-[0.6875rem] text-ink-2">the pitch</dt>
                  <dd>{draftlens.summary}</dd>
                </div>
                <div>
                  <dt className="condensed text-[0.6875rem] text-ink-2">my part</dt>
                  <dd>{draftlens.role}</dd>
                </div>
                <div>
                  <dt className="condensed text-[0.6875rem] text-ink-2">stack</dt>
                  <dd className="font-mono text-[0.75rem]">{draftlens.technologies.join(' · ')}</dd>
                </div>
              </dl>
              <ul className="mt-4 flex gap-4">
                {draftlens.links.map((link) => (
                  <li key={link.url}>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      tabIndex={back ? 0 : -1}
                      className="condensed inline-flex items-center gap-1 border-b border-ink/30 text-[0.8125rem] hover:border-ink"
                    >
                      {linkLabel(link.label)} <Icon name="arrowUpRight" size={13} />
                      <span className="sr-only"> — {draftlens.title} (opens in a new tab)</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
      <button
        type="button"
        aria-pressed={back}
        onClick={() => {
          play('flip')
          setBack((value) => !value)
        }}
        className="font-hand mt-6 rounded-full bg-paper px-5 py-1.5 text-[1.4rem] leading-none text-ink transition hover:rotate-2 hover:bg-amber"
      >
        {back ? 'turn it back' : 'flip the card ↻'}
      </button>
    </div>
  )
}
