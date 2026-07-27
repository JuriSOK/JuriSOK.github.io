import { profile } from './profile'
import type { AboutContent, Fact } from '../types/content'

/**
 * About page.
 *
 * TODO — provisional wording, to be rewritten by Vibol Arnaud Sok.
 * The word « TODO » must never reach the rendered page: this note is a code
 * comment only.
 *
 * Two claims are deliberately worded with care and must not be strengthened:
 * following hackathons is not the same as having taken part in many, and an
 * interest in entrepreneurship is not a track record.
 */
export const about: AboutContent = {
  paragraphs: [
    'I’m an AI Project Manager apprentice and a Master’s student in MIAGE, with a strong interest in artificial intelligence, AI agents, information systems and digital transformation.',
    'I enjoy working at the intersection of technology and project coordination, turning emerging ideas into practical and structured solutions.',
    'I closely follow hackathons and the fast-paced collaboration they encourage. I am also interested in entrepreneurship and in building useful digital products.',
  ],
  closing: 'Interested in exchanging ideas, projects or opportunities? Let’s keep in touch.',
  portrait: null,
}

/**
 * Facts list.
 *
 * Only what the sidebar does **not** already show. Role, education, employer
 * and location all live in the identity card; repeating them here would fill
 * the page with echoes rather than information.
 */
export const facts: readonly Fact[] = [
  { label: 'Domains', value: profile.domains.join(' · '), full: true },
]
