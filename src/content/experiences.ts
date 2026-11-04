import type { Experience } from '@/types/content'

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
    role: 'Data Analyst',
    contract: 'Apprenticeship',
    period: 'Sep 2025 — Present',
    current: true,
    summary:
      'Part of the property & casualty Quality of Service team, which monitors and improves the quality of IT services.',
    missions: [
      'Building Power BI dashboards to monitor IT performance and service quality.',
      'Analysing operational data and incident trends to support decision-making.',
      'Automating processes, and cleaning and consolidating data through ETL pipelines.',
      'Exploring generative AI use cases, notably with Microsoft Copilot, to make everyday work more efficient.',
    ],
    tools: ['Power BI', 'Microsoft Copilot', 'ETL', 'ITSM'],
  },
]
