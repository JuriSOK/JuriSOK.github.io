# CLAUDE.md

Règles permanentes du projet. À lire avant toute modification.

## Nature du projet

- Ce projet est le **portfolio professionnel** de Sok Vibol Arnaud (chef de projet IA, Master MIAGE).
- La direction artistique prévue est **`Warm Vintage Jazz Editorial`**.
- **Ne pas développer cette direction artistique avant une demande explicite.** Tant qu'elle n'est pas
  demandée, le rendu reste volontairement minimal et neutre.

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
  - `src/components/` : composants d'interface ;
  - `src/styles/` : styles globaux.
- Privilégier des composants **accessibles et réutilisables**.
- Maintenir une **excellente expérience mobile** (approche mobile-first).
- Respecter la **navigation clavier** (focus visible, ordre de tabulation cohérent, pas de piège au
  clavier).
- Respecter **`prefers-reduced-motion`** lorsque des animations seront ajoutées.

## Sécurité

- Ne **jamais** placer de clé API, token ou secret dans le frontend.
- Ne **jamais** committer de fichier `.env`.

## Dépendances

- Ne pas ajouter de dépendance sans utilité réelle et démontrée.
- Les bibliothèques d'animation ou de composants seront ajoutées uniquement après validation de la
  direction artistique.

## Git

- Ne **jamais** utiliser de push forcé (`git push --force`).
- Ne jamais supprimer un fichier important sans vérifier son utilisation au préalable.
- Exécuter `npm run lint` **et** `npm run build` avant chaque commit important.
- Utiliser des messages de commit explicites (convention `type: description`, par exemple
  `feat: add project section`).

## Documentation

- Mettre à jour le `README.md` lorsque l'architecture change.
