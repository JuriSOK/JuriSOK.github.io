/**
 * Names of the original pixel-art drawings.
 *
 * These unions live in the types layer so that content files can reference an
 * illustration without importing a component. Every drawing is local, original
 * work in the warm café palette — never an emoji, an icon library or a
 * copyrighted sprite.
 */

/** Small icons: interests and skill-category headings. */
export type PixelIconName =
  | 'camera'
  | 'microphone'
  | 'chip'
  | 'cinema'
  | 'book'
  | 'ai-data'
  | 'software'
  | 'database'
  | 'observability'

/** Full sleeve scenes for the two current projects. */
export type ProjectArtName = 'personal-finance-tracker' | 'minisgbdr'

/** Scenes of the hackathon concept cards. */
export type HackathonArtName = 'incident-copilot' | 'workflow-studio' | 'accessible-toolkit'
