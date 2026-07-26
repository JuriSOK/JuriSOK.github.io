import type { Profile } from '../content/profile'

interface UnderConstructionProps {
  profile: Profile
}

/**
 * Page temporaire affichée tant que la direction artistique n'est pas validée.
 * Volontairement minimale : aucun style thématique n'est introduit ici.
 */
export function UnderConstruction({ profile }: UnderConstructionProps) {
  return (
    <main className="page">
      <h1 className="page__name">{profile.fullName}</h1>
      <p className="page__status">{profile.status}</p>
      <p className="page__headline">{profile.headline}</p>
    </main>
  )
}
