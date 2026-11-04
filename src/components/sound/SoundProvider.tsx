'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import type { ClubAudio, SoundName, SoundState } from '@/lib/audio/ClubAudio'

const STORAGE_KEY = 'club:sound'

interface SoundContextValue extends SoundState {
  /** `true` once the lamp is on (with or without sound). */
  readonly inside: boolean
  /** Switch the lamp on. `withSound` also turns on the radio and the room sounds. */
  readonly enter: (withSound: boolean) => void
  readonly setMusic: (on: boolean) => void
  readonly setEffects: (on: boolean) => void
  readonly play: (name: SoundName) => void
  readonly requestTune: () => void
}

/** Last saved mix, or both on. Never both off: « with sound » must make sound. */
function storedPreference(): SoundState {
  try {
    const parsed: unknown = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? 'null')
    if (typeof parsed === 'object' && parsed !== null && 'music' in parsed && 'effects' in parsed) {
      const { music, effects } = parsed as SoundState
      if (music || effects) {
        return { music: Boolean(music), effects: Boolean(effects) }
      }
    }
  } catch {
    /* Unreadable storage: fall through to the default. */
  }
  return { music: true, effects: true }
}

const SoundContext = createContext<SoundContextValue | null>(null)

export function useSound(): SoundContextValue {
  const value = useContext(SoundContext)
  if (value === null) {
    throw new Error('useSound must be used inside <SoundProvider>')
  }
  return value
}

/**
 * Owns the audio engine and the visitor's sound preferences.
 *
 * - Nothing plays until the visitor asks: the engine is created inside the
 *   click handler of « step inside », which is what browsers require.
 * - Preferences persist (`club:sound`) and are reused when a returning visitor
 *   steps inside with sound — but the page still never makes noise on load.
 * - The engine is loaded lazily (dynamic import), so a visitor who stays quiet
 *   never downloads it.
 * - Hidden tab: the band fades out and the context is suspended.
 */
export function SoundProvider({ children }: { children: ReactNode }) {
  const engine = useRef<ClubAudio | null>(null)
  const [state, setState] = useState<SoundState>({ music: false, effects: false })
  const [inside, setInside] = useState(false)

  const persist = (next: SoundState) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
    } catch {
      /* Private mode: preferences last for this visit only. */
    }
  }

  const ensureEngine = useCallback(async (): Promise<ClubAudio | null> => {
    if (engine.current !== null) {
      return engine.current
    }
    if (typeof window === 'undefined' || typeof AudioContext === 'undefined') {
      return null
    }
    const { ClubAudio } = await import('@/lib/audio/ClubAudio')
    engine.current = new ClubAudio()
    /* The radio is on the desk, in the room: no wall between it and you. */
    engine.current.setScene(0.5)
    return engine.current
  }, [])

  const apply = useCallback(
    async (next: SoundState) => {
      setState(next)
      persist(next)
      if (!next.music && !next.effects && engine.current === null) {
        return
      }
      const audio = await ensureEngine()
      await audio?.start(next)
    },
    [ensureEngine],
  )

  const enter = useCallback(
    (withSound: boolean) => {
      setInside(true)
      if (withSound) {
        /* A returning visitor keeps the mix they chose last time. */
        void apply(storedPreference()).then(() => engine.current?.play('lamp'))
      }
    },
    [apply],
  )

  const setMusic = useCallback((on: boolean) => void apply({ ...state, music: on }), [apply, state])
  const setEffects = useCallback(
    (on: boolean) => void apply({ ...state, effects: on }),
    [apply, state],
  )
  const play = useCallback((name: SoundName) => engine.current?.play(name), [])
  const requestTune = useCallback(() => {
    if (!state.music) {
      void apply({ ...state, music: true })
      return
    }
    engine.current?.reseed()
    engine.current?.play('request')
  }, [apply, state])

  useEffect(() => {
    const onVisibility = () => void engine.current?.setAway(document.hidden)
    document.addEventListener('visibilitychange', onVisibility)
    return () => document.removeEventListener('visibilitychange', onVisibility)
  }, [])

  const value = useMemo<SoundContextValue>(
    () => ({ ...state, inside, enter, setMusic, setEffects, play, requestTune }),
    [state, inside, enter, setMusic, setEffects, play, requestTune],
  )

  return <SoundContext.Provider value={value}>{children}</SoundContext.Provider>
}
