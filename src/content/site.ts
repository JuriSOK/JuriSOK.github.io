/**
 * Site-wide copy: the arrival, the intro note on the desk, the screen-reader guide,
 * the visitor notes. Every fact comes from the other content files; only the
 * tone is written for the site.
 */
export const site = {
  title: 'Vibol Arnaud Sok — Data Analyst · the desk',
  description:
    'Portfolio of Vibol Arnaud Sok, Data Analyst apprentice at Crédit Agricole Assurances and Master’s student in MIAGE at Université Paris Dauphine-PSL.',

  arrival: {
    /** `{time}` is replaced by the real time in Paris. */
    line: 'it’s {time} in Paris. Arnaud is still at his desk.',
    lamp: 'switch on the lamp',
    lampAndRadio: 'lamp + radio',
  },

  intro: {
    hello: 'hi, i’m Arnaud',
    /** Typed line under the handwritten greeting. */
    role: 'Data Analyst · MIAGE @ Dauphine · Paris',
    note: 'this is my desk. everything on it opens — pick things up, move them around.',
    ps: 'p.s. the radio works.',
  },

  /** Read first by screen readers: how the desk works. Never shown. */
  srGuide:
    'This portfolio is a desk. Each object on it is a button that opens one part of the portfolio — about, experience, education, projects, hackathons, skills, interests, contact. The “what’s on the desk?” menu, top right, lists them all.',
} as const

/**
 * Notes left on the desk — a local guestbook.
 *
 * SIMULATED: notes are stored in this browser's `localStorage` only. Nobody
 * else can read them, and nothing is sent anywhere.
 */
export const visitorNotes = {
  title: 'leave a note',
  subtitle: 'it stays on the desk — in your browser only.',
  placeholder: 'a few words for Arnaud…',
  signaturePlaceholder: 'your name',
  submit: 'stick it on the desk',
  storageKey: 'desk:notes',
  maxLength: 140,
  maxNotes: 6,
} as const
