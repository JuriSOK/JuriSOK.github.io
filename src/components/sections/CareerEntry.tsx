import type { Education, Experience } from '../../types/content'
import { useReveal } from '../../hooks/useReveal'
import { CreditList, type CreditRow } from './CreditList'
import styles from './CareerEntry.module.css'

interface CareerEntryProps {
  readonly entry: Experience | Education
}

function isExperience(entry: Experience | Education): entry is Experience {
  return 'organisation' in entry
}

/**
 * Fiche de crédits d'une entrée de parcours, expérience ou formation.
 *
 * Tous les champs sauf l'organisation ou le diplôme sont optionnels. Sans
 * période, la colonne de gauche disparaît et le contenu se recale sur toute la
 * largeur : jamais de colonne vide.
 */
export function CareerEntry({ entry }: CareerEntryProps) {
  const ref = useReveal<HTMLLIElement>()

  const experience = isExperience(entry) ? entry : null
  const education = isExperience(entry) ? null : entry

  /**
   * Le titre est le fait le plus précis dont on dispose. Sans intitulé de poste
   * connu, c'est l'organisation qui prend la tête : un `<h3>` vide surmontant
   * un sous-titre serait un titre creux pour les lecteurs d'écran et un blanc
   * inexpliqué à l'œil.
   */
  const title = experience ? (experience.role ?? experience.organisation) : (education?.degree ?? '')
  const subtitle = experience
    ? experience.role !== undefined
      ? experience.organisation
      : undefined
    : education?.school

  const period = entry.period

  const rows: CreditRow[] = experience
    ? [
        { label: 'Missions', values: experience.missions ?? [] },
        { label: 'Domaines', values: experience.domains ?? [], inline: true },
        { label: 'Outils', values: experience.tools ?? [], inline: true },
      ]
    : [
        { label: 'Domaines', values: education?.fields ?? [], inline: true },
        { label: 'Travaux', values: education?.highlights ?? [] },
      ]

  return (
    <li ref={ref} className={`${styles.entry} reveal`} data-period={period !== undefined}>
      {period !== undefined ? <p className={`label ${styles.period}`}>{period}</p> : null}

      <div className={styles.body}>
        <div className={styles.heading}>
          {/* h4 : l'entrée appartient au mouvement « Expériences » ou
              « Formation », qui porte déjà un h3. */}
          <h4 className={styles.title}>{title}</h4>
          {experience?.current === true ? (
            <p className={`label ${styles.stamp}`}>
              <span className={styles.dot} aria-hidden="true" />
              En poste
            </p>
          ) : null}
        </div>

        {subtitle !== undefined ? <p className={styles.organisation}>{subtitle}</p> : null}

        {experience?.summary !== undefined ? (
          <p className={styles.summary}>{experience.summary}</p>
        ) : null}

        <CreditList rows={rows} />
      </div>
    </li>
  )
}
