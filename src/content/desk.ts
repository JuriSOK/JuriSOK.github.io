/**
 * The desk — what lies on it, and where.
 *
 * The whole site is one desk seen from above, at night, under a lamp. Every
 * object on it *is* a piece of content: pick it up and it opens. This file is
 * the layout of that desk, in two arrangements:
 *
 * - `wide`  — a landscape desk, 1600 × 1000 units, for tablets and screens;
 * - `tall`  — a portrait desk, 1000 × 2680 units, scrolled on phones.
 *
 * Units are virtual: the stage converts them to container-query widths, so the
 * desk scales as one piece. `s` scales an object (and its type) in a layout.
 * Purely presentational — no fact lives here.
 */

export type DeskItemId =
  | 'lamp'
  | 'mug'
  | 'ring'
  | 'pencil'
  | 'clips'
  | 'eraser'
  | 'ball'
  | 'knot'
  | 'wear'
  | 'intro'
  | 'notebook'
  | 'badge'
  | 'cards'
  | 'receipt'
  | 'index'
  | 'slip'
  | 'trading'
  | 'keyboard'
  | 'polaroids'
  | 'postcard'
  | 'laptop'
  | 'radio'
  | 'clock'
  | 'pad'

export interface DeskItem {
  readonly id: DeskItemId
  /** Base footprint, in units, before the layout's scale. */
  readonly w: number
  readonly h: number
  /** Handwritten tag shown when the object is hovered or focused. */
  readonly tag?: string
  /** What opening it reveals — read by screen readers, listed in the desk index. */
  readonly label?: string
  /** `true` when the object opens in the inspector. */
  readonly opens: boolean
  /**
   * Set dressing: lived-in details with no content. Never interactive, never
   * focusable, hidden from assistive technology, always under the objects.
   */
  readonly decor?: true
  /**
   * Set dressing you can still play with — knock the mug over, flick the
   * paper ball. No content behind it: a small reward for poking around.
   */
  readonly toy?: true
}

export interface Placement {
  readonly x: number
  readonly y: number
  /** Rotation, degrees. */
  readonly r: number
  /** Scale in this layout (default 1). */
  readonly s?: number
  /** Not placed in this layout. */
  readonly hidden?: boolean
}

export interface DeskLayout {
  readonly w: number
  readonly h: number
  /**
   * Centre of the pool of light on the wood, in units. The light itself comes
   * from the lamp's shade (see `lampSource`): brightness is read from the
   * pool, shadows are cast away from the shade.
   */
  readonly light: { readonly x: number; readonly y: number; readonly radius: number }
  readonly place: Record<DeskItemId, Placement>
}

/** Keyboard and reading order: the story first, the tools of the room last. */
export const deskItems: readonly DeskItem[] = [
  { id: 'intro', w: 360, h: 320, opens: false },
  { id: 'notebook', w: 330, h: 230, opens: true, tag: 'about me', label: 'About — the notebook' },
  {
    id: 'badge',
    w: 180,
    h: 262,
    opens: true,
    tag: 'where i work',
    label: 'Experience — the work badge',
  },
  {
    id: 'cards',
    w: 250,
    h: 160,
    opens: true,
    tag: 'where i study',
    label: 'Education — the student cards',
  },
  {
    id: 'receipt',
    w: 160,
    h: 270,
    opens: true,
    tag: 'a project',
    label: 'Project — Personal Finance Tracker',
  },
  { id: 'index', w: 270, h: 180, opens: true, tag: 'a project', label: 'Project — MiniSGBDR' },
  { id: 'slip', w: 250, h: 180, opens: true, tag: 'a hackathon', label: 'Hackathon — KinCall' },
  {
    id: 'trading',
    w: 170,
    h: 240,
    opens: true,
    tag: 'a hackathon',
    label: 'Hackathon — DraftLens',
  },
  {
    id: 'keyboard',
    w: 470,
    h: 170,
    opens: true,
    tag: 'what i work with',
    label: 'Skills — the keyboard',
  },
  {
    id: 'polaroids',
    w: 220,
    h: 200,
    opens: true,
    tag: 'after hours',
    label: 'Interests — the polaroids',
  },
  {
    id: 'postcard',
    w: 260,
    h: 150,
    opens: true,
    tag: 'write to me',
    label: 'Contact — the postcard',
  },
  { id: 'laptop', w: 440, h: 290, opens: false },
  {
    id: 'pad',
    w: 150,
    h: 140,
    opens: true,
    tag: 'leave a note',
    label: 'Leave a note on the desk',
  },
  { id: 'radio', w: 230, h: 140, opens: false },
  { id: 'clock', w: 170, h: 110, opens: false },
  { id: 'lamp', w: 420, h: 380, opens: false },
  /* Set dressing, drawn under everything else. */
  { id: 'knot', w: 130, h: 70, opens: false, decor: true },
  { id: 'wear', w: 320, h: 120, opens: false, decor: true },
  { id: 'ring', w: 96, h: 96, opens: false, decor: true },
  { id: 'mug', w: 116, h: 104, opens: false, decor: true, toy: true },
  { id: 'pencil', w: 210, h: 16, opens: false, decor: true },
  { id: 'clips', w: 56, h: 46, opens: false, decor: true },
  { id: 'eraser', w: 54, h: 26, opens: false, decor: true },
  { id: 'ball', w: 74, h: 70, opens: false, decor: true, toy: true },
]

/**
 * Where the shade sits inside the lamp drawing (units, before scale): the
 * actual light source. Shadows on the desk are cast away from this point.
 */
export const SHADE = { x: 300, y: 265 } as const

export function lampSource(layout: DeskLayout): { x: number; y: number } {
  const lamp = layout.place.lamp
  const scale = lamp.s ?? 1
  return { x: lamp.x + SHADE.x * scale, y: lamp.y + SHADE.y * scale }
}

export const deskLayouts: Record<'wide' | 'tall', DeskLayout> = {
  wide: {
    w: 1600,
    h: 1000,
    light: { x: 430, y: 380, radius: 1150 },
    place: {
      lamp: { x: -60, y: -75, r: 0 },
      knot: { x: 1468, y: 650, r: 8 },
      wear: { x: 1130, y: 560, r: -3 },
      ring: { x: 14, y: 660, r: 0 },
      mug: { x: 300, y: 300, r: -25 },
      pencil: { x: 1300, y: 925, r: -10 },
      clips: { x: 930, y: 586, r: 14 },
      eraser: { x: 700, y: 625, r: 62 },
      ball: { x: 360, y: 892, r: 0 },
      radio: { x: 70, y: 300, r: -7 },
      intro: { x: 420, y: 60, r: -2.5 },
      notebook: { x: 110, y: 500, r: -6 },
      badge: { x: 520, y: 430, r: 7 },
      cards: { x: 760, y: 410, r: -8 },
      laptop: { x: 860, y: 40, r: 3 },
      clock: { x: 1350, y: 100, r: -4 },
      pad: { x: 1418, y: 222, r: 5 },
      keyboard: { x: 1060, y: 400, r: -3 },
      receipt: { x: 470, y: 720, r: -10 },
      index: { x: 700, y: 680, r: 4 },
      slip: { x: 1010, y: 640, r: -6 },
      trading: { x: 1290, y: 620, r: 8 },
      polaroids: { x: 130, y: 780, r: 6 },
      postcard: { x: 990, y: 840, r: -3 },
    },
  },
  tall: {
    w: 1000,
    h: 2680,
    light: { x: 400, y: 500, radius: 1500 },
    place: {
      lamp: { x: -90, y: 10, r: 0, s: 1.1 },
      knot: { x: 770, y: 2550, r: 6, s: 1.2 },
      wear: { x: 120, y: 2430, r: -2, s: 1.4 },
      ring: { x: 486, y: 1190, r: 0, s: 1.15 },
      mug: { x: 842, y: 500, r: 20, s: 1.15 },
      pencil: { x: 770, y: 840, r: 78, s: 1.1 },
      clips: { x: 470, y: 2040, r: 14, s: 1.3 },
      eraser: { x: 440, y: 1640, r: 30, s: 1.3 },
      ball: { x: 440, y: 1500, r: 0, s: 1.2 },
      laptop: { x: 545, y: 92, r: 4, s: 0.93 },
      intro: { x: 45, y: 380, r: -2, s: 2.05 },
      notebook: { x: 50, y: 1080, r: -5, s: 1.3 },
      badge: { x: 610, y: 1060, r: 7, s: 1.25 },
      cards: { x: 80, y: 1430, r: -7, s: 1.2 },
      receipt: { x: 650, y: 1440, r: -8, s: 1.2 },
      index: { x: 60, y: 1690, r: 4, s: 1.2 },
      trading: { x: 690, y: 1820, r: 8, s: 1.15 },
      slip: { x: 80, y: 1960, r: -5, s: 1.2 },
      keyboard: { x: 50, y: 2230, r: -3, s: 1.15 },
      polaroids: { x: 660, y: 2160, r: 6, s: 1.05 },
      postcard: { x: 430, y: 2480, r: -3, s: 1.1 },
      radio: { x: 50, y: 2490, r: -6, s: 1.1 },
      pad: { x: 790, y: 2380, r: 6, s: 1 },
      clock: { x: 0, y: 80, r: 0, hidden: true },
    },
  },
}
