import type { Education } from '../types/content'

/**
 * Education.
 *
 * No university project, ranking or honour is listed, by explicit instruction.
 *
 * `logo` is intentionally absent on both entries: no official, reusable
 * institutional asset could be obtained and verified, and an approximate or
 * redrawn university logo would misrepresent a trademark. Both entries
 * therefore fall back to a typographic mark built from the institution name.
 * Drop an official SVG in `public/images/education/` and set `logo` to switch.
 */
export const education: readonly Education[] = [
  {
    id: 'master-miage',
    degree: 'Master’s Degree in MIAGE — Digital and Management Sciences',
    school: 'Université Paris Dauphine-PSL',
    period: '2025 — 2026',
  },
  {
    id: 'bachelor-computer-science',
    degree: 'Bachelor’s Degree in Computer Science and Applications',
    school: 'Université Paris Cité',
    period: '2022 — 2025',
  },
]
