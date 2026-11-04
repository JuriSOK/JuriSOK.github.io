@AGENTS.md

# CLAUDE.md

Permanent rules for this project. Read them before any change.

## What this is

- The **professional portfolio** of Vibol Arnaud Sok (Data Analyst apprentice, Master's in MIAGE).
  The whole interface is in English.
- The concept is **"2 a.m., Arnaud's desk"**: one scene, a desk at night seen from above under a
  lamp, where every object is a piece of content that can be picked up. See `DIRECTION.md`. Do not
  bring back stacked sections or a second, text-only version of the portfolio.

## Content

- **Never invent** an experience, mission, skill, result, figure, prize or certification. Only
  facts provided by Vibol Arnaud Sok go in `src/content/`.
- **Never publish** a phone number, postal address or CV, and never add a CV button. `SiteLinks`
  only holds `email`, `linkedin` and `github`.
- No confidential company information, and no SNCF experience.
- **Hackathons are real participations only.** `outcome` is set only for a confirmed, public result.
- Projects come from GitHub repositories with the `portfolio` topic, fetched by
  `npm run sync:projects` into `src/data/projects.generated.json` (committed, never hand-edited).
  This script never runs in CI.

## Desk rules

- Positions live in `src/content/desk.ts`, in two layouts (wide and tall). Interactive objects
  must not overlap or leave the desk.
- The light comes from the lamp's shade (`lampSource`). Lighting and shadows are computed, never
  set by hand.
- **Performance**: only `transform` and `opacity` animate. Never animate `filter` on objects:
  each object is a compositor layer whose filter is rasterised once.
- Set dressing (`decor`) is `aria-hidden` and inert. Toys (`toy`) are real buttons, kept out of
  the desk index.
- **No sound before a user gesture.** The music is synthesised (see `SOUND.md`), never a
  third-party recording.
- Respect `prefers-reduced-motion`. Hidden starting states only exist under
  `html[data-motion="on"]`.

## Stack and checks

- Next.js (App Router, `output: 'export'`), TypeScript strict, Tailwind v4, Motion.
- **Node.js 24 LTS**: `.nvmrc`, `.node-version` and `engines` must agree.
- Before every commit, run `npm run lint`, `npm run build`, then `npx tsc --noEmit` (the build generates `next-env.d.ts`). Also run
  `npm run verify` against `npm run preview`.
- Never force-push. Never commit `.env`.

## Deployment

- Live at **https://jurisok.github.io**, published by `.github/workflows/deploy.yml` on every push
  to `main`. The Pages source must stay **"GitHub Actions"**.
- No `basePath`: the repository is `JuriSOK.github.io`, served from the domain root.
