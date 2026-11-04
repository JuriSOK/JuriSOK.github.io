import type { PageProps } from '../../types/content'
import { Section } from '../ui/Section'
import { Interests } from './Interests'

/** Life — « after hours »: what he does once the laptop closes. */
export function Life({ section }: PageProps) {
  return (
    <Section section={section} surface="deep">
      <Interests />
    </Section>
  )
}
