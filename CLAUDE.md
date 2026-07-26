# CLAUDE.md

Règles permanentes du projet. À lire avant toute modification.

## Nature du projet

- Ce projet est le **portfolio professionnel** de Sok Vibol Arnaud (chef de projet IA, Master MIAGE).
- La direction artistique est **`Warm Vintage Jazz Editorial`**, désormais implémentée. Les règles
  ci-dessous sont opposables à toute évolution.

## Direction artistique — règles opposables

- **Budget d'ornement : trois éléments graphiques non textuels au maximum par section** (filet,
  numéro de catalogue, cadre, marque de coupe…). Un ornement qui ne porte aucune information saute.
- **La référence jazz reste typographique, jamais illustrative.** Aucun disque ou vinyle, aucun
  saxophone, aucune note de musique, aucune tasse de café. L'univers passe par la matière (teintes,
  grain, lumière) et le vocabulaire d'édition (numéros de catalogue, crédits, Face A / Face B).
- **Accent selon la surface** : cuivre sur fond espresso (6,0:1), bordeaux sur insert papier (7,3:1).
  Jamais l'inverse — le cuivre tombe à 3,6:1 sur le crème. Le composant `Section` applique
  automatiquement le bon jeu de jetons via `data-surface`, ne pas le contourner.
- **`--caramel` n'est jamais une couleur de texte** (4,0:1, sous le seuil AA) : filets, cadres et
  aplats uniquement.
- **Les polices embarquent le seul sous-ensemble `latin`.** Il couvre tout le français, mais pas les
  symboles comme `↗` ou `◇` : ceux-ci se dessinent en SVG (`Icon.tsx`), jamais en caractères.
- **Logos de technologies** : monochrome au repos, teinte de marque seulement au survol et toujours
  mélangée au latte. Le nom est toujours affiché à côté du logo, qui reste `aria-hidden`.

## Contenu

- **Ne jamais inventer** une expérience, une mission, une compétence, un résultat ou un chiffre.
  Seuls les faits fournis par Sok Vibol Arnaud figurent dans `src/content/`.
- Un champ manquant se rend conditionnellement : pas de texte de remplissage, pas de lien mort, pas
  de bouton désactivé. `links.ts` utilise `null` pour ce qui n'est pas encore fourni.

## Projets

- La sélection vient des dépôts GitHub portant le topic **`portfolio`**, récupérés par
  `npm run sync:projects` dans `src/data/projects.generated.json`, **qui est commité**.
- Aucun appel à l'API GitHub au moment du rendu, donc aucun jeton dans le frontend.
- Les retouches se font dans `projects.overrides.ts`, jamais dans le fichier généré.
- Plusieurs dépôts d'un même projet se réunissent par la table `groups` : leurs dépôts sont retirés
  du flux normal, ce qui rend le doublon structurellement impossible.
- Une carte n'affiche **que** : pochette, nom, description courte, 3 à 5 technologies, lien(s)
  GitHub. Ni étoiles, ni forks, ni date, ni statut, ni année, ni catégorie.

## Stack technique

- Utiliser **Node.js 24 LTS** pour le développement local, les tests et GitHub Actions. La version
  est déclarée dans `.nvmrc`, `.node-version` et le champ `engines` de `package.json` : ces trois
  déclarations doivent rester cohérentes.
- React, TypeScript et Vite.
- TypeScript reste en **mode strict** (`strict: true`). Ne pas assouplir la configuration pour faire
  passer une erreur.

## Architecture et code

- Séparer le **contenu**, la **logique** et les **composants** :
  - `src/content/` : données et textes ;
  - `src/data/` : fichiers générés et commités, jamais édités à la main ;
  - `src/types/` : types partagés (`content.ts`, `project.ts`) ;
  - `src/components/` : composants d'interface (`layout/`, `ui/`, `sections/`, `projects/`) ;
  - `src/hooks/` : logique réutilisable ;
  - `src/styles/` : jetons et styles globaux. Le style d'un composant vit dans son `.module.css`.

## Sections et navigation

- **Une section sans contenu réel ne se rend pas, et disparaît de la navigation.** Jamais un titre
  suivi de vide, jamais une ancre morte. C'est la règle qui permet de publier le site avant que tous
  les textes soient écrits.
- `src/content/navigation.ts` est le **registre des sections construites** : une entrée garantit que
  l'ancre existe. On y ajoute une section seulement quand son composant est écrit.
- `src/content/sections.ts` croise ce registre avec le contenu réel et expose `visibleSections`,
  `navSections`, `isSectionVisible()` et `getSection()`. **La page et la barre de navigation lisent
  ce même verdict** : elles ne peuvent pas diverger.
- Un composant de section lit son numéro, son titre et sa ligne éditoriale via `getSection()` plutôt
  que de les écrire en dur.
- La barre desktop bascule en menu mobile sous **1080 px**.
- Privilégier des composants **accessibles et réutilisables**.
- Maintenir une **excellente expérience mobile** (approche mobile-first).
- Respecter la **navigation clavier** (focus visible, ordre de tabulation cohérent, pas de piège au
  clavier). Une carte projet à lien unique doit rester **une seule tabulation**.
- **Respecter `prefers-reduced-motion`.** Les états de départ des révélations n'existent que sous
  `:root[data-motion="on"]`, attribut posé par React uniquement si le mouvement est permis : sans
  JavaScript ou en mouvement réduit, tout le contenu s'affiche immédiatement. Ne jamais écrire
  d'animation qui laisserait du contenu invisible en cas d'échec.
- N'animer que `transform` et `opacity`.

## Sécurité

- Ne **jamais** placer de clé API, token ou secret dans le frontend.
- Ne **jamais** committer de fichier `.env`.

## Dépendances

- Ne pas ajouter de dépendance sans utilité réelle et démontrée. Le projet n'a **aucune dépendance
  de production** hors React : polices auto-hébergées dans `public/fonts/`, logos recopiés dans
  `src/content/tech.ts`, révélations en `IntersectionObserver` natif.
- Ne pas introduire de bibliothèque d'animation : les effets tiennent en CSS et en API natives.

## Git

- Ne **jamais** utiliser de push forcé (`git push --force`).
- Ne jamais supprimer un fichier important sans vérifier son utilisation au préalable.
- Exécuter `npm run lint` **et** `npm run build` avant chaque commit important.
- Utiliser des messages de commit explicites (convention `type: description`, par exemple
  `feat: add project section`).

## Documentation

- Mettre à jour le `README.md` lorsque l'architecture change.
