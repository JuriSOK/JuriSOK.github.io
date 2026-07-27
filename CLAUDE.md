# CLAUDE.md

Règles permanentes du projet. À lire avant toute modification.

## Nature du projet

- Ce projet est le **portfolio professionnel** de Vibol Arnaud Sok (AI Project Manager en alternance,
  Master MIAGE). L'interface est intégralement en anglais.
- La direction artistique est **`Warm Vintage Jazz Editorial`**, désormais implémentée. Les règles
  ci-dessous sont opposables à toute évolution.

## Direction artistique — règles opposables

- **Budget d'ornement : trois éléments graphiques non textuels au maximum par page** (filet, cadre,
  pastille…). Un ornement qui ne porte aucune information saute.
- **La référence jazz reste typographique, jamais illustrative.** Aucun disque ou vinyle, aucun
  saxophone, aucune note de musique, aucune tasse de café. L'univers passe par la matière (teintes,
  grain, lumière, fond pixel-art) et le vocabulaire d'édition (crédits, filets, mises en page).
- **Accent selon la surface** : cuivre sur fond espresso (6,0:1), bordeaux sur insert papier (7,3:1).
  Jamais l'inverse — le cuivre tombe à 3,6:1 sur le crème. Le composant `Section` applique
  automatiquement le bon jeu de jetons via `data-surface`, ne pas le contourner.
- **Fond pixel-art** : SVG original dessiné dans le projet, jamais d'illustration tierce, de GIF, de
  vidéo ni de canvas. Animations CSS en `transform`/`opacity` uniquement, toutes coupées sous
  `prefers-reduced-motion`, et un voile espresso garantit la lisibilité du panneau.
- **`--caramel` n'est jamais une couleur de texte** (4,0:1, sous le seuil AA) : filets, cadres et
  aplats uniquement.
- **Les polices embarquent le seul sous-ensemble `latin`.** Il couvre tout le français, mais pas les
  symboles comme `↗` ou `◇` : ceux-ci se dessinent en SVG (`Icon.tsx`), jamais en caractères.
- **Logos de technologies** : monochrome au repos, teinte de marque seulement au survol et toujours
  mélangée au latte. Le nom est toujours affiché à côté du logo, qui reste `aria-hidden`.

## Contenu

- **Ne jamais inventer** une expérience, une mission, une compétence, un résultat ou un chiffre.
  Seuls les faits fournis par Vibol Arnaud Sok figurent dans `src/content/`.
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

## Format et navigation

- **Toute l'interface est en anglais** : navigation, titres, contenu, métadonnées, libellés
  accessibles, textes réservés aux lecteurs d'écran. Ne pas réintroduire de français à l'écran.
  Exception : les noms propres (Crédit Agricole Assurances, Université Paris Dauphine-PSL,
  Université Paris Cité, MiniSGBDR, Personal Finance Tracker).
- Le site suit un **format vCard** (référence : codewithsadee/vcard-personal-portfolio) : une
  **sidebar d'identité** — avatar, nom, rôle, coordonnées repliables — et un **panneau principal
  dont le contenu bascule par onglets**. Pas de hero, pas de défilement de sections.
- Quatre pages : About (avec les centres d'intérêt), Resume (avec le bloc compétences), Projects,
  Contact. **Centres d'intérêt et compétences n'ont pas d'onglet propre.**
- **Aucune numérotation éditoriale.** Ni numéros de section, ni numéros de piste, ni numéros de
  catalogue, ni mention d'édition. L'identité repose sur la typographie, les teintes chaudes, les
  filets fins, l'espacement, la texture et le fond pixel-art.
- Chaque page reçoit sa `SectionDefinition` **en prop** depuis `App`. Ne jamais la rechercher par
  identifiant dans le composant : une recherche par chaîne peut échouer silencieusement quand un id
  change, laissant un onglet qui ouvre un panneau vide — c'est arrivé.
- **Un onglet sans contenu réel n'existe pas.** Jamais un titre suivi de vide, jamais un onglet
  creux. C'est la règle qui permet de publier le site avant que tous les textes soient écrits.
- `src/content/navigation.ts` est le **registre des pages construites** ; `src/content/sections.ts`
  le croise avec le contenu réel et expose `visibleSections`, `isSectionVisible()` et `getSection()`.
  **Le panneau et les onglets lisent ce même verdict** : ils ne peuvent pas diverger.
- La bascule d'onglet met à jour le hash (`#projects` reste un lien profond partageable), gère le
  bouton retour via `popstate`, et déplace le focus sur le panneau.
- Sous **1250 px**, la sidebar passe au-dessus du panneau (coordonnées repliées derrière le bouton
  « Contacts ») et les onglets deviennent une **barre fixe en bas**, sous le pouce.
- Interdits hérités du modèle mais refusés ici : jauges et pourcentages de compétences, formulaire
  de contact, carte géographique, filtres de projets.
- Privilégier des composants **accessibles et réutilisables**.
- Maintenir une **excellente expérience mobile** (approche mobile-first).
- Respecter la **navigation clavier** (focus visible, ordre de tabulation cohérent, pas de piège au
  clavier). Une carte projet à lien unique doit rester **une seule tabulation**.
- **Respecter `prefers-reduced-motion`.** Les états de départ des révélations n'existent que sous
  `:root[data-motion="on"]`, attribut posé par React uniquement si le mouvement est permis : sans
  JavaScript ou en mouvement réduit, tout le contenu s'affiche immédiatement. Ne jamais écrire
  d'animation qui laisserait du contenu invisible en cas d'échec.
- N'animer que `transform` et `opacity`.

## Sécurité et vie privée

- Ne **jamais** placer de clé API, token ou secret dans le frontend.
- Ne **jamais** committer de fichier `.env`.
- **Ne jamais publier** : numéro de téléphone, adresse postale, CV. Ne pas créer de bouton CV.
  `SiteLinks` ne contient volontairement que `email`, `linkedin` et `github` — ne pas l'étendre.
- Ne jamais ajouter d'information confidentielle d'entreprise, ni de résultat chiffré.
- **Aucune expérience SNCF** ne doit figurer sur le site.
- Ne jamais inventer d'expérience, de hackathon, de certification, ni de niveau de compétence.

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
