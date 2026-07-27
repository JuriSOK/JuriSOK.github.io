import type { PixelIconName } from '../../types/pixel-art'
import { PixelGrid } from './PixelGrid'

/**
 * Small original pixel-art icons, 12 × 12 cells, warm café palette.
 *
 * All decorative: the visible text next to them always names the subject, so
 * the SVG stays `aria-hidden` (handled by PixelGrid).
 */

const icons: Record<PixelIconName, readonly string[]> = {
  /* A compact camera: leather body, latte face, copper lens. */
  camera: [
    '............',
    '....kkk.....',
    '.kkkkkkkkkk.',
    '.kLLLLLLLLk.',
    '.kLLkkkkLLk.',
    '.kLkCMCCkLk.',
    '.kLkCKKCkLk.',
    '.kLkCCCCkLk.',
    '.kLLkkkkLLk.',
    '.kkkkkkkkkk.',
    '............',
    '............',
  ],

  /* A microphone on its stand, with two copper sound arcs. */
  microphone: [
    '............',
    '....kkk.....',
    '...kMMMk....',
    '...kMMMk.C..',
    '...kMMMk..C.',
    '...kMMMk.C..',
    '....kkk.....',
    '.....k......',
    '.....k......',
    '...kkkkk....',
    '............',
    '............',
  ],

  /* A chip: copper core, latte substrate, pins top and bottom. */
  chip: [
    '............',
    '..C..C..C...',
    '.kkkkkkkkkk.',
    '.kLLLLLLLLk.',
    '.kLLCCCCLLk.',
    '.kLLCCCCLLk.',
    '.kLLCCCCLLk.',
    '.kLLLLLLLLk.',
    '.kkkkkkkkkk.',
    '..C..C..C...',
    '............',
    '............',
  ],

  /* A cinema screen on its stand, warm picture glowing. */
  cinema: [
    '............',
    '.kkkkkkkkkk.',
    '.kMMMMMMMMk.',
    '.kMMMMMMMMk.',
    '.kMLLLLLLMk.',
    '.kMLCCCCLMk.',
    '.kMMMMMMMMk.',
    '.kkkkkkkkkk.',
    '.....kk.....',
    '....kkkk....',
    '............',
    '............',
  ],

  /* An open book, caramel lines of text on cream pages. */
  book: [
    '............',
    '............',
    '.kk......kk.',
    '.kMkk..kkMk.',
    '.kMMMkkMMMk.',
    '.kMAAMkMAAMk',
    '.kMMMMkMMMMk',
    '.kMAAMkMAAMk',
    '.kMMMMkMMMMk',
    '..kkkkkkkkk.',
    '............',
    '............',
  ],

  /* A rising bar chart: green, latte then copper. */
  'ai-data': [
    '............',
    '.k..........',
    '.k..........',
    '.k.......CC.',
    '.k.......CC.',
    '.k....LL.CC.',
    '.k....LL.CC.',
    '.k.GG.LL.CC.',
    '.k.GG.LL.CC.',
    '.k.GG.LL.CC.',
    '.kkkkkkkkkk.',
    '............',
  ],

  /* A laptop showing latte lines of code. */
  software: [
    '............',
    '............',
    '..kkkkkkkk..',
    '..kKKKKKKk..',
    '..kKLLKKKk..',
    '..kKLLLLKk..',
    '..kKLLKKKk..',
    '..kKKKKKKk..',
    '..kkkkkkkk..',
    '.kkkkkkkkkk.',
    '............',
    '............',
  ],

  /* Server drawers, each with a small green status light. */
  database: [
    '............',
    '............',
    '.kkkkkkkkkk.',
    '.kLLLLLLGgk.',
    '.kkkkkkkkkk.',
    '.kLLLLLLGgk.',
    '.kkkkkkkkkk.',
    '.kLLLLLLGgk.',
    '.kkkkkkkkkk.',
    '............',
    '............',
    '............',
  ],

  /* A monitoring screen: rising latte curve, green status dot. */
  observability: [
    '............',
    '.kkkkkkkkkk.',
    '.kKKKKKKKGk.',
    '.kKKKKKLLKk.',
    '.kKKKLLKKKk.',
    '.kKLLKKKKKk.',
    '.kLKKKKKKKk.',
    '.kKKKKKKKKk.',
    '.kkkkkkkkkk.',
    '....kkkk....',
    '............',
    '............',
  ],
}

interface PixelArtIconProps {
  readonly name: PixelIconName
  readonly className?: string | undefined
}

export function PixelArtIcon({ name, className }: PixelArtIconProps) {
  return <PixelGrid rows={icons[name]} className={className} />
}
