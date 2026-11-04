'use client'

import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useState, type ReactNode } from 'react'
import { about, focusAreas, focusNote, values } from '@/content/about'
import { education } from '@/content/education'
import { experiences } from '@/content/experiences'
import { profile } from '@/content/profile'
import avatar from '@/assets/arnaud-avatar.png'
import { useSound } from '@/components/sound/SoundProvider'

const ruled =
  '[background-image:linear-gradient(90deg,transparent_2.6rem,rgb(196_70_60/35%)_2.6rem,rgb(196_70_60/35%)_calc(2.6rem+1px),transparent_calc(2.6rem+1px)),repeating-linear-gradient(to_bottom,transparent_0_1.9rem,rgb(90_120_160/16%)_1.9rem_calc(1.9rem+1px))]'

function Page({ children, side }: { children: ReactNode; side: 'left' | 'right' }) {
  return (
    <div
      className={`paper-tex relative min-h-[30rem] bg-paper px-8 pt-10 pb-10 pl-14 text-ink ${ruled} ${
        side === 'left'
          ? 'shadow-[inset_-1.4rem_0_1.6rem_-1.4rem_rgb(0_0_0/22%)] md:rounded-l-md'
          : 'shadow-[inset_1.4rem_0_1.6rem_-1.4rem_rgb(0_0_0/22%)] md:rounded-r-md'
      }`}
    >
      {children}
    </div>
  )
}

/**
 * The notebook, open. Two spreads: who he is and what he cares about; then
 * where he is heading. Turning the page swings the right-hand page over the
 * spine.
 */
export function NotebookView() {
  const reduced = useReducedMotion()
  const { play } = useSound()
  const [spread, setSpread] = useState(0)
  const turn = () => {
    play('flip')
    setSpread((value) => (value === 0 ? 1 : 0))
  }

  return (
    <div className="w-[min(62rem,94vw)] rounded-lg bg-[#4c1d15] p-2 shadow-[0_40px_90px_-20px_rgb(0_0_0/90%)] md:p-3">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={spread}
          initial={
            reduced ? { opacity: 0 } : { opacity: 0, rotateY: -14, transformPerspective: 1400 }
          }
          animate={{ opacity: 1, rotateY: 0 }}
          exit={reduced ? { opacity: 0 } : { opacity: 0, rotateY: 14 }}
          transition={{ duration: 0.45, ease: [0.22, 0.61, 0.36, 1] }}
          style={{ transformOrigin: '50% 50%' }}
          className="grid md:grid-cols-2"
        >
          {spread === 0 ? (
            <>
              <Page side="left">
                <p className="font-hand text-[2.4rem] leading-none text-bordeaux">about me</p>
                <div className="font-display mt-6 space-y-4 text-[1.0625rem] leading-[1.9rem]">
                  {about.paragraphs.map((paragraph) => (
                    <p key={paragraph.slice(0, 24)}>{paragraph}</p>
                  ))}
                </div>
              </Page>
              <Page side="right">
                <p className="font-hand text-[2.4rem] leading-none text-bordeaux">
                  what i care about
                </p>
                <dl className="mt-6 space-y-6">
                  {values.map((value) => (
                    <div key={value.id}>
                      <dt className="font-hand text-[1.9rem] leading-none text-ink">
                        {value.name.toLowerCase()}
                      </dt>
                      <dd className="font-display mt-2 text-[1rem] leading-[1.9rem] text-ink-2">
                        {value.line}
                      </dd>
                    </div>
                  ))}
                </dl>
              </Page>
            </>
          ) : (
            <>
              <Page side="left">
                <p className="font-hand text-[2.4rem] leading-none text-bordeaux">
                  where i’m heading
                </p>
                <ul className="mt-6 space-y-3">
                  {focusAreas.map((area) => (
                    <li key={area.id}>
                      <p className="font-display text-[1.125rem] leading-[1.9rem] text-ink">
                        {area.name}
                      </p>
                      <p className="text-[0.9375rem] leading-[1.9rem] text-ink-2">{area.line}</p>
                    </li>
                  ))}
                </ul>
              </Page>
              <Page side="right">
                <p className="font-hand text-[2rem] leading-[1.9rem] text-ink">{focusNote}</p>
                <p className="font-hand mt-10 text-[2.4rem] leading-none text-bordeaux">
                  day to day
                </p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {profile.domains.map((domain) => (
                    <li
                      key={domain}
                      className="rounded-full border border-ink/25 px-3 py-1 font-mono text-[0.75rem] text-ink-2"
                    >
                      {domain}
                    </li>
                  ))}
                </ul>
              </Page>
            </>
          )}
        </motion.div>
      </AnimatePresence>
      <div className="flex items-center justify-between px-3 pt-3 pb-1">
        <span className="font-hand text-[1.4rem] text-[#e9c9b8]">
          {spread === 0 ? 'page 1 of 2' : 'page 2 of 2'}
        </span>
        <button
          type="button"
          onClick={turn}
          className="font-hand rounded-full bg-paper px-5 py-1.5 text-[1.4rem] leading-none text-ink transition hover:-rotate-2 hover:bg-amber"
        >
          {spread === 0 ? 'turn the page →' : '← back to the start'}
        </button>
      </div>
    </div>
  )
}

/**
 * The work badge, held up. Front: who, where, what. Flip it for the team and
 * the missions written on the back.
 */
export function BadgeView() {
  const reduced = useReducedMotion()
  const { play } = useSound()
  const [back, setBack] = useState(false)
  const job = experiences[0]
  if (job === undefined) {
    return null
  }
  const flip = () => {
    play('flip')
    setBack((value) => !value)
  }

  return (
    <div className="flex w-[min(30rem,92vw)] flex-col items-center">
      <span
        aria-hidden="true"
        className="h-16 w-6 bg-[repeating-linear-gradient(0deg,#2f4a3a_0_4px,#36543f_4px_8px)]"
      />
      <span
        aria-hidden="true"
        className="-mt-1 h-5 w-9 rounded bg-[linear-gradient(#d9d9d9,#8f8f8f)]"
      />
      <div className="relative mt-1 w-full [perspective:1600px]">
        <motion.div
          animate={{ rotateY: back ? 180 : 0 }}
          transition={reduced ? { duration: 0 } : { type: 'spring', stiffness: 120, damping: 16 }}
          className="relative grid [transform-style:preserve-3d]"
        >
          {/* Front */}
          <div className="col-start-1 row-start-1 overflow-hidden rounded-2xl bg-[#f8f5ee] text-ink [backface-visibility:hidden]">
            <span className="block h-3 bg-[#0b7a5a]" />
            <div className="flex flex-col items-center px-8 pt-6 pb-8 text-center">
              {job.logo !== undefined ? (
                // eslint-disable-next-line @next/next/no-img-element -- local logo, decorative: the name is written below
                <img
                  src={job.logo}
                  alt=""
                  className="h-12 w-auto object-contain mix-blend-multiply"
                />
              ) : null}
              <span className="mt-6 block h-40 w-34 overflow-hidden rounded-lg bg-[radial-gradient(circle_at_50%_40%,#e8c9a0,#b78a5c)]">
                {/* eslint-disable-next-line @next/next/no-img-element -- statically imported avatar */}
                <img
                  src={avatar.src}
                  alt={`Illustrated portrait of ${profile.fullName}`}
                  className="size-full object-contain"
                />
              </span>
              <p className="font-display mt-5 text-[1.75rem] leading-tight">{profile.fullName}</p>
              <p className="condensed mt-1 text-[0.875rem] text-ink-2">{job.role}</p>
              <p className="mt-4 text-[0.9375rem] text-ink-2">{job.organisation}</p>
              <p className="mt-1 font-mono text-[0.8125rem] text-ink-2">{job.period}</p>
            </div>
            <p className="condensed bg-[#0b7a5a] py-2 text-center text-[0.8125rem] text-white">
              {job.contract}
            </p>
          </div>

          {/* Back */}
          <div className="col-start-1 row-start-1 overflow-y-auto rounded-2xl bg-[#f1ece2] px-8 pt-8 pb-8 text-ink [backface-visibility:hidden] [transform:rotateY(180deg)]">
            <p className="font-hand text-[2rem] leading-none text-[#0b5e46]">the team</p>
            {job.summary !== undefined ? (
              <p className="font-display mt-3 text-[1.0625rem] leading-relaxed">{job.summary}</p>
            ) : null}
            <p className="font-hand mt-6 text-[2rem] leading-none text-[#0b5e46]">
              what i do there
            </p>
            <ul className="mt-3 space-y-2.5">
              {(job.missions ?? []).map((mission) => (
                <li
                  key={mission}
                  className="grid grid-cols-[1.2rem_1fr] text-[0.9375rem] leading-relaxed text-ink-2"
                >
                  <span aria-hidden="true" className="mt-[0.7em] h-px w-3 bg-ink/40" />
                  {mission}
                </li>
              ))}
            </ul>
            {(job.tools ?? []).length > 0 ? (
              <p className="mt-5 font-mono text-[0.8125rem] text-ink-2">
                {(job.tools ?? []).join(' · ')}
              </p>
            ) : null}
          </div>
        </motion.div>
      </div>
      <button
        type="button"
        onClick={flip}
        aria-pressed={back}
        className="font-hand mt-5 rounded-full bg-paper px-5 py-1.5 text-[1.4rem] leading-none text-ink transition hover:rotate-2 hover:bg-amber"
      >
        {back ? 'turn it back' : 'flip the badge ↻'}
      </button>
    </div>
  )
}

/** The student cards, spread out on the table. */
export function CardsView() {
  const bands = ['#1d2c5c', '#8a1538']
  return (
    <div className="grid w-[min(54rem,94vw)] gap-6 md:grid-cols-2">
      {education.map((entry, index) => (
        <motion.article
          key={entry.id}
          initial={{ rotate: index === 0 ? -4 : 5, y: 20, opacity: 0 }}
          animate={{ rotate: index === 0 ? -1.5 : 2, y: 0, opacity: 1 }}
          transition={{ delay: 0.15 + index * 0.1, type: 'spring', stiffness: 140, damping: 16 }}
          whileHover={{ rotate: 0, y: -6 }}
          className="relative overflow-hidden rounded-2xl bg-[#f4f2ee] py-7 pr-7 pl-10 text-ink shadow-[0_30px_60px_-25px_rgb(0_0_0/85%)]"
        >
          <span
            aria-hidden="true"
            className="absolute inset-y-0 left-0 w-3"
            style={{ backgroundColor: bands[index] ?? '#5b4636' }}
          />
          <div className="flex items-start justify-between gap-4">
            {entry.logo !== undefined ? (
              // eslint-disable-next-line @next/next/no-img-element -- institutional logo, decorative: the school is named below
              <img
                src={entry.logo}
                alt=""
                className="h-12 w-auto max-w-[60%] object-contain mix-blend-multiply"
              />
            ) : null}
            <span className="condensed text-[0.75rem] text-ink-2">student card</span>
          </div>
          <h3 className="font-display mt-6 text-[1.5rem] leading-tight">{entry.degree}</h3>
          {entry.subtitle !== undefined ? (
            <p className="mt-1 text-[0.9375rem] text-ink-2">{entry.subtitle}</p>
          ) : null}
          <p className="mt-5 text-[0.9375rem]">{entry.school}</p>
          <p className="mt-1 font-mono text-[0.8125rem] text-ink-2">
            {entry.location} · {entry.period}
          </p>
        </motion.article>
      ))}
    </div>
  )
}
