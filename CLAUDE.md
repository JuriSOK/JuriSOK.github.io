# CLAUDE.md

Règles permanentes du projet. À lire avant toute modification.

## Nature du projet

- Ce projet est le **portfolio professionnel** de Vibol Arnaud Sok (Data Analyst en alternance,
  Master MIAGE). L'interface est intégralement en anglais.
- La direction artistique est **`Warm Vintage Jazz Editorial`**, désormais implémentée. Les règles
  ci-dessous sont opposables à toute évolution.
- Le niveau visé est celui d'un portfolio éditorial mûr (référence de maturité, **jamais de copie** :
  kepard.dev) : un récit qui se lit d'un seul défilement, une métaphore unique qui porte la
  navigation, une voix personnelle mais toujours adossée à des faits, et de la retenue visuelle.

## Direction artistique — règles opposables

- **Budget d'ornement : trois types d'éléments graphiques non textuels sur tout le site** — filets,
  cadres de cartes, pastilles (technologies, point « en cours »). Un ornement qui ne porte aucune
  information saute.
- **La métaphore : une soirée au club, de l'ouverture à la fermeture.** Chaque section porte un
  `cue` horaire (« 9:00 pm · liner notes »… « 2:00 am · closing time »). L'horloge de l'en-tête
  affiche le `cue` de la section lue : c'est le fil de la page. Les **titres restent clairs** — un
  recruteur ne doit jamais décoder un jeu de mots pour trouver l'expérience. Les horaires sont une
  set-list, pas l'heure réelle : l'heure réelle de Paris n'apparaît que dans Contact, libellée
  comme telle.
- **La référence jazz reste typographique, jamais illustrative.** Aucun disque ou vinyle, aucun
  saxophone, aucune note de musique, aucune tasse de café. L'univers passe par la matière (teintes,
  grain, lumière, fond pixel-art) et le vocabulaire d'édition (crédits, filets, mises en page).
- **Accent selon la surface** : cuivre sur fond espresso (6,0:1), bordeaux sur insert papier (7,3:1).
  Jamais l'inverse — le cuivre tombe à 3,6:1 sur le crème. Le composant `Section` applique
  automatiquement le bon jeu de jetons via `data-surface`, ne pas le contourner.
- **Fond pixel-art** : `public/jazz-cafe-background.gif`, posé en `background-image` sur un calque
  fixe (`AppBackground`), `cover`, centré, `pointer-events: none`, `z-index: -2`. Aucun voile : seul l'écran
  d'ouverture est transparent, et son texte repose sur une plaque opaque ; toutes les sections et
  l'en-tête sont opaques. La lisibilité ne dépend donc jamais du fond.
- Un GIF ne peut pas être mis en pause en CSS. Sous `prefers-reduced-motion`, le calque bascule sur
  `jazz-cafe-background-still.png`, une image fixe de la même scène. Si le GIF est remplacé,
  **régénérer aussi cette image** : `sips -s format png <gif> --out <png>`.
- **Icônes et scènes pixel-art** : dessins originaux uniquement, déclarés en cartes de pixels et
  rendus par `PixelGrid` (`src/components/pixel-art/`), palette chaude partagée dans `palette.ts`.
  Jamais d'emoji, de bibliothèque d'icônes, d'asset distant ni de sprite protégé pour ces
  illustrations. Toujours décoratives (`aria-hidden`) : le texte visible nomme le sujet.
- **Logos d'organisations et d'universités** : assets officiels stockés en local, sur tuile crème
  (ils portent tous de l'encre sombre) avec `mix-blend-mode: multiply` pour fondre un éventuel fond
  blanc opaque. `alt=""` quand le nom est affiché juste à côté — un nom accessible dupliqué serait
  lu deux fois. Proportions toujours préservées, jamais de recadrage.
- **Heure locale (section Contact)** : `Intl.DateTimeFormat` sur `profile.timezone`, jamais un décalage
  UTC codé en dur ; mise à jour à la minute, minuteries nettoyées au démontage.
- **`--caramel` n'est jamais une couleur de texte** (4,0:1, sous le seuil AA) : filets, cadres et
  aplats uniquement.
- **Les polices embarquent le seul sous-ensemble `latin`.** Il couvre tout le français, mais pas les
  symboles comme `↗` ou `◇` : ceux-ci se dessinent en SVG (`Icon.tsx`), jamais en caractères.
- **Logos de technologies** : couleur de marque affichée en permanence. Les valeurs de `tech.ts` ne
  sont pas toujours le hex officiel — chacune est vérifiée contre le fond de pastille
  (`--surface-raised`) et, sous 3:1, éclaircie **le long de sa propre teinte** jusqu'à passer. Une
  couleur trop sombre et trop saturée pour y arriver sans virer au néon est mélangée vers le latte :
  c'est pourquoi Rust, Java et Splunk, officiellement noirs, s'affichent en bronze chaud. Ne jamais
  remettre un hex officiel sans revérifier son contraste. Le nom reste toujours affiché à côté du
  logo, qui reste `aria-hidden`.
- **Avatar** (écran d'ouverture) : `src/arnaud-avatar.png`, importé par Vite plutôt que référencé par URL — un fichier
  manquant casse alors le build au lieu de produire un 404 silencieux. `object-fit: contain`, cadre
  au ratio de la source, jamais de recadrage circulaire. Le monogramme « VAS » ne couvre qu'un vrai
  échec de chargement.

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
- Le site est une **page unique en récit continu** : écran d'ouverture (plaque d'identité sur le
  fond pixel-art), puis About, Journey, Projects, Hackathons, Skills, Life, Contact, et un pied de
  page « closing time ». En-tête collant : nom, horloge de set, liens d'ancre.
- **Aucune numérotation éditoriale.** Ni numéros de section, ni numéros de piste, ni numéros de
  catalogue, ni mention d'édition. Les `cue` horaires ne sont pas des numéros.
- Chaque section reçoit sa `SectionDefinition` **en prop** depuis `App`. Ne jamais la rechercher par
  identifiant dans le composant : une recherche par chaîne peut échouer silencieusement quand un id
  change, laissant un lien de navigation qui ne pointe sur rien.
- **Une section sans contenu réel n'existe pas.** Jamais un titre suivi de vide. C'est la règle qui
  permet de publier le site avant que tous les textes soient écrits.
- `src/content/navigation.ts` est le **registre des sections construites** (id, libellé de nav,
  titre, `cue`) ; `src/content/sections.ts` le croise avec le contenu réel et expose
  `visibleSections` et `isSectionVisible()`. **La page et l'en-tête lisent ce même verdict** : ils
  ne peuvent pas diverger.
- Les ids servent d'ancres (`#projects` reste un lien profond partageable). Les anciens hashes de
  la version à onglets (`#resume`) sont réécrits par `replaceState` dans `App`.
- Sous **960 px**, les liens de l'en-tête se replient derrière un bouton « Menu » (Échap ferme et
  rend le focus au bouton ; hors de l'ordre de tabulation tant que fermé).
- Interdits : jauges et pourcentages de compétences, formulaire de contact, carte géographique,
  filtres de projets, bouton CV (même si la référence en a un).
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
- **Hackathons : participations réelles uniquement.** Période telle que fournie (mois ou saison),
  rôle, liens. Le champ `outcome` n'existe que pour un résultat confirmé et public ; une simple
  soumission n'en reçoit pas. Ne jamais écrire de prix, classement ou chiffre non confirmé.

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

## Déploiement

- Le site est en ligne sur **https://jurisok.github.io**, publié par
  `.github/workflows/deploy.yml` à chaque push sur `main`.
- La source de GitHub Pages doit rester **« GitHub Actions »**. Repassée sur une branche, Pages sert
  la racine du dépôt : le navigateur reçoit l'`index.html` source, refuse son entrée
  `/src/main.tsx`, et la page est blanche.
- **Ne pas ajouter de `base` dans `vite.config.ts`.** Le dépôt s'appelle `JuriSOK.github.io`, le site
  est donc servi à la racine du domaine et le `base: '/'` par défaut est correct.
- Le workflow lance `lint` puis `build` avant de publier : un commit cassé ne part jamais en ligne.
- `npm run sync:projects` ne doit **pas** tourner en CI — il appelle l'API GitHub et réécrit un
  fichier versionné. Rafraîchir la sélection en local, puis pousser.

## Documentation

- Mettre à jour le `README.md` lorsque l'architecture change.
