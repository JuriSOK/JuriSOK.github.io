import type { Interest } from '../types/content'

/**
 * Interests, rendered as an accessible accordion inside the About page.
 *
 * Written by Vibol Arnaud Sok. `detail` is a list of paragraphs so an entry can
 * add a short aside — and so « Series & Films » can carry no prose at all and
 * show only its Letterboxd link.
 */
export const interests: readonly Interest[] = [
  {
    id: 'photography',
    label: 'Photography',
    icon: 'camera',
    detail: [
      'I enjoy taking my camera wherever I go. Whether I’m traveling, spending time with family and friends, or discovering a new place, I love capturing moments that I’ll be able to look back on years later. For me, photography is less about taking the perfect picture and more about preserving memories and the emotions that come with them !!',
      'My camera : Fujifilm X-A1 😋',
    ],
  },
  {
    id: 'beatbox',
    label: 'Beatbox',
    icon: 'microphone',
    detail: [
      'I’ve been practicing beatbox for around two years, and I love how it combines rhythm, creativity, and improvisation using nothing but the voice. It’s also introduced me to an amazing community and honestly, long live the French beatbox scene, we’re the best!',
    ],
  },
  {
    id: 'new-technologies',
    label: 'New Technologies',
    icon: 'chip',
    detail: [
      'I closely follow emerging technologies, especially artificial intelligence tools, developer platforms and new ways of creating digital products. I’m always looking for new conferences, talks, and events to broaden my perspective, learn from inspiring people, and keep expanding my knowledge !!',
    ],
  },
  {
    /* No prose here on purpose: the Letterboxd profile is the content. */
    id: 'series-films',
    label: 'Series & Films',
    icon: 'cinema',
    detail: [],
    link: {
      label: 'View my Letterboxd profile',
      href: 'https://letterboxd.com/arnaud_sk/',
      mark: 'letterboxd',
    },
  },
  {
    id: 'reading',
    label: 'Reading',
    icon: 'book',
    detail: [
      'Reading is one of my favorite ways to unwind and keep learning. I enjoy detective novels for the suspense and mystery, and every now and then, I’ll pick up a romance novel for a change of pace. I also like reading books about Islam to deepen my understanding of my faith and continue learning through different perspectives.',
    ],
  },
]
