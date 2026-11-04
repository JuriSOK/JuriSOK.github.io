'use client'

import { links } from '@/content/links'
import { useSound } from '@/components/sound/SoundProvider'
import { Icon } from '@/components/ui/Icon'

/**
 * Laptop, closed: its stickers are the ways to reach Arnaud. Each sticker is a
 * real link, die-cut and slightly crooked, peeling up a little on hover.
 */
export function LaptopFace() {
  const { play } = useSound()
  const sticker =
    'absolute grid place-items-center border-[0.3em] border-white shadow-[0_0.2em_0.4em_rgb(0_0_0/35%)] transition-transform duration-300 ease-[cubic-bezier(0.34,1.45,0.64,1)] hover:scale-110 hover:-rotate-3 focus-visible:scale-110'
  return (
    <div className="absolute inset-0 rounded-[1.2em] bg-[linear-gradient(150deg,#4a494e,#2b2a2e_55%,#232226)] shadow-[inset_0_0.1em_0_rgb(255_255_255/18%)]">
      <span
        aria-hidden="true"
        className="absolute inset-x-[30%] bottom-0 h-[0.6em] rounded-t-[0.5em] bg-[#1a191c]"
      />
      <a
        href={links.github}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => play('tick')}
        className={`${sticker} top-[2.6em] left-[3em] size-[7.4em] rotate-[-8deg] rounded-full bg-[#1b1f24] text-white`}
      >
        <Icon name="github" size={44} className="h-[3.6em] w-[3.6em]" />
        <span className="sr-only">GitHub (opens in a new tab)</span>
      </a>
      <a
        href={links.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => play('tick')}
        className={`${sticker} top-[3.4em] left-[12.6em] h-[4.6em] w-[8.6em] rotate-[6deg] rounded-[0.9em] bg-[#0a66c2] text-white`}
      >
        <span className="font-sans text-[1.7em] font-bold tracking-tight">linkedin</span>
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
      <a
        href={`mailto:${links.email}`}
        onClick={() => play('tick')}
        className={`${sticker} top-[10.2em] left-[15.2em] h-[5.4em] w-[10em] rotate-[-4deg] rounded-[50%] bg-amber text-night`}
      >
        <span className="font-hand text-[2.3em] leading-none font-bold">say hi!</span>
        <span className="sr-only"> — email Arnaud</span>
      </a>
      <span
        aria-hidden="true"
        className="absolute top-[12.2em] left-[2.2em] rotate-[5deg] border-[0.25em] border-white bg-[#f2e3c4] px-[0.8em] py-[0.4em] font-mono text-[0.95em] text-ink shadow-[0_0.2em_0.4em_rgb(0_0_0/35%)]"
      >
        SELECT * FROM ideas;
      </span>
    </div>
  )
}

/**
 * The radio — the trio lives in it. The body switches it on and off; the
 * knob asks for another tune. A small lamp glows while it plays.
 */
export function RadioFace() {
  const { music, setMusic, requestTune, inside, enter } = useSound()
  const toggle = () => {
    if (!inside) {
      enter(true)
      return
    }
    setMusic(!music)
  }
  return (
    <div className="absolute inset-0 rounded-[1em] bg-[linear-gradient(160deg,#e9dcc0,#cdb991)] p-[0.8em] shadow-[inset_0_-0.25em_0_rgb(0_0_0/18%)]">
      <button
        type="button"
        onClick={toggle}
        aria-pressed={music}
        aria-label={
          music ? 'Switch the radio off' : 'Switch the radio on — a jazz trio composed live'
        }
        className="absolute inset-0 rounded-[1em]"
      />
      {/* Speaker grille. */}
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute top-[1em] bottom-[1em] left-[1em] w-[6.4em] rounded-[0.5em] bg-[#3a2c22] [background-image:radial-gradient(#8a7055_0.18em,transparent_0.2em)] [background-size:0.65em_0.65em] ${music ? 'breathe' : ''}`}
      />
      {/* Dial window. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute top-[1.2em] right-[1em] left-[8.3em] h-[2.4em] overflow-hidden rounded-[0.35em] bg-[#1b1512]"
      >
        <span className="absolute inset-x-[0.5em] top-[0.4em] flex justify-between font-mono text-[0.45em] text-amber/80">
          {['88', '92', '96', '100', '104', '108'].map((mhz) => (
            <span key={mhz}>{mhz}</span>
          ))}
        </span>
        <span
          className={`absolute top-0 bottom-0 w-[0.12em] bg-[#ff6a3d] transition-[left] duration-700 ${music ? 'needle-drift left-[58%]' : 'left-[18%]'}`}
        />
      </span>
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute top-[4.5em] right-[1.2em] size-[0.55em] rounded-full ${music ? 'bg-[#ff7a45] shadow-[0_0_0.6em_#ff7a45]' : 'bg-[#6b5a48]'}`}
      />
      <button
        type="button"
        onClick={requestTune}
        aria-label={music ? 'Turn the knob — another tune' : 'Turn the knob — switch the radio on'}
        className="absolute right-[2.6em] bottom-[0.9em] size-[3.2em] rounded-full bg-[radial-gradient(circle_at_40%_35%,#8a7a68,#3a2f26)] shadow-[0_0.15em_0.3em_rgb(0_0_0/45%)] transition-transform duration-500 hover:rotate-45 active:rotate-90"
      >
        <span
          aria-hidden="true"
          className="absolute top-[0.35em] left-1/2 h-[0.9em] w-[0.18em] -translate-x-1/2 rounded-full bg-cream"
        />
      </button>
    </div>
  )
}
