/**
 * Content layer types.
 *
 * General rule: anything not yet provided is **optional** or `null`. A missing
 * field is never rendered — no filler text, no dead link.
 */

import type { HackathonArtName, PixelIconName } from './pixel-art'
import type { ProjectLink } from './project'

export interface Profile {
  readonly fullName: string
  readonly role: string
  /** Employment type, e.g. « Apprenticeship ». */
  readonly contract: string
  readonly company: string
  /** City-level at most. Never a postal address. */
  readonly location: string
  /** IANA timezone used to display the local time, e.g. « Europe/Paris ». */
  readonly timezone: string
  /**
   * Professional domains. Kept as profile data although nothing surfaces them
   * today: the About facts list that displayed them has been removed. The
   * experience entries carry their own, separate `domains`.
   */
  readonly domains: readonly string[]
}

/**
 * Public contact channels.
 *
 * Deliberately limited to three. Phone number, postal address and CV are
 * excluded by instruction and must not be added to this type.
 */
export interface SiteLinks {
  readonly email: string
  readonly linkedin: string
  readonly github: string
}

/* ---------- Page registry ---------- */

/**
 * A section of the single-page narrative. The registry only describes
 * **sections that are actually built**: an entry here guarantees the component
 * exists. Whether it is rendered — and listed in the navigation — depends on
 * `hasContent`, computed in `sections.ts`.
 */
export interface SectionDefinition {
  /** Anchor id, doubling as the URL hash — `#projects` is a shareable link. */
  readonly id: string
  /** Short name used in the navigation. */
  readonly label: string
  /** Section heading. Plain and readable: the metaphor lives in the cue. */
  readonly title: string
  /**
   * Moment of the evening, e.g. « 9:00 pm · liner notes ». It is the thread
   * of the page — a set clock that advances as the visitor scrolls.
   */
  readonly cue: string
  /** Editorial line shown under the heading. */
  readonly kicker?: string
}

/** Theme preference. `system` follows `prefers-color-scheme`. */
export type ThemePreference = 'light' | 'dark' | 'system'

/**
 * Props every section component receives.
 *
 * The definition is handed down by `App` rather than looked up by id inside the
 * component. That is deliberate: a lookup by string can silently fail when an
 * id changes, leaving a navigation link that points at nothing. Passing the
 * object makes the link and its section the same value.
 */
export interface PageProps {
  readonly section: SectionDefinition
}

/* ---------- About ---------- */

export interface AboutContent {
  readonly paragraphs: readonly string[]
}

/** A personal value: one word, one sentence. */
export interface Value {
  readonly id: string
  readonly name: string
  readonly line: string
}

/** A field Vibol Arnaud Sok wants to work in. */
export interface FocusArea {
  readonly id: string
  readonly name: string
  readonly line: string
}

/* ---------- Hero ---------- */

export interface HeroContent {
  /** One-line introduction under the name. */
  readonly lead: string
}

/* ---------- Resume ---------- */

export interface Experience {
  readonly id: string
  readonly organisation: string
  /** Locally stored organisation logo. Decorative: the name is displayed beside it. */
  readonly logo?: string
  readonly role?: string
  /** Employment type, shown as a discreet stamp. */
  readonly contract?: string
  readonly period?: string
  readonly summary?: string
  readonly missions?: readonly string[]
  readonly domains?: readonly string[]
  readonly tools?: readonly string[]
  /** Shows the « Current » stamp. */
  readonly current?: boolean
}

export interface Education {
  readonly id: string
  readonly degree: string
  /** Secondary line under the degree, e.g. the field spelled out. */
  readonly subtitle?: string
  readonly school?: string
  readonly location?: string
  readonly period?: string
  /**
   * Path to a locally stored institutional logo. When absent, the institution
   * name is rendered as a typographic mark instead — never an invented logo.
   */
  readonly logo?: string
  readonly fields?: readonly string[]
  readonly highlights?: readonly string[]
}

/* ---------- Skills ---------- */

export interface SkillDomain {
  readonly id: string
  readonly title: string
  /** Pixel-art icon beside the category heading. Decorative. */
  readonly icon: PixelIconName
  /** What Vibol Arnaud Sok actually does with it. */
  readonly usage?: string
  /** Tools and technologies, rendered as logo + name badges. */
  readonly tools?: readonly string[]
  readonly contexts?: readonly string[]
}

/* ---------- Interests ---------- */

/** External profile linked from inside an expanded interest. */
export interface InterestLink {
  readonly label: string
  readonly href: string
  /** Brand mark drawn beside the label. */
  readonly mark: 'letterboxd'
}

export interface Interest {
  readonly id: string
  readonly label: string
  /** Pixel-art icon shown on the closed row. Decorative. */
  readonly icon: PixelIconName
  /** Paragraphs revealed when the row is expanded. May be empty. */
  readonly detail: readonly string[]
  /** Optional link, revealed with the detail. Never on the closed row. */
  readonly link?: InterestLink
}

/* ---------- Contact ---------- */

export interface ContactContent {
  /** Headline opening the page. */
  readonly heading?: string
  /** Invitation sentence under the headline. */
  readonly invitation?: string
}

/* ---------- Hackathons ---------- */

/**
 * A real hackathon participation.
 *
 * `outcome` exists only for a confirmed, public result. No prize, ranking or
 * figure is ever written without one — a submission alone gets no outcome.
 */
export interface Hackathon {
  readonly id: string
  readonly title: string
  /** Name of the event the project was built for. */
  readonly event: string
  /** Month or season, as provided — never a guessed exact date. */
  readonly period: string
  /** What Vibol Arnaud Sok did on the project. */
  readonly role: string
  readonly summary: string
  readonly outcome?: string
  readonly technologies: readonly string[]
  /** Source first, then any write-up page. */
  readonly links: readonly ProjectLink[]
  readonly pixelArt: HackathonArtName
}
