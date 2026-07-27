import type { ReactNode } from 'react'
import { Icon, type IconName } from './Icon'
import styles from './ButtonLink.module.css'

interface ButtonLinkProps {
  readonly href: string
  readonly children: ReactNode
  readonly variant?: 'solid' | 'outline'
  /** Ouvre dans un nouvel onglet et annonce la sortie aux lecteurs d'écran. */
  readonly external?: boolean
  readonly icon?: IconName
  /** Précision lue par les lecteurs d'écran, pour lever une ambiguïté hors contexte. */
  readonly srSuffix?: string
  /** Étend la zone cliquable à tout le parent positionné. */
  readonly stretched?: boolean
  readonly className?: string | undefined
}

export function ButtonLink({
  href,
  children,
  variant = 'outline',
  external = false,
  icon,
  srSuffix,
  stretched = false,
  className,
}: ButtonLinkProps) {
  const classes = [styles.button, styles[variant], stretched ? styles.stretched : null, className]
    .filter((value): value is string => typeof value === 'string')
    .join(' ')

  return (
    <a
      className={classes}
      href={href}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      <span>{children}</span>
      {srSuffix !== undefined || external ? (
        <span className="sr-only">
          {srSuffix !== undefined ? ` ${srSuffix}` : ''}
          {external ? ' (opens in a new tab)' : ''}
        </span>
      ) : null}
      {icon !== undefined ? <Icon name={icon} className={styles.icon} /> : null}
    </a>
  )
}
