/**
 * Chez Arnaud — the house trio, played live in the browser.
 *
 * Everything you hear is synthesised with the Web Audio API at run time: no
 * audio file, no sample, no third-party recording. The music is an original
 * composition — a slow swing in F over a ii–V–I turnaround — voiced for an
 * electric piano, a walking upright bass and brushes, with an occasional
 * vibraphone phrase improvised from chord tones. It is generated, so it never
 * loops exactly. See SOUND.md for the full description and licence.
 *
 * Signal flow:
 *
 *   piano ┐                ┌─ dry ──────────┐
 *   bass  ├─ music bus ─ room filter ─┤                ├─ music gain ─┐
 *   drums │                └─ reverb ─ wet ─┘              ├─ master ─ compressor ─ out
 *   vibes ┘                                                │
 *   crackle, glasses ────────────── ambience gain ─────────┤
 *   interface sounds ────────────── effects gain ──────────┘
 *
 * The room filter is the immersion trick: outside the door the trio is muffled
 * through the wall; it opens up as the visitor walks in, and closes again at
 * closing time. On the desk, the trio plays from the radio: the room filter
 * stays open (see SoundProvider).
 */

export type SoundName =
  | 'tick'
  | 'door'
  | 'tear'
  | 'strike'
  | 'clink'
  | 'paper'
  | 'buzz'
  | 'request'
  | 'lamp'
  | 'key'
  | 'flip'
  | 'print'
  | 'spill'
  | 'roll'

type Voicing = readonly number[]

interface Bar {
  /** MIDI note of the bass root. */
  readonly root: number
  /** Rootless piano voicing, MIDI notes. */
  readonly voicing: Voicing
  /** Chord tones the vibraphone may pick from (pitch classes 0–11). */
  readonly tones: readonly number[]
}

/* An eight-bar form in F: Gm9 | C13 | Fmaj9 | D7♭9 | Gm9 | C7alt | Fmaj9 | Am7 D7 */
const FORM: readonly Bar[] = [
  { root: 43, voicing: [58, 62, 65, 69], tones: [7, 10, 2, 5, 9] },
  { root: 36, voicing: [58, 64, 69, 74], tones: [0, 4, 7, 10, 2, 9] },
  { root: 41, voicing: [57, 60, 64, 67], tones: [5, 9, 0, 4, 7] },
  { root: 38, voicing: [54, 60, 63, 69], tones: [2, 6, 9, 0, 3] },
  { root: 43, voicing: [58, 62, 65, 69], tones: [7, 10, 2, 5, 9] },
  { root: 36, voicing: [58, 64, 68, 73], tones: [0, 4, 10, 8, 1] },
  { root: 41, voicing: [57, 60, 64, 67], tones: [5, 9, 0, 4, 7] },
  { root: 45, voicing: [55, 60, 64, 67], tones: [9, 0, 4, 7, 2] },
]

/** Transpositions offered by « request another tune ». */
const KEYS = [0, -2, 3, -4, 5] as const

const TEMPO = 74
const BEAT = 60 / TEMPO
/** Swung eighth: the off-beat lands two thirds of the way through the beat. */
const SWING = 2 / 3
const LOOKAHEAD = 0.12
const TICK_MS = 25

const freq = (midi: number) => 440 * 2 ** ((midi - 69) / 12)

export interface SoundState {
  readonly music: boolean
  readonly effects: boolean
}

export class ClubAudio {
  private readonly ctx: AudioContext
  private readonly master: GainNode
  private readonly musicGain: GainNode
  private readonly ambienceGain: GainNode
  private readonly effectsGain: GainNode
  private readonly room: BiquadFilterNode
  /** The record player and the glasses are in the room too: same wall. */
  private readonly ambienceRoom: BiquadFilterNode
  private readonly musicBus: GainNode
  private readonly noise: AudioBuffer
  private hiss: AudioBufferSourceNode | null = null

  private timer: number | null = null
  private nextBeatTime = 0
  private beat = 0
  private key = 0
  private nextClink = 0
  private state: SoundState = { music: false, effects: false }

  constructor() {
    const ctx = new AudioContext({ latencyHint: 'playback' })
    this.ctx = ctx
    this.noise = this.makeNoise(2)

    const compressor = ctx.createDynamicsCompressor()
    compressor.threshold.value = -20
    compressor.ratio.value = 3
    compressor.connect(ctx.destination)

    this.master = ctx.createGain()
    this.master.gain.value = 0
    this.master.connect(compressor)

    this.musicGain = this.gain(0, this.master)
    this.ambienceRoom = ctx.createBiquadFilter()
    this.ambienceRoom.type = 'lowpass'
    this.ambienceRoom.frequency.value = 700
    this.ambienceRoom.connect(this.master)
    this.ambienceGain = this.gain(0, this.ambienceRoom)
    this.effectsGain = this.gain(0, this.master)

    /* Room: a gentle low-pass that the scroll position opens and closes. */
    this.room = ctx.createBiquadFilter()
    this.room.type = 'lowpass'
    this.room.frequency.value = 700
    this.room.Q.value = 0.5

    const reverb = ctx.createConvolver()
    reverb.buffer = this.makeImpulse(2.6)
    const wet = this.gain(0.22, this.musicGain)
    const dry = this.gain(0.85, this.musicGain)
    this.room.connect(dry)
    this.room.connect(reverb)
    reverb.connect(wet)

    this.musicBus = this.gain(1, this.room)
  }

  /* ---------- Public API ---------- */

  /** Must be called from a user gesture: browsers only start audio then. */
  async start(state: SoundState): Promise<void> {
    if (this.ctx.state !== 'running') {
      await this.ctx.resume()
    }
    this.fade(this.master.gain, 1, 0.4)
    this.set(state)
  }

  set(state: SoundState): void {
    const now = this.ctx.currentTime
    this.state = state
    this.fade(this.musicGain.gain, state.music ? 0.26 : 0, state.music ? 2.5 : 1.2)
    this.fade(this.ambienceGain.gain, state.music ? 0.3 : 0, 2)
    this.fade(this.effectsGain.gain, state.effects ? 0.4 : 0, 0.2)

    if (state.music && this.timer === null) {
      this.nextBeatTime = now + 0.1
      this.nextClink = now + 12 + Math.random() * 20
      this.timer = window.setInterval(() => this.schedule(), TICK_MS)
      this.startHiss()
    } else if (!state.music && this.timer !== null) {
      /* Let the fade finish before the band stops playing. */
      window.setTimeout(() => {
        if (!this.state.music && this.timer !== null) {
          window.clearInterval(this.timer)
          this.timer = null
          this.stopHiss()
        }
      }, 1400)
    }
  }

  /**
   * Where the visitor stands, 0 → 1 through the page.
   * Outside (hero): through the wall. Inside: open. Closing time: muffled.
   */
  setScene(progress: number): void {
    const inside = Math.min(1, Math.max(0, (progress - 0.02) / 0.12))
    const leaving = Math.min(1, Math.max(0, (progress - 0.9) / 0.1))
    const openness = inside * (1 - leaving * 0.85)
    const cutoff = 650 * (14000 / 650) ** openness
    this.room.frequency.setTargetAtTime(cutoff, this.ctx.currentTime, 0.35)
    this.ambienceRoom.frequency.setTargetAtTime(cutoff, this.ctx.currentTime, 0.35)
  }

  /** Request another tune: the trio moves to another key. */
  reseed(): void {
    const choices = KEYS.filter((key) => key !== this.key)
    this.key = choices[Math.floor(Math.random() * choices.length)] ?? 0
  }

  /** Fade everything out (tab hidden) or back in. */
  async setAway(away: boolean): Promise<void> {
    if (away) {
      this.fade(this.master.gain, 0, 0.3)
      window.setTimeout(() => void this.ctx.suspend(), 400)
    } else {
      await this.ctx.resume()
      this.fade(this.master.gain, 1, 0.8)
    }
  }

  play(name: SoundName): void {
    if (!this.state.effects || this.ctx.state !== 'running') {
      return
    }
    const t = this.ctx.currentTime + 0.005
    const out = this.effectsGain
    switch (name) {
      case 'tick':
        this.blip(t, 1650, 0.05, 0.12, out)
        this.burst(t, 0.012, 3500, 0.06, out)
        break
      case 'request':
        this.blip(t, 880, 0.18, 0.08, out)
        this.blip(t + 0.09, 1320, 0.25, 0.07, out)
        break
      case 'door':
        /* A shop bell on the door: two inharmonic partials, struck twice. */
        for (const [offset, level] of [
          [0, 0.16],
          [0.16, 0.09],
        ] as const) {
          this.bell(t + offset, [1318, 1975, 3105], 1.6, level, out)
        }
        break
      case 'clink':
        this.bell(t, [2637, 3951, 5274], 0.7, 0.07, out)
        this.bell(t + 0.07, [2793, 4186], 0.5, 0.04, out)
        break
      case 'tear':
        this.tear(t, out)
        break
      case 'strike':
        this.burst(t, 0.07, 3200, 0.22, out, 'bandpass')
        this.burst(t + 0.05, 0.6, 1400, 0.05, out, 'lowpass')
        break
      case 'paper':
        this.burst(t, 0.22, 1800, 0.08, out, 'bandpass', true)
        break
      case 'buzz':
        this.hum(t, out)
        break
      case 'lamp':
        /* A pull-chain switch: two dry clicks, the second one sharper. */
        this.burst(t, 0.012, 2400, 0.25, out, 'bandpass')
        this.blip(t, 900, 0.03, 0.08, out)
        this.burst(t + 0.07, 0.008, 4200, 0.18, out, 'bandpass')
        break
      case 'key':
        /* A mechanical key: a tap, a softer return. */
        this.burst(t, 0.018, 3200 + Math.random() * 600, 0.16, out, 'bandpass')
        this.burst(t + 0.045, 0.012, 1800, 0.06, out, 'bandpass')
        break
      case 'flip':
        this.burst(t, 0.16, 2600, 0.07, out, 'bandpass', true)
        this.burst(t + 0.13, 0.02, 1400, 0.08, out, 'bandpass')
        break
      case 'spill': {
        /* The mug knocks on the wood, then coffee glugs out and spreads. */
        this.burst(t, 0.03, 900, 0.3, out, 'lowpass')
        this.bell(t + 0.01, [1180, 1770], 0.35, 0.05, out)
        for (let glug = 0; glug < 6; glug += 1) {
          const at = t + 0.12 + glug * (0.07 + Math.random() * 0.05)
          this.burst(at, 0.09, 380 + Math.random() * 420, 0.09 - glug * 0.01, out, 'bandpass', true)
        }
        this.burst(t + 0.5, 0.9, 1600, 0.025, out, 'lowpass', true)
        break
      }
      case 'roll': {
        /* Crumpled paper tumbling across the wood: crackles thinning out. */
        for (let step = 0; step < 12; step += 1) {
          const at = t + step * 0.05 + step * step * 0.004
          this.burst(
            at,
            0.012,
            2200 + Math.random() * 2400,
            0.07 * (1 - step / 13),
            out,
            'bandpass',
          )
        }
        break
      }
      case 'print': {
        /* A thermal printer line: a short burr of steps. */
        for (let step = 0; step < 7; step += 1) {
          this.burst(t + step * 0.016, 0.01, 5200, 0.05, out, 'bandpass')
        }
        break
      }
    }
  }

  /* ---------- The band ---------- */

  private schedule(): void {
    const ctx = this.ctx
    while (this.nextBeatTime < ctx.currentTime + LOOKAHEAD) {
      this.playBeat(this.beat, this.nextBeatTime)
      this.nextBeatTime += BEAT
      this.beat += 1
    }
    if (ctx.currentTime > this.nextClink) {
      this.bell(
        ctx.currentTime + 0.05,
        [2900 + Math.random() * 400, 4400],
        0.6,
        0.025,
        this.ambienceGain,
      )
      this.nextClink = ctx.currentTime + 18 + Math.random() * 30
    }
  }

  private playBeat(index: number, t: number): void {
    const barIndex = Math.floor(index / 4) % FORM.length
    const beatInBar = index % 4
    const bar = FORM[barIndex]
    const next = FORM[(barIndex + 1) % FORM.length]
    if (bar === undefined || next === undefined) {
      return
    }

    this.walkingBass(bar, next, beatInBar, t)
    this.brushes(beatInBar, t)
    if (beatInBar === 0) {
      this.comp(bar, t)
      /* A vibraphone phrase on roughly every other four-bar phrase. */
      if (barIndex % 4 === 0 && Math.random() < 0.55) {
        this.phrase(index, t)
      }
    }
    /* Vinyl surface: a few faint crackles per beat. */
    const crackles = Math.floor(Math.random() * 3)
    for (let c = 0; c < crackles; c += 1) {
      this.burst(
        t + Math.random() * BEAT,
        0.002,
        2500 + Math.random() * 4000,
        0.02 + Math.random() * 0.03,
        this.ambienceGain,
        'highpass',
      )
    }
  }

  private walkingBass(bar: Bar, next: Bar, beat: number, t: number): void {
    const root = bar.root + this.key
    const target = next.root + this.key
    const third = bar.tones.includes((bar.root + 3) % 12) ? 3 : 4
    const line = [
      root,
      root + (Math.random() < 0.5 ? 7 : third),
      root + (Math.random() < 0.5 ? 10 : 5),
      target + (Math.random() < 0.5 ? -1 : 1),
    ]
    const note = line[beat] ?? root
    const ctx = this.ctx
    const f = freq(note)

    const body = ctx.createOscillator()
    body.type = 'triangle'
    body.frequency.value = f
    const sub = ctx.createOscillator()
    sub.frequency.value = f
    const tone = ctx.createBiquadFilter()
    tone.type = 'lowpass'
    tone.frequency.setValueAtTime(900, t)
    tone.frequency.exponentialRampToValueAtTime(260, t + 0.25)
    const amp = ctx.createGain()
    const level = beat === 0 ? 0.22 : 0.18
    amp.gain.setValueAtTime(0, t)
    amp.gain.linearRampToValueAtTime(level, t + 0.012)
    amp.gain.exponentialRampToValueAtTime(level * 0.35, t + BEAT * 0.7)
    amp.gain.exponentialRampToValueAtTime(0.0001, t + BEAT * 0.98)
    body.connect(tone)
    sub.connect(tone)
    tone.connect(amp)
    amp.connect(this.musicBus)
    for (const osc of [body, sub]) {
      osc.start(t)
      osc.stop(t + BEAT)
    }
  }

  private comp(bar: Bar, t: number): void {
    /* Comping patterns, in beats: Charleston, anticipations, a held chord. */
    const patterns: readonly (readonly [number, number])[][] = [
      [
        [0, 1.2],
        [1 + SWING, 0.9],
      ],
      [
        [SWING, 1],
        [2 + SWING, 1.1],
      ],
      [[0, 3.4]],
      [
        [1 + SWING, 1],
        [3, 0.8],
      ],
    ]
    const pattern = patterns[Math.floor(Math.random() * patterns.length)] ?? []
    for (const [offset, length] of pattern) {
      const when = t + offset * BEAT
      bar.voicing.forEach((note, voice) => {
        /* A slight roll, bottom to top, like a real hand. */
        this.rhodes(note + this.key, when + voice * 0.012, length * BEAT, 0.05)
      })
    }
  }

  private rhodes(midi: number, t: number, length: number, level: number): void {
    const ctx = this.ctx
    const f = freq(midi)
    const carrier = ctx.createOscillator()
    carrier.frequency.value = f
    const modulator = ctx.createOscillator()
    modulator.frequency.value = f
    const index = ctx.createGain()
    /* The bell-like attack of a tine: strong modulation that dies away fast. */
    index.gain.setValueAtTime(f * 1.4, t)
    index.gain.exponentialRampToValueAtTime(f * 0.12, t + 0.35)
    modulator.connect(index)
    index.connect(carrier.frequency)

    const amp = ctx.createGain()
    amp.gain.setValueAtTime(0, t)
    amp.gain.linearRampToValueAtTime(level, t + 0.008)
    amp.gain.exponentialRampToValueAtTime(level * 0.4, t + 0.9)
    amp.gain.setTargetAtTime(0.0001, t + length, 0.12)

    const pan = ctx.createStereoPanner()
    pan.pan.value = (midi - 63) / 24
    const tone = ctx.createBiquadFilter()
    tone.type = 'lowpass'
    tone.frequency.value = 2600

    carrier.connect(amp)
    amp.connect(tone)
    tone.connect(pan)
    pan.connect(this.musicBus)
    const end = t + length + 0.8
    carrier.start(t)
    modulator.start(t)
    carrier.stop(end)
    modulator.stop(end)
  }

  private phrase(startBeat: number, t: number): void {
    /* Four bars of space, a few notes in them: chord tones, swung, with rests. */
    let cursor = Math.random() < 0.5 ? 0 : 1
    let last = 72
    while (cursor < 14) {
      const beatIndex = startBeat + Math.floor(cursor)
      const bar = FORM[Math.floor(beatIndex / 4) % FORM.length]
      if (bar === undefined) {
        break
      }
      const candidates: number[] = []
      for (let midi = 65; midi <= 82; midi += 1) {
        if (bar.tones.includes((((midi - this.key) % 12) + 12) % 12)) {
          candidates.push(midi)
        }
      }
      candidates.sort((a, b) => Math.abs(a - last) - Math.abs(b - last))
      const note = candidates[Math.floor(Math.random() * Math.min(3, candidates.length))] ?? last
      last = note
      const offbeat = cursor % 1 !== 0
      this.vibes(
        note,
        t + (Math.floor(cursor) + (offbeat ? SWING : 0)) * BEAT,
        offbeat ? 0.032 : 0.042,
      )
      cursor += [0.5, 0.5, 1, 1, 1.5, 2][Math.floor(Math.random() * 6)] ?? 1
    }
  }

  private vibes(midi: number, t: number, level: number): void {
    const ctx = this.ctx
    const f = freq(midi)
    const fundamental = ctx.createOscillator()
    fundamental.frequency.value = f
    const partial = ctx.createOscillator()
    partial.frequency.value = f * 4
    const partialGain = this.gain(0.08)
    partial.connect(partialGain)

    /* The motor of a vibraphone: a slow tremolo. */
    const amp = ctx.createGain()
    const tremolo = ctx.createOscillator()
    tremolo.frequency.value = 5.2
    const depth = this.gain(level * 0.25)
    tremolo.connect(depth)
    depth.connect(amp.gain)
    amp.gain.setValueAtTime(0, t)
    amp.gain.linearRampToValueAtTime(level, t + 0.006)
    amp.gain.exponentialRampToValueAtTime(0.0001, t + 1.8)

    fundamental.connect(amp)
    partialGain.connect(amp)
    const pan = ctx.createStereoPanner()
    pan.pan.value = 0.35
    amp.connect(pan)
    pan.connect(this.musicBus)
    for (const osc of [fundamental, partial, tremolo]) {
      osc.start(t)
      osc.stop(t + 1.9)
    }
  }

  private brushes(beat: number, t: number): void {
    /* A brush stirring the snare on every beat, a slap on 2 and 4. */
    this.burst(t, BEAT * 0.9, 3800, 0.022, this.musicBus, 'bandpass', true)
    if (beat === 1 || beat === 3) {
      this.burst(t, 0.09, 2200, 0.07, this.musicBus, 'bandpass')
    }
    /* Ride: ding, ding-da, ding, ding-da. */
    this.ride(t, 0.022)
    if (beat === 1 || beat === 3) {
      this.ride(t + SWING * BEAT, 0.014)
    }
    if (beat === 0) {
      this.kick(t)
    }
  }

  private ride(t: number, level: number): void {
    const ctx = this.ctx
    const amp = ctx.createGain()
    amp.gain.setValueAtTime(level, t)
    amp.gain.exponentialRampToValueAtTime(0.0001, t + 0.9)
    const high = ctx.createBiquadFilter()
    high.type = 'highpass'
    high.frequency.value = 6500
    high.connect(amp)
    const pan = ctx.createStereoPanner()
    pan.pan.value = -0.3
    amp.connect(pan)
    pan.connect(this.musicBus)
    /* Metallic: a cluster of square waves at inharmonic ratios. */
    for (const ratio of [2, 3, 4.16, 5.43, 6.79, 8.21]) {
      const osc = ctx.createOscillator()
      osc.type = 'square'
      osc.frequency.value = 150 * ratio
      osc.connect(high)
      osc.start(t)
      osc.stop(t + 0.92)
    }
  }

  private kick(t: number): void {
    const ctx = this.ctx
    const osc = ctx.createOscillator()
    osc.frequency.setValueAtTime(90, t)
    osc.frequency.exponentialRampToValueAtTime(48, t + 0.12)
    const amp = ctx.createGain()
    amp.gain.setValueAtTime(0.12, t)
    amp.gain.exponentialRampToValueAtTime(0.0001, t + 0.25)
    osc.connect(amp)
    amp.connect(this.musicBus)
    osc.start(t)
    osc.stop(t + 0.3)
  }

  /* ---------- Room tone ---------- */

  private startHiss(): void {
    if (this.hiss !== null) {
      return
    }
    const source = this.ctx.createBufferSource()
    source.buffer = this.noise
    source.loop = true
    const band = this.ctx.createBiquadFilter()
    band.type = 'bandpass'
    band.frequency.value = 5000
    band.Q.value = 0.4
    source.connect(band)
    band.connect(this.gain(0.012, this.ambienceGain))
    source.start()
    this.hiss = source
  }

  private stopHiss(): void {
    this.hiss?.stop()
    this.hiss = null
  }

  /* ---------- Building blocks ---------- */

  private gain(value: number, destination?: AudioNode): GainNode {
    const node = this.ctx.createGain()
    node.gain.value = value
    if (destination !== undefined) {
      node.connect(destination)
    }
    return node
  }

  private fade(param: AudioParam, to: number, seconds: number): void {
    const now = this.ctx.currentTime
    param.cancelScheduledValues(now)
    param.setValueAtTime(param.value, now)
    param.linearRampToValueAtTime(to, now + seconds)
  }

  private makeNoise(seconds: number): AudioBuffer {
    const buffer = this.ctx.createBuffer(1, this.ctx.sampleRate * seconds, this.ctx.sampleRate)
    const data = buffer.getChannelData(0)
    for (let i = 0; i < data.length; i += 1) {
      data[i] = Math.random() * 2 - 1
    }
    return buffer
  }

  /** A small, warm room: stereo noise with an exponential tail, darkened over time. */
  private makeImpulse(seconds: number): AudioBuffer {
    const rate = this.ctx.sampleRate
    const buffer = this.ctx.createBuffer(2, rate * seconds, rate)
    for (let channel = 0; channel < 2; channel += 1) {
      const data = buffer.getChannelData(channel)
      let smooth = 0
      for (let i = 0; i < data.length; i += 1) {
        const progress = i / data.length
        const amount = 0.2 + progress * 0.75
        smooth = smooth * amount + (Math.random() * 2 - 1) * (1 - amount)
        data[i] = smooth * (1 - progress) ** 3
      }
    }
    return buffer
  }

  private burst(
    t: number,
    length: number,
    frequency: number,
    level: number,
    destination: AudioNode,
    type: BiquadFilterType = 'bandpass',
    swell = false,
  ): void {
    const ctx = this.ctx
    const source = ctx.createBufferSource()
    source.buffer = this.noise
    const filter = ctx.createBiquadFilter()
    filter.type = type
    filter.frequency.value = frequency
    filter.Q.value = type === 'bandpass' ? 0.8 : 0.7
    const amp = ctx.createGain()
    amp.gain.setValueAtTime(0.0001, t)
    if (swell) {
      amp.gain.linearRampToValueAtTime(level, t + length * 0.4)
    } else {
      amp.gain.linearRampToValueAtTime(level, t + 0.002)
    }
    amp.gain.exponentialRampToValueAtTime(0.0001, t + length)
    source.connect(filter)
    filter.connect(amp)
    amp.connect(destination)
    source.start(t, Math.random() * 1.5)
    source.stop(t + length + 0.02)
  }

  private blip(
    t: number,
    frequency: number,
    length: number,
    level: number,
    destination: AudioNode,
  ): void {
    const osc = this.ctx.createOscillator()
    osc.frequency.value = frequency
    const amp = this.ctx.createGain()
    amp.gain.setValueAtTime(level, t)
    amp.gain.exponentialRampToValueAtTime(0.0001, t + length)
    osc.connect(amp)
    amp.connect(destination)
    osc.start(t)
    osc.stop(t + length + 0.02)
  }

  private bell(
    t: number,
    partials: readonly number[],
    length: number,
    level: number,
    destination: AudioNode,
  ): void {
    partials.forEach((frequency, index) => {
      this.blip(t, frequency, length / (index + 1), level / (index + 1), destination)
    })
  }

  private tear(t: number, destination: AudioNode): void {
    /* Paper fibres giving way: noise chopped into tiny irregular grains. */
    let cursor = t
    const end = t + 0.32
    while (cursor < end) {
      const grain = 0.004 + Math.random() * 0.012
      this.burst(
        cursor,
        grain,
        1200 + Math.random() * 2600,
        0.12 + Math.random() * 0.1,
        destination,
        'bandpass',
      )
      cursor += grain * (0.5 + Math.random())
    }
  }

  private hum(t: number, destination: AudioNode): void {
    const ctx = this.ctx
    const osc = ctx.createOscillator()
    osc.type = 'sawtooth'
    osc.frequency.value = 100
    const tone = ctx.createBiquadFilter()
    tone.type = 'lowpass'
    tone.frequency.value = 900
    const amp = ctx.createGain()
    amp.gain.setValueAtTime(0.0001, t)
    /* A failing neon tube: the hum stutters. */
    for (let step = 0; step < 6; step += 1) {
      amp.gain.setValueAtTime(step % 2 === 0 ? 0.03 : 0.004, t + step * 0.035)
    }
    amp.gain.exponentialRampToValueAtTime(0.0001, t + 0.3)
    osc.connect(tone)
    tone.connect(amp)
    amp.connect(destination)
    osc.start(t)
    osc.stop(t + 0.32)
  }
}
