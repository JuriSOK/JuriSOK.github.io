# Portfolio — Sok Vibol Arnaud

Portfolio professionnel de Sok Vibol Arnaud, chef de projet IA et étudiant en Master MIAGE.

> 🚧 **Portfolio en cours de construction.** Le site affiche actuellement une page temporaire
> minimale. La direction artistique et les sections de contenu seront ajoutées progressivement.

## Stack actuelle

- [React](https://react.dev/) 19
- [TypeScript](https://www.typescriptlang.org/) (mode strict)
- [Vite](https://vite.dev/)
- [ESLint](https://eslint.org/)

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

| Commande          | Description                                    |
| ----------------- | ---------------------------------------------- |
| `npm run lint`    | Analyse le code avec ESLint                    |
| `npm run preview` | Sert localement le résultat de `npm run build` |

## Structure du projet

```
.
├── index.html
├── src/
│   ├── components/     # Composants d'interface
│   ├── content/        # Contenu et données du portfolio
│   ├── styles/         # Styles globaux
│   ├── App.tsx
│   └── main.tsx
├── CLAUDE.md           # Règles permanentes du projet
└── vite.config.ts
```

## Déploiement

Le site sera publié via GitHub Pages à l'adresse suivante :

**https://JuriSOK.github.io**

Le déploiement n'est pas encore configuré ; il sera mis en place après validation du design.
