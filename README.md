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

- Node.js 20 ou supérieur
- npm

## Installation

```bash
git clone https://github.com/JuriSOK/JuriSOK.github.io.git
cd JuriSOK.github.io
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
