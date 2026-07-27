import { about, facts } from './about'
import { education } from './education'
import { experiences } from './experiences'
import { interests } from './interests'
import { projects } from './projects'
import { hasDomainContent, skills } from './skills'
import { sectionRegistry } from './navigation'
import type { SectionDefinition } from '../types/content'

/**
 * Tabs actually shown.
 *
 * A tab exists only if its page has content. Three intended consequences: the
 * panel never shows a title followed by nothing, navigation never offers an
 * empty tab, and the site fills itself in as content modules get written.
 */
const hasContent: Record<string, boolean> = {
  about: about.paragraphs.length > 0 || facts.length > 0 || interests.length > 0,

  /* Skills live on this page, so they count towards it. */
  resume: experiences.length > 0 || education.length > 0 || skills.some(hasDomainContent),

  projects: projects.length > 0,

  contact: true,
}

/** Tabs to display, in registry order. */
export const visibleSections: readonly SectionDefinition[] = sectionRegistry.filter(
  (section) => hasContent[section.id] === true,
)

/** `true` when the page has content and must therefore exist. */
export function isSectionVisible(id: string): boolean {
  return hasContent[id] === true
}

/**
 * A page definition, so its component reads its title and editorial line from
 * here rather than hard-coding them.
 */
export function getSection(id: string): SectionDefinition | undefined {
  return sectionRegistry.find((section) => section.id === id)
}
