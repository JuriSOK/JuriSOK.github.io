/**
 * Content layer types.
 *
 * General rule: anything not yet provided is **optional** or `null`. A missing
 * field is never rendered — no filler text, no dead link.
 */

import type { HackathonArtName, PixelIconName } from './pixel-art'

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
 * A page of the main panel. The registry only describes **pages that are
 * actually built**: an entry here guarantees the component exists. Whether it
 * becomes a tab depends on `hasContent`, computed in `sections.ts`.
 */
export interface SectionDefinition {
  readonly id: string
  readonly label: string
  /** Editorial line shown under the page title. */
  readonly kicker?: string
}

/**
 * Props every page component receives.
 *
 * The definition is handed down by `App` rather than looked up by id inside the
 * component. That is deliberate: a lookup by string can silently fail when an
 * id changes, leaving a tab that opens an empty panel. Passing the object makes
 * the tab and its page the same value, so they cannot disagree.
 */
export interface PageProps {
  readonly section: SectionDefinition
}

/* ---------- About ---------- */

export interface AboutContent {
  readonly paragraphs: readonly string[]
  /** Path to a portrait, or `null`. The page works perfectly without one. */
  readonly portrait: string | null
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
 * A hackathon **concept** — not a participation.
 *
 * No hackathon has been attended yet, and this type is built so nothing can
 * pretend otherwise: the status is the literal `'Concept'`, and there is no
 * field for a date, an organiser, a team, a ranking or a result.
 */
export interface HackathonConcept {
  readonly id: string
  readonly title: string
  readonly summary: string
  readonly technologies: readonly string[]
  readonly status: 'Concept'
  readonly pixelArt: HackathonArtName
}
