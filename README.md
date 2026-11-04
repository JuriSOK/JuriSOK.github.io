# Portfolio — Vibol Arnaud Sok

Professional portfolio of Vibol Arnaud Sok, Data Analyst apprentice and Master's student in
MIAGE.

The site is a **single-page narrative** read as one evening at a jazz club, from « doors open » to
« closing time »: an opening screen over an animated pixel-art café, then About, Journey,
Projects, Hackathons, Skills, Life and Contact. Each section carries a set-list cue
(« 9:00 pm · liner notes »), and a set clock in the sticky header follows the section being read —
the metaphor carries the navigation instead of decorating it. Headings themselves stay plain.

The theme is *Warm Vintage Jazz Editorial*: espresso and cream surfaces, copper and bordeaux
accents, Fraunces and Archivo, hairline rules, and original pixel-art illustrations (interests,
skill categories, project sleeves, hackathons). The jazz reference stays typographic — no vinyl,
no instrument, no musical note.

Hackathon entries are real participations; a result is shown only when one is confirmed.

> 🚧 **Work in progress.** Some wording is provisional and flagged with a `TODO` comment in the
> content files. The word `TODO` never reaches the rendered page.

## Stack

- [React](https://react.dev/) 19
- [TypeScript](https://www.typescriptlang.org/) (strict mode)
- [Vite](https://vite.dev/)
- [ESLint](https://eslint.org/)

No production dependency beyond React: fonts are self-hosted, technology logos are inlined SVG
paths, pixel-art illustrations are original local drawings rendered by a small `PixelGrid`
component, and reveals use a native `IntersectionObserver`.

## Content

All copy lives in `src/content/`: changing a sentence never requires opening a component.

**A section with no real content does not exist** — no title followed by emptiness, and no
navigation link pointing at nothing. The site is therefore publishable at any time and fills itself
in as content files are written.

`src/content/navigation.ts` registers the sections (id, nav label, heading, cue);
`src/content/sections.ts` crosses it with the actual content. The page and the header read the same
verdict, so they cannot diverge.

## Project selection

Displayed projects are the GitHub repositories carrying the **`portfolio`** topic.

```bash
npm run sync:projects
```

The script queries the public GitHub API and writes `src/data/projects.generated.json`, which is
committed: the site makes no network call for visitors and builds offline. No token is needed or
embedded.

To add a project:

```bash
gh repo edit JuriSOK/REPO-NAME --add-topic portfolio
npm run sync:projects
```

Descriptions, titles, technologies and ordering are refined in `src/content/projects.overrides.ts`.
The `groups` table in the same file gathers several repositories under a single card — as with
`personal-finance-tracker`, split between frontend and backend.

## Requirements

- **Node.js 24 LTS** (declared in `.nvmrc`, `.node-version` and the `engines` field)
- npm 11 or later

Using a version manager such as [`nvm`](https://github.com/nvm-sh/nvm),
[`fnm`](https://github.com/Schniz/fnm) or [`mise`](https://mise.jdx.dev/) is recommended:

```bash
nvm use          # first time: nvm install 24
```

## Install and run

```bash
git clone https://github.com/JuriSOK/JuriSOK.github.io.git
cd JuriSOK.github.io
nvm use
npm install
npm run dev
```

The dev server starts on `http://localhost:5173`.

## Commands

| Command                 | Description                                     |
| ----------------------- | ----------------------------------------------- |
| `npm run dev`           | Development server                              |
| `npm run build`         | Production build into `dist/`                   |
| `npm run lint`          | ESLint                                          |
| `npm run preview`       | Serves the production build locally             |
| `npm run sync:projects` | Refreshes the selection from the GitHub topic   |

## Structure

```
.
├── index.html
├── public/
│   ├── fonts/               # Self-hosted Fraunces and Archivo (+ OFL licences)
│   └── images/              # Avatar, institution logos
├── scripts/
│   └── sync-projects.mjs    # Fetches repositories carrying the `portfolio` topic
├── src/
│   ├── components/
│   │   ├── background/      # Fixed animated café background
│   │   ├── pixel-art/       # PixelGrid renderer and original pixel drawings
│   │   ├── layout/          # Sticky header and set clock, footer, grain, skip link
│   │   ├── ui/              # Section, SectionHeading, Rule, ButtonLink, TechBadge, Icon
│   │   ├── sections/        # Hero, About, Journey, Skills, Life and Contact
│   │   └── projects/        # Projects and Hackathons, cards, generated artwork
│   ├── content/             # Copy, data, section registry and logo registry
│   ├── data/                # Generated, committed files (do not edit)
│   ├── types/               # content.ts, project.ts, pixel-art.ts
│   ├── hooks/               # Reveal, active section, reduced motion, media queries
│   ├── styles/              # Tokens, fonts, global styles
│   ├── App.tsx
│   └── main.tsx
├── CLAUDE.md                # Permanent project rules
└── vite.config.ts
```

## Accessibility

Verified with a real browser at every step: skip link first, visible focus ring throughout, targets of
at least 44 px. Sections are labelled landmarks with native anchors — `#projects` is a deep link —
and the header link of the section being read carries `aria-current`. The mobile menu closes on
Escape and gives focus back to its button. Under
`prefers-reduced-motion`, no animation remains, the café background becomes fully static and all
content stays visible.

## Privacy

The site publishes only three contact channels: email, LinkedIn and GitHub. **No phone number, no
postal address and no CV** are ever displayed — this is enforced by the `SiteLinks` type itself.

## Deployment

The site is live at **https://jurisok.github.io**.

Every push to `main` triggers [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml), which
installs with `npm ci`, runs `npm run lint`, builds, and publishes `dist/` to GitHub Pages. Lint and
build gate the deployment, so a broken commit never reaches the live site. Node comes from `.nvmrc`,
so CI cannot drift from local development.

Two settings this depends on, both already in place:

- **Pages source is _GitHub Actions_**, not a branch. Set to a branch, Pages serves the repository
  root — the source `index.html`, whose `/src/main.tsx` entry the browser refuses. The result is a
  blank page.
- **No `base` in `vite.config.ts`.** The repository is named `JuriSOK.github.io`, so the site is
  served from the domain root and Vite's default `base: '/'` is correct. A project repository would
  need `base: '/<repo>/'`.

`npm run sync:projects` is deliberately not run in CI: it calls the GitHub API and rewrites a
committed file. Refresh the selection locally, then push.
