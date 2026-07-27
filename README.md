# Portfolio — Sok Vibol Arnaud

Portfolio professionnel de Sok Vibol Arnaud, chef de projet IA et étudiant en Master MIAGE.

> 🚧 **Portfolio en cours de construction.** Sections en ligne : Accueil, À propos, Parcours,
> Projets et Centres d'intérêt. La section Compétences est développée mais reste masquée tant que
> `src/content/skills.ts` n'est pas rempli. Reste à construire : Contact.

## Contenu et sections

Tous les textes vivent dans `src/content/` : modifier une phrase du site ne demande jamais d'ouvrir
un composant. Les fichiers portant la mention `À REMPLIR` attendent du contenu.

**Une section sans contenu réel ne s'affiche pas et disparaît de la navigation.** Le site est donc
publiable à tout moment : il n'affiche jamais un titre suivi de vide, et se remplit tout seul à
mesure que les fichiers de contenu sont écrits.

## Stack actuelle

- [React](https://react.dev/) 19
- [TypeScript](https://www.typescriptlang.org/) (mode strict)
- [Vite](https://vite.dev/)
- [ESLint](https://eslint.org/)

Aucune dépendance de production hors React : les polices sont auto-hébergées, les logos sont des
tracés SVG embarqués, et les animations reposent sur `IntersectionObserver`.

## Sélection des projets

Les projets affichés sont les dépôts GitHub portant le topic **`portfolio`**.

```bash
npm run sync:projects
```

Le script interroge l'API publique GitHub et écrit `src/data/projects.generated.json`, qui est
commité : le site ne fait donc aucun appel réseau chez le visiteur et se construit hors-ligne.
Aucun jeton n'est nécessaire ni embarqué.

Pour ajouter un projet :

```bash
gh repo edit JuriSOK/NOM-DU-DEPOT --add-topic portfolio
npm run sync:projects
```

Les descriptions, titres, technologies et l'ordre d'affichage se retouchent dans
`src/content/projects.overrides.ts` — uniquement pour les dépôts qui en ont besoin. La table `groups`
du même fichier réunit plusieurs dépôts sous une seule carte (cas de `personal-finance-tracker`,
réparti entre frontend et backend).

## Prérequis

- **Node.js 24 LTS** (requis — la contrainte est déclarée dans le champ `engines` de `package.json`)
- npm 11 ou supérieur (fourni avec Node.js 24)

L'usage d'un gestionnaire de versions comme [`nvm`](https://github.com/nvm-sh/nvm),
[`fnm`](https://github.com/Schniz/fnm) ou [`mise`](https://mise.jdx.dev/) est recommandé afin de
garder la même version entre le développement local et les futurs workflows GitHub Actions. La
version attendue est déclarée dans les fichiers `.nvmrc` et `.node-version`.

Si `nvm` est installé, il suffit d'exécuter à la racine du projet :

```bash
nvm use
```

(la première fois : `nvm install 24`)

## Installation

```bash
git clone https://github.com/JuriSOK/JuriSOK.github.io.git
cd JuriSOK.github.io
nvm use          # facultatif, si nvm est installé
npm install
```

## Développement

```bash
npm run dev
```

Le serveur de développement démarre sur `http://localhost:5173`.

## Build

```bash
npm run build
```

Les fichiers de production sont générés dans `dist/`.

## Autres commandes

| Commande               | Description                                     |
| ---------------------- | ----------------------------------------------- |
| `npm run lint`         | Analyse le code avec ESLint                     |
| `npm run preview`      | Sert localement le résultat de `npm run build`  |
| `npm run sync:projects`| Régénère la sélection depuis le topic GitHub    |

## Structure du projet

```
.
├── index.html
├── public/
│   └── fonts/               # Fraunces et Archivo auto-hébergées (+ licences OFL)
├── scripts/
│   └── sync-projects.mjs    # Récupère les dépôts au topic `portfolio`
├── src/
│   ├── components/
│   │   ├── layout/          # En-tête, menu mobile, colophon, grain, lien d'évitement
│   │   ├── ui/              # Section, SectionHeading, Rule, ButtonLink, Icon
│   │   ├── sections/        # Hero et panneau d'édition
│   │   └── projects/        # Grille, carte, pochette générée, pastilles techno
│   ├── content/             # Textes, données, registre de sections et de logos
│   ├── data/                # Fichiers générés et commités (ne pas éditer)
│   ├── types/               # content.ts et project.ts
│   ├── hooks/               # Révélation, mouvement réduit, verrou de défilement, parallaxe
│   ├── styles/              # Jetons, polices, styles globaux
│   ├── App.tsx
│   └── main.tsx
├── CLAUDE.md                # Règles permanentes du projet
└── vite.config.ts
```

## Accessibilité

Le site est vérifié au clavier et en mouvement réduit à chaque étape : lien d'évitement en premier,
anneau de focus visible partout, cibles d'au moins 44 px, menu mobile en `<dialog>` modal natif
(piège de focus et `Échap` assurés par le navigateur). Sous `prefers-reduced-motion`, aucune
animation ne subsiste et l'intégralité du contenu reste affichée.

## Déploiement

Le site sera publié via GitHub Pages à l'adresse suivante :

**https://JuriSOK.github.io**

Le déploiement n'est pas encore configuré ; il sera mis en place après validation du design.
