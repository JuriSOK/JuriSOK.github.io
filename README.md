# Portfolio — Vibol Arnaud Sok

Professional portfolio of Vibol Arnaud Sok, AI Project Manager apprentice and Master's student in
MIAGE.

The site follows a **vCard layout**: a fixed identity sidebar and a main panel whose content switches
by tabs — About, Resume, Projects and Contact — rendered in a *Warm Vintage Jazz Editorial* theme
over an original animated pixel-art jazz café background.

> 🚧 **Work in progress.** Some wording is provisional and flagged with a `TODO` comment in the
> content files. The word `TODO` never reaches the rendered page.

## Stack

- [React](https://react.dev/) 19
- [TypeScript](https://www.typescriptlang.org/) (strict mode)
- [Vite](https://vite.dev/)
- [ESLint](https://eslint.org/)

No production dependency beyond React: fonts are self-hosted, technology logos are inlined SVG paths,
the café background is hand-drawn SVG with CSS animation, and reveals use a native
`IntersectionObserver`.

## Content

All copy lives in `src/content/`: changing a sentence never requires opening a component.

**A tab with no real content does not exist** — no title followed by emptiness, no hollow tab. The
site is therefore publishable at any time and fills itself in as content files are written.

Interests are part of the About page and skills are part of Resume; neither has its own tab.

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
│   │   ├── background/      # Animated pixel-art jazz café scene
│   │   ├── layout/          # Identity sidebar, tabs, grain, skip link
│   │   ├── ui/              # Page, SectionHeading, Rule, ButtonLink, TechBadge, Icon
│   │   ├── sections/        # About, Resume and Contact pages and their blocks
│   │   └── projects/        # Grid, card, generated artwork
│   ├── content/             # Copy, data, page registry and logo registry
│   ├── data/                # Generated, committed files (do not edit)
│   ├── types/               # content.ts and project.ts
│   ├── hooks/               # Reveal, reduced motion, media queries
│   ├── styles/              # Tokens, fonts, global styles
│   ├── App.tsx
│   └── main.tsx
├── CLAUDE.md                # Permanent project rules
└── vite.config.ts
```

## Accessibility

Verified with a real browser at every step: skip link first, visible focus ring throughout, targets of
at least 44 px. Tab changes are announced to screen readers (`aria-current`, focus moved to the panel)
and stay in sync with the URL — `#projects` is a deep link and the browser back button works. Under
`prefers-reduced-motion`, no animation remains, the café background becomes fully static and all
content stays visible.

## Privacy

The site publishes only three contact channels: email, LinkedIn and GitHub. **No phone number, no
postal address and no CV** are ever displayed — this is enforced by the `SiteLinks` type itself.

## Deployment

The site will be published on GitHub Pages at **https://JuriSOK.github.io** — not configured yet.
