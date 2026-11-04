# 2 a.m. — Arnaud's desk

The portfolio of Vibol Arnaud Sok, as one scene: his desk at night, seen from above, under a lamp.
Every object on it *is* a piece of content, and every one can be picked up:

| Object | Content | What it does |
|---|---|---|
| Leather notebook | About | Opens on two spreads of ruled paper |
| Work badge | The apprenticeship | Flips over to show the missions |
| Student cards | Education | Spread out on the table |
| Receipt | Personal Finance Tracker | Prints out line by line |
| Index cards | MiniSGBDR | Shuffle one at a time |
| "While you were out" message slip | KinCall | |
| Trading card | DraftLens | |
| Keyboard | Skills | Its keys type on a little screen |
| Polaroids | Interests | |
| Postcard | Contact | |

Other parts of the scene:

- Laptop stickers are the links.
- The radio plays a jazz trio composed live in the browser.
- A flip clock shows the real time in Paris.
- A sticky-note pad is the guestbook.
- Lived-in details lie around: a mug of coffee (its steam rises once the lamp is on), a coffee ring, a pencil, paper clips, an eraser, a crumpled draft, and a knot and worn varnish in the wood.

- [`DIRECTION.md`](DIRECTION.md): the three directions considered, why this one was chosen, the
  object-to-content mapping, and the motion.
- [`SOUND.md`](SOUND.md): the music and sounds, their provenance and licence (all original and
  synthesised).
- [`REVERSE_ENGINEERING.md`](REVERSE_ENGINEERING.md): what was learnt from kepard.dev. No code,
  copy or asset was reused.

## Run

```bash
npm install
npm run dev            # http://localhost:3000
npm run build && npm run preview   # static site on :3100, as GitHub Pages serves it
npm run verify         # 51 functional checks against :3100 (needs Chrome installed)
npm run lint
```

## Structure

```
src/
├── app/                 # layout (fonts, js/motion bootstrap), page, globals.css (materials, stage, light)
├── content/             # every word — edit here, not in components
│   ├── desk.ts          # what lies on the desk and where (wide and tall layouts)
│   ├── site.ts          # arrival, intro note, screen-reader guide, visitor notes
│   └── about.ts, experiences.ts, education.ts, hackathons.ts, skills.ts, interests.ts, …
├── components/
│   ├── desk/
│   │   ├── Desk.tsx         # the scene: placement, light, drag, arrival, index, notes
│   │   ├── faces.tsx        # objects seen from above
│   │   ├── LiveFaces.tsx    # laptop stickers (links) and the radio (music)
│   │   ├── Inspector.tsx    # picking an object up: the flight from the desk, the dialog
│   │   ├── views/           # what each object shows once in hand
│   │   ├── LampFace.tsx     # the lamp seen from above; its shade is the light source
│   │   └── DecorFaces.tsx   # set dressing (inert, aria-hidden)
│   ├── sound/           # SoundProvider
│   ├── pixel-art/       # original pixel drawings
│   └── ui/Icon.tsx
├── lib/
│   ├── audio/ClubAudio.ts   # the trio and the desk sounds (Web Audio)
│   └── desk.ts              # light and shadow of each object, from its distance to the lamp
└── data/                # generated GitHub project list (committed)
```

## Customising

- **Move an object.** Change its `x`, `y`, `r` (and `s` for scale) in `content/desk.ts`. There is
  one entry for the landscape desk and one for the portrait desk (phones). Light and shadow follow
  automatically.
- **Move the light.** `light` in each layout of `content/desk.ts`.
- **Colours and materials.** The tokens and the wood, paper and light live in `src/app/globals.css`.
- **The music.** The constants at the top of `lib/audio/ClubAudio.ts`.

## Simulated features

- **Notes on the desk.** The sticky-note guestbook is stored in `localStorage` (`desk:notes`), so
  only the person who wrote a note can see it. The 6 most recent notes stay on the desk.
- **The lamp** is remembered for the visit (`sessionStorage`): a reload does not plunge the room
  back into darkness.

## Accessibility, motion and sound

- Every object is a real button with a plain label, and every view is a labelled dialog with its
  full text. A visually hidden guide tells screen-reader users how the desk works, and **"what's
  on the desk?"** lists every object. There is no second, text-only version of the portfolio.
- The detail views are dialogs: Escape closes them, Tab stays inside, and focus returns to the
  object.
- **No sound before a gesture.** "switch on the lamp" comes in silently, while "lamp + radio" and
  the radio itself start the music. The audio fades when the tab is hidden.
- **Without JavaScript**, the desk is lit and a small note gives the name, the email, LinkedIn and GitHub.
- **Under reduced motion**, nothing flies, flips are instant, and the steam does not rise.

## Performance

Every object is its own compositor layer. Its lighting filter (brightness and a drop shadow cast
away from the lamp) is fixed, so it is rasterised once. Hovering, straightening and dragging only
move finished bitmaps, through `translate`, `rotate` and `transform`. The darkness when the lamp
is off is a single overlay that fades out. Before this, switching the lamp on animated the filter
of every object, which repainted the whole desk on every frame.

Measured with a Chrome trace at retina density (DPR 2), GPU time per interaction:

| Interaction | Before | After |
|---|---|---|
| Lamp on | 281 ms | 6 ms |
| Hover sweep | 62 ms | 0 ms |
| Drag | 39 ms | 2 ms |
| Open / close an object | 16 ms | 3 ms |

With the CPU throttled ×4, no frame exceeds 16.8 ms.
