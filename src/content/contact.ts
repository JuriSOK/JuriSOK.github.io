import type { ContactContent } from '../types/content'

/**
 * Contact section — « last call ».
 *
 * The channels themselves live in `links.ts`. No form, no map, no third-party
 * provider — and no CV, phone number or postal address. The heading comes from
 * the section registry, so only the invitation lives here.
 */
export const contact: ContactContent = {
  invitation:
    'Interested in exchanging ideas, projects or opportunities, or need one more person for a hackathon team? Feel free to reach out.',
}
