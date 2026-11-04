'use client'

/**
 * The objects on the desk, seen from above.
 *
 * Each face is drawn in CSS at its object's footprint; 1em is 16 desk units,
 * so a face scales with the stage like a printed thing would. Faces are
 * pictures: the button that opens an object sits over its face (see
 * DeskObject), and screen readers get its label, not the drawing.
 *
 * Only facts from content/ are printed on them.
 */

import { useEffect, useState } from 'react'
import { education } from '@/content/education'
import { experiences } from '@/content/experiences'
import { hackathons } from '@/content/hackathons'
import { profile } from '@/content/profile'
import { projects } from '@/content/projects'
import { site } from '@/content/site'
import avatar from '@/assets/arnaud-avatar.png'
import { HackathonScene } from '@/components/pixel-art/HackathonPixelArt'
import { PixelArtIcon } from '@/components/pixel-art/PixelArtIcon'

const job = experiences[0]
const [master, bachelor] = education
const finance = projects.find((project) => project.id === 'personal-finance-tracker')
const sgbd = projects.find((project) => project.id === 'MiniSGBDR')
const kincall = hackathons.find((hackathon) => hackathon.id === 'kincall')
const draftlens = hackathons.find((hackathon) => hackathon.id === 'draftlens')

/* ---------- The intro note (carries the page's h1) ---------- */

export function IntroFace() {
  return (
    <div className="paper-tex absolute inset-0 overflow-hidden rounded-[0.25em] bg-paper px-[1.9em] pt-[2.3em] pb-[1.6em] text-ink [background-image:repeating-linear-gradient(to_bottom,transparent_0_1.55em,rgb(90_120_160/16%)_1.55em_calc(1.55em+1px))]">
      {/* A paper clip holding the sheet. */}
      <svg
        aria-hidden="true"
        viewBox="0 0 20 52"
        className="absolute -top-[0.9em] left-[2.4em] z-10 h-[3.6em] w-[1.4em] text-[#9aa0a6]"
      >
        <path
          d="M6 44V10a4 4 0 0 1 8 0v32a6 6 0 0 1-12 0V12"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
      {/* It was folded once, to fit in a pocket. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-[52%] h-[0.6em] bg-[linear-gradient(rgb(0_0_0/5%),rgb(255_255_255/30%)_45%,rgb(0_0_0/6%))]"
      />
      <p className="font-hand text-[2.9em] leading-[0.9] text-bordeaux">{site.intro.hello}</p>
      <h1 className="font-display mt-[0.35em] text-[1.85em] leading-[1.05] tracking-[-0.01em]">
        {profile.fullName}
      </h1>
      <p className="mt-[0.6em] font-mono text-[0.72em] tracking-[0.02em] text-ink-2">
        {site.intro.role}
      </p>
      <p className="font-hand mt-[0.7em] text-[1.35em] leading-[1.1] text-ink-2">
        {site.intro.note}
      </p>
      <p className="font-hand absolute right-[1.6em] bottom-[1em] rotate-[-4deg] text-[1.25em] text-bordeaux">
        {site.intro.ps}
      </p>
    </div>
  )
}

/* ---------- About: the notebook ---------- */

export function NotebookFace() {
  return (
    <div aria-hidden="true" className="absolute inset-0">
      {/* Ribbon bookmark slipping out at the bottom. */}
      <span className="absolute -bottom-[1.4em] left-[9em] h-[2.6em] w-[0.6em] bg-[#c8a24a] [clip-path:polygon(0_0,100%_0,100%_100%,50%_80%,0_100%)]" />
      <div className="absolute inset-0 rounded-[0.5em_0.9em_0.9em_0.5em] bg-[linear-gradient(135deg,#6b2c20,#4c1d15)] shadow-[inset_0.5em_0_0.6em_rgb(0_0_0/35%)]">
        {/* Leather worn pale at the corners it is always picked up by. */}
        <span className="absolute inset-0 rounded-[inherit] bg-[radial-gradient(circle_at_100%_100%,rgb(220_160_130/28%),transparent_22%),radial-gradient(circle_at_100%_0,rgb(220_160_130/20%),transparent_18%)]" />
        <span className="absolute inset-[0.55em] rounded-[0.4em] border border-dashed border-[#c98d6f]/35" />
        {/* Elastic band. */}
        <span className="absolute inset-y-0 right-[2.4em] w-[0.7em] bg-[linear-gradient(90deg,#1c0f0b,#3a2219,#1c0f0b)]" />
        {/* Paper label. */}
        <span className="paper-tex absolute top-[3.8em] left-[2.6em] w-[9.4em] rotate-[-2deg] rounded-[0.15em] bg-paper px-[1em] py-[0.6em] text-ink shadow-[0_0.15em_0.3em_rgb(0_0_0/30%)]">
          <span className="condensed block text-[0.6em] text-ink-2">notes</span>
          <span className="font-hand block text-[1.9em] leading-none whitespace-nowrap">
            about me
          </span>
        </span>
      </div>
    </div>
  )
}

/* ---------- Experience: the badge on its lanyard ---------- */

export function BadgeFace() {
  return (
    <div aria-hidden="true" className="absolute inset-0">
      <span className="absolute -top-[7em] left-1/2 h-[8.4em] w-[1.5em] -translate-x-1/2 bg-[repeating-linear-gradient(0deg,#2f4a3a_0_0.3em,#36543f_0.3em_0.6em)]" />
      <span className="absolute top-[0.6em] left-1/2 h-[1.4em] w-[2.2em] -translate-x-1/2 rounded-[0.3em] bg-[linear-gradient(#d9d9d9,#8f8f8f)]" />
      <div className="absolute inset-x-0 top-[1.6em] bottom-0 overflow-hidden rounded-[0.7em] bg-[#f8f5ee] px-[1em] pt-[1.1em] text-ink shadow-[inset_0_0_0_0.06em_rgb(0_0_0/10%)]">
        <span className="absolute inset-x-0 top-0 h-[0.45em] bg-[#0b7a5a]" />
        {job?.logo !== undefined ? (
          // eslint-disable-next-line @next/next/no-img-element -- tiny local logo, decorative
          <img
            src={job.logo}
            alt=""
            className="mx-auto h-[1.9em] w-auto object-contain mix-blend-multiply"
          />
        ) : null}
        <span className="mx-auto mt-[0.7em] block h-[5.4em] w-[4.6em] overflow-hidden rounded-[0.3em] bg-[radial-gradient(circle_at_50%_40%,#e8c9a0,#b78a5c)]">
          {/* eslint-disable-next-line @next/next/no-img-element -- statically imported avatar */}
          <img src={avatar.src} alt="" className="size-full object-contain" />
        </span>
        <span className="font-display mt-[0.6em] block text-center text-[1em] leading-tight">
          {profile.fullName}
        </span>
        <span className="condensed mt-[0.3em] block text-center text-[0.62em] text-ink-2">
          {job?.role}
        </span>
        <span className="condensed absolute inset-x-0 bottom-0 block bg-[#0b7a5a] py-[0.35em] text-center text-[0.55em] text-white">
          {job?.contract}
        </span>
      </div>
    </div>
  )
}

/* ---------- Education: two student cards ---------- */

function StudentCard({
  entry,
  band,
  className,
}: {
  entry: (typeof education)[number] | undefined
  band: string
  className: string
}) {
  if (entry === undefined) {
    return null
  }
  return (
    <div
      className={`absolute h-[8.6em] w-[13.6em] overflow-hidden rounded-[0.7em] bg-[#f4f2ee] text-ink shadow-[0_0.1em_0.4em_rgb(0_0_0/25%)] ${className}`}
    >
      <span className="absolute inset-y-0 left-0 w-[0.6em]" style={{ backgroundColor: band }} />
      {entry.logo !== undefined ? (
        // eslint-disable-next-line @next/next/no-img-element -- local institutional logo, decorative
        <img
          src={entry.logo}
          alt=""
          className="absolute top-[0.9em] left-[1.5em] h-[1.9em] w-auto max-w-[8em] object-contain mix-blend-multiply"
        />
      ) : null}
      <span className="condensed absolute top-[1.1em] right-[1em] text-[0.55em] text-ink-2">
        student card
      </span>
      <span className="absolute bottom-[1em] left-[1.5em] block">
        <span className="font-display block text-[0.95em] leading-tight">
          {entry.degree.replace('Degree in ', '')}
        </span>
        <span className="mt-[0.2em] block font-mono text-[0.6em] text-ink-2">{entry.period}</span>
      </span>
    </div>
  )
}

export function CardsFace() {
  return (
    <div aria-hidden="true" className="absolute inset-0">
      <StudentCard
        entry={bachelor}
        band="#8a1538"
        className="top-[0.4em] left-[1.6em] rotate-[9deg]"
      />
      <StudentCard entry={master} band="#1d2c5c" className="top-[1.2em] left-0" />
    </div>
  )
}

/* ---------- Project: Personal Finance Tracker, a receipt ---------- */

export function ReceiptFace() {
  return (
    <div
      aria-hidden="true"
      className="paper-tex absolute inset-0 bg-[#f8f5ef] px-[0.9em] pt-[1em] font-mono text-[0.62em] leading-[1.55] text-[#2d2622] [clip-path:polygon(0_0,100%_0,100%_96%,92%_100%,84%_96%,76%_100%,68%_96%,60%_100%,52%_96%,44%_100%,36%_96%,28%_100%,20%_96%,12%_100%,4%_96%,0_100%)]"
    >
      {/* Thermal paper never lies flat: it curls along one edge. */}
      <span className="pointer-events-none absolute inset-y-0 right-0 w-[1.4em] bg-[linear-gradient(90deg,transparent,rgb(60_40_25/14%))]" />
      <p className="text-center font-medium tracking-[0.06em] uppercase">{finance?.title}</p>
      <p className="mt-[0.4em] text-center text-[0.85em] text-[#6d625a]">— receipt —</p>
      <p className="mt-[0.8em] border-t border-dashed border-[#2d2622]/40 pt-[0.6em]" />
      {(finance?.tech ?? []).map((tech) => (
        <p key={tech} className="flex justify-between gap-[0.6em] uppercase">
          <span className="truncate">{tech}</span>
          <span>✓</span>
        </p>
      ))}
      <p className="mt-[0.6em] flex justify-between border-t border-dashed border-[#2d2622]/40 pt-[0.6em] uppercase">
        <span>repos</span>
        <span>{finance?.links.length}</span>
      </p>
      <span className="mx-auto mt-[1.2em] block h-[3.2em] w-[85%] bg-[repeating-linear-gradient(90deg,#2d2622_0_0.12em,transparent_0.12em_0.3em,#2d2622_0.3em_0.36em,transparent_0.36em_0.55em)]" />
    </div>
  )
}

/* ---------- Project: MiniSGBDR, index cards ---------- */

export function IndexFace() {
  return (
    <div aria-hidden="true" className="absolute inset-0">
      <span className="absolute inset-0 translate-x-[0.6em] translate-y-[0.5em] rotate-[4deg] rounded-[0.2em] bg-[#ebe4d6]" />
      <span className="absolute inset-0 translate-x-[0.25em] translate-y-[0.2em] rotate-[1.5deg] rounded-[0.2em] bg-[#f1ebdf]" />
      <div className="paper-tex absolute inset-0 rounded-[0.2em] bg-[#fbf8f1] px-[1.3em] pt-[1.1em] text-ink [background-image:linear-gradient(to_bottom,transparent_2.6em,rgb(196_70_60/55%)_2.6em,rgb(196_70_60/55%)_calc(2.6em+1px),transparent_calc(2.6em+1px)),repeating-linear-gradient(to_bottom,transparent_0_1.35em,rgb(90_120_170/20%)_1.35em_calc(1.35em+1px))]">
        <p className="font-mono text-[1.1em] font-medium">{sgbd?.title}</p>
        <p className="font-hand mt-[0.9em] text-[1.45em] leading-[0.95] text-ink-2">
          a database, built from scratch
        </p>
        <p className="condensed absolute right-[1.2em] bottom-[0.9em] text-[0.6em] text-ink-2">
          {sgbd?.tech[0]}
        </p>
      </div>
      {/* The rubber band around the bundle. */}
      <span className="absolute -inset-y-[0.3em] left-[84%] w-[0.45em] rounded-full bg-[#b5543c]/85" />
    </div>
  )
}

/* ---------- Hackathon: KinCall, a phone message slip ---------- */

export function SlipFace() {
  return (
    <div
      aria-hidden="true"
      className="paper-tex absolute inset-0 rounded-[0.15em] bg-[#f6cfc4] px-[1.2em] pt-[1em] text-[#5b2a22]"
    >
      <p className="condensed text-[0.95em] font-bold tracking-[0.12em]">while you were out</p>
      <p className="mt-[0.7em] flex gap-[0.5em] border-b border-[#5b2a22]/30 pb-[0.2em] font-mono text-[0.6em]">
        <span className="uppercase">from</span>
        <span className="truncate">{kincall?.event}</span>
      </p>
      <p className="font-hand mt-[0.5em] text-[2.2em] leading-none">{kincall?.title}</p>
      <p className="font-hand mt-[0.15em] text-[1.15em] leading-[1.05] text-[#7a3a2e]">
        voice agents that check in
      </p>
    </div>
  )
}

/* ---------- Hackathon: DraftLens, a trading card ---------- */

export function TradingFace() {
  return (
    <div
      aria-hidden="true"
      className="group/card absolute inset-0 overflow-hidden rounded-[0.8em] bg-[linear-gradient(160deg,#c9622e,#7a2f17)] p-[0.6em]"
    >
      <div className="relative h-full overflow-hidden rounded-[0.45em] bg-[#1b1310]">
        <div className="mx-[0.6em] mt-[0.6em] h-[7.6em] overflow-hidden rounded-[0.3em] bg-[#2a201b] p-[0.4em]">
          <HackathonScene name="draftlens" className="size-full [image-rendering:pixelated]" />
        </div>
        <p className="font-display mt-[0.5em] px-[0.6em] text-[1.25em] leading-none text-cream">
          {draftlens?.title}
        </p>
        <p className="condensed mt-[0.4em] px-[0.9em] text-[0.5em] text-amber">
          {draftlens?.event}
        </p>
        <p className="absolute bottom-[0.5em] left-[0.9em] font-mono text-[0.5em] text-hazel">
          {draftlens?.period}
        </p>
        {/* Holographic sheen, sliding across on hover. */}
        <span className="pointer-events-none absolute inset-0 -translate-x-full bg-[linear-gradient(105deg,transparent_35%,rgb(255_235_200/28%)_50%,transparent_65%)] transition-transform duration-700 group-hover/card:translate-x-full" />
      </div>
    </div>
  )
}

/* ---------- Skills: the keyboard ---------- */

const keyRows = [14, 14, 13, 12]

export function KeyboardFace() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 rounded-[0.9em] bg-[linear-gradient(#3a322c,#231d19)] p-[0.8em] shadow-[inset_0_0.1em_0_rgb(255_255_255/10%)]"
    >
      <div className="flex h-full flex-col justify-between">
        {keyRows.map((count, row) => (
          <div key={row} className="flex justify-between gap-[0.22em]">
            {Array.from({ length: count }, (_, index) => {
              const accent = (row === 0 && index === 0) || (row === 2 && index === count - 1)
              return (
                <span
                  key={index}
                  className={`h-[1.85em] flex-1 rounded-[0.25em] shadow-[inset_0_-0.18em_0_rgb(0_0_0/30%)] ${
                    accent ? (row === 0 ? 'bg-amber' : 'bg-sage') : 'bg-[#e9e0cf]'
                  } ${row === 3 && index === 5 ? 'flex-[5]' : ''}`}
                />
              )
            })}
          </div>
        ))}
      </div>
    </div>
  )
}

/* ---------- Interests: polaroids ---------- */

export function PolaroidsFace() {
  return (
    <div aria-hidden="true" className="absolute inset-0">
      <span className="absolute top-[0.4em] left-[2.6em] h-[11.4em] w-[9.6em] rotate-[12deg] rounded-[0.15em] bg-[#f7f4ee] p-[0.55em] pb-[2.4em]">
        <span className="block h-full bg-[#2f4433] p-[1.2em]">
          <PixelArtIcon name="book" className="size-full [image-rendering:pixelated]" />
        </span>
      </span>
      <span className="absolute top-[0.9em] left-[0.4em] h-[11.4em] w-[9.6em] rotate-[-5deg] rounded-[0.15em] bg-[#fbf9f4] p-[0.55em] pb-[2.4em]">
        <span className="block h-full bg-[#5a2a20] p-[1.2em]">
          <PixelArtIcon name="camera" className="size-full [image-rendering:pixelated]" />
        </span>
        <span className="font-hand absolute right-0 bottom-[0.35em] left-0 text-center text-[1.4em] text-ink">
          after hours
        </span>
      </span>
    </div>
  )
}

/* ---------- Contact: the postcard ---------- */

export function PostcardFace() {
  return (
    <div aria-hidden="true" className="absolute inset-0 rounded-[0.2em] bg-[#f7f2e7] p-[0.5em]">
      <div
        className="relative h-full overflow-hidden bg-cover bg-center [image-rendering:pixelated]"
        style={{ backgroundImage: 'url(/jazz-cafe-background-still.png)' }}
      >
        <span className="absolute inset-0 bg-[linear-gradient(transparent_40%,rgb(20_10_5/70%))]" />
        {/* Franked in Paris: a postmark and its wavy cancel lines. */}
        <svg
          viewBox="0 0 80 40"
          className="absolute top-[0.4em] right-[0.4em] w-[5em] opacity-60"
          fill="none"
          stroke="#f7ecd8"
          strokeWidth="1.2"
        >
          <circle cx="20" cy="20" r="15" />
          <circle cx="20" cy="20" r="11" strokeOpacity="0.6" />
          <path d="M38 12 q5 -4 10 0 t10 0 t10 0 M38 20 q5 -4 10 0 t10 0 t10 0 M38 28 q5 -4 10 0 t10 0 t10 0" />
        </svg>
        <span className="font-display absolute bottom-[0.5em] left-[0.7em] text-[1.35em] leading-none text-[#fff3df]">
          Greetings from Paris
        </span>
      </div>
    </div>
  )
}

/* ---------- Notes pad ---------- */

export function PadFace() {
  return (
    <div aria-hidden="true" className="absolute inset-0">
      <span className="absolute inset-0 translate-x-[0.25em] translate-y-[0.3em] bg-[#d9bb54]" />
      <span className="absolute inset-0 translate-x-[0.12em] translate-y-[0.15em] bg-[#e5c862]" />
      <div className="absolute inset-0 bg-[#f2d675] px-[0.9em] pt-[1.2em] text-[#4a3b12] shadow-[inset_0_0.5em_0.4em_-0.3em_rgb(0_0_0/12%)]">
        <p className="font-hand text-[1.9em] leading-[0.9]">leave a note</p>
        <p className="font-hand mt-[0.3em] text-[1.1em] text-[#7a6420]">for Arnaud ↓</p>
      </div>
    </div>
  )
}

/* ---------- The clock: real time in Paris ---------- */

function parisTime(): [string, string] {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: profile.timezone,
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).formatToParts(new Date())
  return [
    parts.find((p) => p.type === 'hour')?.value ?? '--',
    parts.find((p) => p.type === 'minute')?.value ?? '--',
  ]
}

export function ClockFace() {
  const [time, setTime] = useState<[string, string]>(['--', '--'])
  useEffect(() => {
    const tick = () => setTime(parisTime())
    tick()
    const timer = window.setInterval(tick, 15_000)
    return () => window.clearInterval(timer)
  }, [])
  return (
    <div className="absolute inset-0 flex items-center justify-center gap-[0.4em] rounded-[0.9em] bg-[linear-gradient(#2c2420,#171210)] px-[0.8em]">
      <span className="sr-only">
        Time in Paris: {time[0]}:{time[1]}
      </span>
      {time.map((value, index) => (
        <span
          key={index}
          aria-hidden="true"
          className="relative grid h-[4.6em] w-[3.6em] place-items-center rounded-[0.35em] bg-[#0e0b09] text-[2.6em] leading-none font-semibold text-cream [font-stretch:75%] tabular-nums"
          style={{ fontSize: '2.6em', height: '1.8em', width: '1.45em' }}
        >
          {value}
          <span className="absolute inset-x-0 top-1/2 h-px bg-black/70" />
        </span>
      ))}
    </div>
  )
}
