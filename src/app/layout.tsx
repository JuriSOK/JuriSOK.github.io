import type { Metadata, Viewport } from 'next'
import localFont from 'next/font/local'
import { site } from '@/content/site'
import './globals.css'

/* Self-hosted variable fonts, latin subset only. Symbols such as arrows are
   drawn as SVG (`components/ui/Icon.tsx`), never typed as characters. */
const archivo = localFont({
  src: '../fonts/archivo-latin-variable.woff2',
  variable: '--font-archivo',
  weight: '100 900',
  /* The width axis (62–125 %) drives the condensed poster and ticket type. */
  declarations: [{ prop: 'font-stretch', value: '62% 125%' }],
  display: 'swap',
})

const fraunces = localFont({
  src: '../fonts/fraunces-latin-variable.woff2',
  variable: '--font-fraunces',
  weight: '100 900',
  display: 'swap',
})

const caveat = localFont({
  src: '../fonts/caveat-latin-400-700.woff2',
  variable: '--font-caveat',
  weight: '400 700',
  display: 'swap',
})

const plexMono = localFont({
  src: [
    { path: '../fonts/ibm-plex-mono-latin-400.woff2', weight: '400' },
    { path: '../fonts/ibm-plex-mono-latin-500.woff2', weight: '500' },
  ],
  variable: '--font-plex-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: site.title,
  description: site.description,
}

export const viewport: Viewport = {
  themeColor: '#100b08',
}

/**
 * Before the first paint: `data-js="on"` (the desk starts in the dark only
 * when JavaScript can switch the lamp on) and `data-motion="on"` when reduced
 * motion is not requested. Without JavaScript, the desk is lit and the plain
 * version below it carries every word.
 */
const motionScript = `(function(){var d=document.documentElement;d.dataset.js='on';try{if(!matchMedia('(prefers-reduced-motion: reduce)').matches){d.dataset.motion='on'}}catch(e){}})()`

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${fraunces.variable} ${caveat.variable} ${plexMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: motionScript }} />
      </head>
      <body className="grain">{children}</body>
    </html>
  )
}
