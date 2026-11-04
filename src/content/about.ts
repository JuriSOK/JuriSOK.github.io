import type { AboutContent, FocusArea, HeroContent, Value } from '@/types/content'

/**
 * Opening line of the page, under the name.
 *
 * Built only from facts provided by Vibol Arnaud Sok: role, employer, degree,
 * and the fields he named himself.
 */
export const hero: HeroContent = {
  lead: 'Data Analyst apprentice at Crédit Agricole Assurances and Master’s student in MIAGE at Université Paris Dauphine-PSL. I like AI agents, data, and building useful things with good people.',
}

/**
 * About section — the « liner notes ».
 *
 * Rewritten from his original introduction and the details he gave about his
 * apprenticeship. Casual in tone, but every sentence rests on a stated fact.
 * The closing `:))` is his.
 */
export const about: AboutContent = {
  paragraphs: [
    'I’m Arnaud. During the week, I’m part of a Quality of Service team at Crédit Agricole Assurances, where I turn operational data into dashboards, automate what can be automated, and explore what generative AI can do for everyday work.',
    'The rest of the time, I’m usually chasing an idea: a hackathon, a tech event, a side project. I care about building products that are genuinely useful, at the point where technology, product and people meet, and I enjoy it most as part of a team.',
    'If you’re looking for someone to build, experiment and learn with, feel free to reach out. We might just build something great together :))',
  ],
}

/** Three values, in his words, translated to English. */
export const values: readonly Value[] = [
  {
    id: 'curiosity',
    name: 'Curiosity',
    line: 'I like discovering new fields, trying new technologies and learning by building.',
  },
  {
    id: 'initiative',
    name: 'Initiative',
    line: 'I’d rather turn an idea into something concrete than wait for it to be perfect, and I like stepping out of my comfort zone.',
  },
  {
    id: 'collaboration',
    name: 'Collaboration',
    line: 'I like meeting people from different backgrounds, sharing ideas and building ambitious projects together. The people matter as much as the projects.',
  },
]

/** Fields he wants to work in, in his order. */
export const focusAreas: readonly FocusArea[] = [
  {
    id: 'applied-ai',
    name: 'Applied AI & AI Agents',
    line: 'Designing intelligent systems that solve concrete problems.',
  },
  {
    id: 'ai-product',
    name: 'AI Product Building',
    line: 'Turning ideas into useful products, from concept to prototype.',
  },
  {
    id: 'data-science',
    name: 'Data Science & Analytics',
    line: 'Using data to understand, predict and support decisions.',
  },
  {
    id: 'product-entrepreneurship',
    name: 'Product Management & Entrepreneurship',
    line: 'Building products, exploring opportunities and growing entrepreneurial projects.',
  },
  {
    id: 'digital-transformation',
    name: 'Digital Transformation',
    line: 'Bringing new technologies into organisations, thoughtfully.',
  },
]

/** Closing sentence of the focus list. */
export const focusNote =
  'I’m not set on a single industry. What drives me is building products where technology, product and people meet.'
