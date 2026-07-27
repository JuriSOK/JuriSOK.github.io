import type { Experience } from '../types/content'

/**
 * Professional experience.
 *
 * Only facts provided by Vibol Arnaud Sok. No invented mission, date,
 * responsibility, technology or result — and no quantitative achievement or
 * confidential project detail, by explicit instruction.
 */
export const experiences: readonly Experience[] = [
  {
    id: 'credit-agricole-assurances',
    organisation: 'Crédit Agricole Assurances',
    logo: '/images/brands/credit-agricole.png',
    role: 'AI Project Manager',
    contract: 'Apprenticeship',
    period: 'September 2025 — Present',
    current: true,
    missions: [
      'Define business needs and artificial intelligence use cases.',
      'Design AI and AI-agent solutions to improve ITSM processes.',
      'Contribute to cross-functional project coordination and monitoring.',
    ],
    domains: ['Artificial Intelligence', 'AI Agents', 'ITSM', 'Project Management'],
    tools: ['ServiceNow', 'Splunk', 'Dynatrace', 'ELK / DORA'],
  },
]
