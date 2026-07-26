import { useEffect, useRef } from 'react'
import { useMediaQuery } from './useMediaQuery'
import { useReducedMotion } from './useReducedMotion'

/**
 * Très léger déplacement vertical indexé sur le défilement, écrit dans une
 * variable CSS. Réservé au pointeur fin et aux grands écrans : sur mobile, le
 * mouvement coûte cher et n'apporte rien.
 *
 * L'écriture passe par `requestAnimationFrame` et ne touche que `transform`,
 * jamais une propriété qui déclencherait un recalcul de mise en page.
 */
export function useParallax(maxOffset = 14) {
  const ref = useRef<HTMLDivElement | null>(null)
  const reduced = useReducedMotion()
  const desktopPointer = useMediaQuery('(pointer: fine) and (min-width: 1024px)')
  const enabled = desktopPointer && !reduced

  useEffect(() => {
    const node = ref.current

    if (node === null) {
      return
    }

    if (!enabled) {
      node.style.removeProperty('--parallax')
      return
    }

    let frame = 0

    const update = () => {
      frame = 0
      const progress = Math.min(window.scrollY / window.innerHeight, 1)
      node.style.setProperty('--parallax', `${(progress * maxOffset).toFixed(2)}px`)
    }

    const onScroll = () => {
      if (frame === 0) {
        frame = window.requestAnimationFrame(update)
      }
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', onScroll)
      if (frame !== 0) {
        window.cancelAnimationFrame(frame)
      }
      node.style.removeProperty('--parallax')
    }
  }, [enabled, maxOffset])

  return ref
}
