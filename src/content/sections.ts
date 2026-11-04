import { about } from './about'
import { education } from './education'
import { experiences } from './experiences'
import { hackathons } from './hackathons'
import { interests } from './interests'
import { sectionRegistry } from './navigation'
import { projects } from './projects'
import { hasDomainContent, skills } from './skills'
import type { SectionDefinition } from '../types/content'

/**
 * Sections actually rendered.
 *
 * A section exists only if it has content. The page and the navigation both
 * read `visibleSections`, so a link can never point at an empty section and the
 * site fills itself in as content modules get written.
 */
const hasContent: Record<string, boolean> = {
  about: about.paragraphs.length > 0,
  journey: experiences.length > 0 || education.length > 0,
  projects: projects.length > 0,
  hackathons: hackathons.length > 0,
  skills: skills.some(hasDomainContent),
  life: interests.length > 0,
  contact: true,
}

/** Sections to display, in registry order. */
export const visibleSections: readonly SectionDefinition[] = sectionRegistry.filter(
  (section) => hasContent[section.id] === true,
)

/** `true` when the section has content and must therefore exist. */
export function isSectionVisible(id: string): boolean {
  return hasContent[id] === true
}
