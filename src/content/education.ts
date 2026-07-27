import type { Education } from '../types/content'

/**
 * Education.
 *
 * No university project, ranking or honour is listed, by explicit instruction.
 * Both logos are official institutional assets stored locally; they are
 * decorative (`alt=""` at render time) because the institution name is always
 * displayed right beside them.
 */
export const education: readonly Education[] = [
  {
    id: 'master-miage',
    degree: 'Master’s Degree in MIAGE',
    subtitle: 'Computer Science Applied to Business Management',
    school: 'Université Paris Dauphine-PSL',
    location: 'Paris, France',
    period: '2025 — 2026',
    logo: '/images/education/dauphine-psl.png',
  },
  {
    id: 'bachelor-computer-science',
    degree: 'Bachelor’s Degree in Computer Science and Applications',
    school: 'Université Paris Cité',
    location: 'Paris, France',
    period: '2022 — 2025',
    logo: '/images/education/universite-paris-cite.png',
  },
]
