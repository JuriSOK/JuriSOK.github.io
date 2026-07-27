import type { HackathonConcept } from '../types/content'

/**
 * Hackathon concepts.
 *
 * No hackathon has been attended yet, and this page never pretends otherwise:
 * every card carries the literal status « Concept », and the type has no field
 * for a date, an organiser, a location, a team, a ranking or a result.
 *
 * TODO — these three concepts are provisional and will be replaced with real
 * entries after the first actual hackathon. The word « TODO » must never reach
 * the rendered page: this note is a code comment only.
 */
export const hackathonIntro = 'Concepts I would like to explore during future hackathons.'

export const hackathonConcepts: readonly HackathonConcept[] = [
  {
    id: 'smart-incident-copilot',
    title: 'Smart Incident Copilot',
    summary:
      'An AI assistant concept designed to help teams analyse incident information, identify useful context and support faster ITSM decision-making.',
    technologies: ['Python', 'AI Agents', 'ServiceNow', 'RAG'],
    status: 'Concept',
    pixelArt: 'incident-copilot',
  },
  {
    id: 'ai-workflow-studio',
    title: 'AI Workflow Studio',
    summary:
      'A concept for building and coordinating AI-powered workflows through reusable agents, tools and clearly structured automation steps.',
    technologies: ['TypeScript', 'Python', 'AI Agents', 'Docker'],
    status: 'Concept',
    pixelArt: 'workflow-studio',
  },
  {
    id: 'accessible-digital-toolkit',
    title: 'Accessible Digital Toolkit',
    summary:
      'A concept for a digital toolbox that helps users identify accessibility issues and improve the usability of online experiences.',
    technologies: ['React', 'TypeScript', 'AI', 'Figma'],
    status: 'Concept',
    pixelArt: 'accessible-toolkit',
  },
]
