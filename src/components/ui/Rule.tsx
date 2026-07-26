import { useReveal } from '../../hooks/useReveal'
import styles from './Rule.module.css'

interface RuleProps {
  /** `strong` pour le filet d'ouverture d'une section, `hair` pour une séparation. */
  readonly tone?: 'hair' | 'strong'
  readonly className?: string | undefined
}

/** Filet fin qui se trace depuis la gauche à l'apparition. */
export function Rule({ tone = 'hair', className }: RuleProps) {
  const ref = useReveal<HTMLDivElement>()

  const classes = [styles.rule, styles[tone], 'reveal-rule', className]
    .filter((value): value is string => typeof value === 'string')
    .join(' ')

  return <div ref={ref} className={classes} aria-hidden="true" />
}
