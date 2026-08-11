import type { Hackathon } from '../types/content'

/**
 * Hackathon projects, shown inside the Projects page.
 *
 * Real entries only, built from the two repositories' own README files —
 * DraftLens (github.com/JuriSOK/DraftLens) and KinCall
 * (github.com/JuriSOK/kincall). No date, organiser, team or ranking: neither
 * repository publishes one, so none is invented here.
 */
export const hackathonsIntro =
  'Projects built under time constraints, around a challenge, an idea and a team.'

export const hackathons: readonly Hackathon[] = [
  {
    id: 'draftlens',
    title: 'DraftLens',
    event: 'AQX Sports Analytics Data Bowl 3.0',
    summary:
      'An explainable NBA Draft analytics platform that ranks NCAA prospects, evaluates team fit and finds statistical NBA comparables to support smarter pre-draft decisions.',
    technologies: ['Python', 'scikit-learn', 'React', 'TypeScript', 'pandas'],
    link: { label: 'View on GitHub', url: 'https://github.com/JuriSOK/DraftLens' },
    pixelArt: 'draftlens',
  },
  {
    id: 'kincall',
    title: 'KinCall',
    event: 'CALL-E: Your Code Is Calling',
    summary:
      'An AI-powered phone check-in and family coordination system where specialised voice agents understand conversations and a controlled orchestration engine coordinates trusted support.',
    technologies: ['Next.js', 'React', 'TypeScript', 'CALL-E', 'Supabase / PostgreSQL'],
    link: { label: 'View on GitHub', url: 'https://github.com/JuriSOK/kincall' },
    pixelArt: 'kincall',
  },
]
