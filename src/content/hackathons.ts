import type { Hackathon } from '@/types/content'

/**
 * Hackathon participations.
 *
 * Real entries only, from the two repositories' README files and the details
 * Vibol Arnaud Sok provided. Neither project won a prize, so neither carries
 * one; KinCall's `outcome` is its confirmed inclusion in the CALL-E community
 * directory, nothing more.
 */
export const hackathonsIntro =
  'Time-boxed builds around a challenge, an idea and a deadline. The closest thing to a jam session I know.'

export const hackathons: readonly Hackathon[] = [
  {
    id: 'kincall',
    title: 'KinCall',
    event: 'CALL-E: Your Code Is Calling',
    period: 'Summer 2026',
    role: 'Product design, architecture and development of the AI voice-agent system.',
    summary:
      'AI voice agents regularly call isolated people to check in on them, and coordinate their relatives when help is needed.',
    outcome: 'Open-source contribution added to the official CALL-E community directory.',
    technologies: ['Next.js', 'React', 'TypeScript', 'CALL-E', 'Supabase / PostgreSQL'],
    links: [{ label: 'Source', url: 'https://github.com/JuriSOK/kincall' }],
    pixelArt: 'kincall',
  },
  {
    id: 'draftlens',
    title: 'DraftLens',
    event: 'AQX Sports Analytics Data Bowl 3.0',
    period: 'August 2026',
    role: 'End-to-end design and development, from the data science to the interface.',
    summary:
      'An explainable NBA Draft analytics platform that ranks NCAA prospects, evaluates team fit and finds statistical NBA comparables.',
    technologies: ['Python', 'scikit-learn', 'React', 'TypeScript', 'pandas'],
    links: [
      { label: 'Source', url: 'https://github.com/JuriSOK/DraftLens' },
      { label: 'Devpost', url: 'https://devpost.com/software/draftlens' },
    ],
    pixelArt: 'draftlens',
  },
]
