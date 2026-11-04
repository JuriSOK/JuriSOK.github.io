/**
 * Interface icons, drawn as inline SVG strokes.
 *
 * Original simple geometry (plus the GitHub mark from Simple Icons, CC0). No
 * icon library: the set is small and every glyph stays aligned with the text.
 * Always decorative — each icon sits beside a visible label or an aria-label.
 */

export type IconName =
  | 'github'
  | 'linkedin'
  | 'mail'
  | 'arrowDown'
  | 'arrowUp'
  | 'arrowUpRight'
  | 'chat'
  | 'napkin'
  | 'sun'
  | 'moon'
  | 'monitor'
  | 'copy'
  | 'check'
  | 'close'
  | 'send'
  | 'lamp'
  | 'speaker'
  | 'speakerOff'

const strokes: Record<Exclude<IconName, 'github'>, string> = {
  linkedin: 'M4 9v11M4 5v.01M9 20v-6.5a3.5 3.5 0 0 1 7 0V20M9 9v11M16 13.5V20h4v-7a4 4 0 0 0-7-2.6',
  mail: 'M3.5 6h17v12h-17zM3.5 7l8.5 6 8.5-6',
  arrowDown: 'M12 5v14M6 13l6 6 6-6',
  arrowUp: 'M12 19V5M6 11l6-6 6 6',
  arrowUpRight: 'M7 17 17 7M9 7h8v8',
  chat: 'M20 12a8 8 0 0 1-11.6 7.1L4 20l1-4.2A8 8 0 1 1 20 12z',
  napkin: 'M5 4h14v12l-4 4H5zM15 20v-4h4M8.5 9h7M8.5 12.5h4.5',
  sun: 'M12 8.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7zM12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6 7 7M17 17l1.4 1.4M5.6 18.4 7 17M17 7l1.4-1.4',
  moon: 'M19.5 14.5A8 8 0 0 1 9.5 4.5a8 8 0 1 0 10 10z',
  monitor: 'M3.5 5h17v11h-17zM9 20h6M12 16v4',
  copy: 'M9 9h11v11H9zM5 15H4V4h11v1',
  check: 'M5 12.5 10 17l9-10',
  close: 'M6 6l12 12M18 6 6 18',
  send: 'M12 19V6M6.5 11.5 12 6l5.5 5.5',
  lamp: 'M8 3h8l3 7H5zM12 10v8M8 21h8',
  speaker: 'M4 9.5h3.5L12 5.5v13l-4.5-4H4zM15.5 9a4 4 0 0 1 0 6M18 6.5a7.5 7.5 0 0 1 0 11',
  speakerOff: 'M4 9.5h3.5L12 5.5v13l-4.5-4H4zM16 9.5l5 5M21 9.5l-5 5',
}

const githubMark =
  'M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12'

interface IconProps {
  readonly name: IconName
  readonly size?: number
  readonly className?: string
}

export function Icon({ name, size = 18, className }: IconProps) {
  if (name === 'github') {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
        focusable="false"
        className={className}
      >
        <path d={githubMark} />
      </svg>
    )
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <path d={strokes[name]} />
    </svg>
  )
}
