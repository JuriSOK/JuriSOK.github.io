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
    role: 'Data Analyst',
    contract: 'Apprenticeship',
    period: 'September 2025 — Present',
    current: true,
    missions: [
      'Creating data visualizations and dashboards to monitor IT performance and service quality (QoS).',
      'Supporting data-driven decision-making by analyzing incident trends and operational KPIs.',
      'Cleaning, transforming and consolidating data through ETL processes to make it usable for analysis and reporting.',
    ],
    domains: ['Data Analysis', 'Data Visualization', 'ETL', 'ITSM'],
  },
]
