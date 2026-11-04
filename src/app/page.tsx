import { Desk } from '@/components/desk/Desk'
import { links } from '@/content/links'
import { profile } from '@/content/profile'
import { SoundProvider } from '@/components/sound/SoundProvider'

export default function Home() {
  return (
    <SoundProvider>
      <main id="top">
        <Desk />
        {/* The desk opens its objects with JavaScript. Without it, the visitor
            still gets who this is and how to reach him — not a second site. */}
        <noscript>
          <p className="fixed inset-x-4 bottom-4 z-[300] rounded-xl bg-night/90 p-4 text-center text-sm text-cream">
            {profile.fullName} — {profile.role}. The objects on this desk open with JavaScript.
            Meanwhile:{' '}
            <a className="underline" href={`mailto:${links.email}`}>
              {links.email}
            </a>{' '}
            ·{' '}
            <a className="underline" href={links.linkedin}>
              LinkedIn
            </a>{' '}
            ·{' '}
            <a className="underline" href={links.github}>
              GitHub
            </a>
          </p>
        </noscript>
      </main>
    </SoundProvider>
  )
}
