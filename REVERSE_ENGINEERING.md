# Rétro-ingénierie — kepard.dev → « une soirée au club »

Ce document consigne l'analyse de [kepard.dev](https://www.kepard.dev/) et la manière dont ses
mécanismes ont été transposés dans le portfolio de Vibol Arnaud Sok.

> **Mise à jour : la direction actuelle est « 2 a.m., le bureau d'Arnaud » (voir [DIRECTION.md](DIRECTION.md)), qui ne reprend plus aucune structure de kepard.dev. Historique : refonte « Chez Arnaud ».** Les §§ 4 à 8 décrivent la première transposition. La
> direction actuelle est documentée dans [DIRECTION.md](DIRECTION.md), et le son dans
> [SOUND.md](SOUND.md).
>
> Mécanismes conservés :
> - le chargement à la demande (« step inside » démarre la scène animée et le trio) ;
> - l'horloge liée au défilement, devenue la plaque « now playing » ;
> - le dock, avec le son, le barman, les napkins et le retour à la porte ;
> - les révélations au défilement.
>
> Ce qui a changé :
> - l'aperçu de projet au survol est devenu un tirage encadré qui s'incline vers le pointeur ;
> - le thème clair / sombre a été retiré ;
> - `npm run verify` compte désormais 26 contrôles.

## 1. Périmètre

kepard.dev est le site personnel de Bogdan Gorelov. **Ce projet n'en est pas une copie.** On a
analysé _comment_ le site fonctionne (structure, rythme, interactions, comportements responsive)
pour reconstruire les mêmes mécanismes avec une identité, un contenu et des assets propres.

Rien n'est repris de l'original :

- ni code ni CSS (tout est réécrit en Next.js, Tailwind et Motion) ;
- ni texte : tout le contenu vient de `src/content/`, fourni par Vibol Arnaud Sok ;
- ni image, illustration, photo ou scène 3D : le fond est le café pixel-art du portfolio existant ;
- ni police : Fraunces et Archivo (OFL), auto-hébergées ;
- ni palette : on garde les tons « Warm Vintage Jazz » (espresso, crème, cuivre, bordeaux).

## 2. Méthode d'exploration

Exploration avec Playwright (Chrome installé, `channel: 'chrome'`) :

- captures à 1440×900, 820×1180 et 390×844, en vue initiale et en pleine page ;
- défilement progressif à la molette : le contenu de l'original n'apparaît qu'en défilant (une
  capture pleine page directe ne montre que des titres) ;
- relevé des styles calculés (`getComputedStyle`) des titres, paragraphes, grilles, dock et liens ;
- clic sur chaque bouton du dock et lecture des dialogues ouverts ;
- tests de la flèche droite, d'Échap, du survol des projets, de la copie de l'email et du thème
  sombre.

## 3. Observations sur l'original

### Technologies détectables

- Next.js (chunks `/_next/static/immutable/`, Turbopack), CSS Modules à classes hachées.
- Icônes Lucide (`lucide-*` dans les classes SVG).
- Quatre familles de polices auto-hébergées, nommées `display`, `serif`, `sans` et `handwriting`.
- Jetons CSS : `--paper`, `--ink`, `--accent`, `--muted`, `--soft`, `--line`, `--glass`, `--shadow`,
  `--text-scale`. Un jeu clair et un jeu sombre.
- Plusieurs fonctionnalités dépendent d'un backend : chat IA, bouteilles à la mer partagées, données
  de montre, compteur de visites, bibliothèque musicale.

### Structure (desktop 1440 px)

| Zone | Mesures relevées |
|---|---|
| Hero `#surface` | 100 vh. Photo floue en fond. Titre display de 76,5 px, `letter-spacing: -2px`, blanc. |
| Colonne de section | `max-width: 1100px`, grille `230px 650px`, `gap: 7%`, `margin-bottom: 165px` |
| Libellé de section (h2) | sans 15 px, graisse 450, filet court en dessous |
| Corps de texte | 17,5 px, interligne 28,9 à 34 px, couleur atténuée |
| Titre de projet | 20 px, graisse 450, `letter-spacing: -0.3px` ; description 15 px, max 410 px |
| Dock | ~362 × 58 px, `border-radius: 30px`, `backdrop-filter: blur(20px)`, fond verre 80 % |
| Pied de page | bande sombre à fort contraste, trois colonnes |

Tout le texte est en minuscules (`text-transform: lowercase`).

### Mécanismes

1. **Chargement à la demande.** Le hero affiche une photo floue. Le bouton « load » charge une île
   3D, et « or just scroll » rappelle que le reste est déjà prêt : la ressource lourde n'est
   chargée que si on la demande.
2. **Jauge de profondeur.** Indicateur fixe en bas à gauche : des mètres (0,0 m → 42,0 m)
   proportionnels au défilement, au-dessus d'une règle graduée. C'est le fil conducteur de la
   page.
3. **Fond qui s'assombrit.** Un dégradé du sable clair vers des tons plus sourds, jusqu'à la bande
   très sombre du pied de page : on « descend » dans la page.
4. **Dock en verre**, fixe en bas à droite (pleine largeur sur mobile) : chat, musique, bouteilles,
   montre, son, choix de l'éclairage (light / dark / system avec coche), réinitialisation.
5. **Survol d'un projet** : une petite fenêtre d'aperçu apparaît près du curseur.
6. **Révélations au défilement** : fondu et léger déplacement vertical, une seule fois.
7. **Contact** : grande adresse email, bouton de copie, rangée de liens discrets.
8. **Pied de page** : « back to the surface », compteur de visites, signature.

## 4. Correspondances

La métaphore océanique devient **une soirée au club, de l'ouverture à la fermeture**.

| Original | Ici | Fichier |
|---|---|---|
| Photo floue + « load » l'île 3D | Café pixel-art flou + « lights up » charge le GIF animé à la demande | `components/hero/Hero.tsx` |
| « or just scroll. everything else is ready. » | « or just scroll in. the rest of the evening is ready. » | `content/site.ts` |
| Jauge 0,0 m → 42,0 m | Horloge de set 8:00 pm → 2:00 am, par pas de 5 min, curseur sur la règle | `components/chrome/SetClock.tsx`, `lib/evening.ts` |
| « a little beneath the surface » | « take a seat » | `content/site.ts` |
| Libellés de section | Un repère horaire (« 9:00 pm · liner notes ») + le titre | `content/navigation.ts` |
| Dégradé sable → profondeur | Dégradé crème → caramel (la salle s'assombrit) ; bande « night » en pied de page | `app/globals.css` (`.room`) |
| Dock : chat IA | « talk to the bartender » : conversation scriptée | `components/overlays/BartenderChat.tsx` |
| Dock : bouteilles à la mer | « notes on napkins » : livre d'or local | `components/overlays/Napkins.tsx` |
| Dock : light / dark / system | « lights up » / « after hours » / system | `components/chrome/Dock.tsx`, `hooks/useTheme.ts` |
| Dock : reset | « back to the door » : retour en haut et lumières éteintes | `components/chrome/ClubShell.tsx` |
| Aperçu de projet au survol | Pochette pixel-art dans la marge, qui suit le curseur verticalement | `components/sections/Projects.tsx` |
| Timeline working / learning | Identique, avec les missions de l'alternance | `components/sections/Journey.tsx` |
| Achievements | Hackathons : participations réelles, résultat seulement s'il est confirmé | `components/sections/Hackathons.tsx` |
| Off the clock + étiquettes | After hours : centres d'intérêt dépliables ; domaines en étiquettes dans About | `components/sections/Life.tsx`, `About.tsx` |
| Email + copie | Identique, plus l'heure réelle de Paris | `components/sections/Contact.tsx` |
| Footer « back to the surface » | « back to the door · 2:00 am · closing time » | `components/chrome/Footer.tsx` |

### Volontairement non repris

- **Numérotation des projets (01, 02…)** : interdite par les règles éditoriales du portfolio.
- **Bouton résumé / CV** : ne jamais publier de CV.
- **Musique, montre, son** : aucun contenu réel à montrer. Les simuler aurait voulu dire inventer.
- **Compteur de visites** : il faudrait un backend, et l'afficher sans en avoir reviendrait à
  inventer un chiffre.
- **Lien X / Hugging Face** : `links.ts` ne contient que email, LinkedIn et GitHub.
- **Éléments décoratifs flottants** (spirales, algues, crabe) : propres à l'univers de l'original.
  Le budget d'ornement du portfolio reste typographique.

## 5. Ce qui est simulé

| Élément | Fonctionnement original | Ici |
|---|---|---|
| Chat | Modèle de langage hébergé | **Script local** : réponses écrites à l'avance dans `content/site.ts` (`bartender`), avec puces de questions, saisie libre rapprochée par mots-clés, sinon réponse de repli. Aucun réseau, aucune clé. |
| Livre d'or | Lettres partagées entre visiteurs (backend) | **`localStorage`** (`club:napkins`) : les notes ne sont visibles que dans le navigateur qui les a écrites. Rendu en texte, jamais en HTML. |
| Thème | Préférence locale | Identique : `localStorage` (`club:theme`), appliqué avant le premier rendu par un script inline. |

Pour brancher un vrai backend plus tard :

- **chat** : remplacer la fonction `ask` de `BartenderChat.tsx` par un appel à une route
  `app/api/…` côté serveur. La clé d'API reste côté serveur, jamais dans le frontend.
- **napkins** : remplacer `load` et `localStorage.setItem` par une route avec modération.

## 6. Choix techniques

- **Next.js 16 (App Router), page statique** (`○ Static`) : aucun rendu dynamique, le site peut
  être exporté ou hébergé n'importe où.
- **Tailwind v4** : jetons de rôle déclarés une fois par thème dans `globals.css` (`:root` et
  `[data-theme='dark']`), puis exposés à Tailwind par `@theme inline` (`text-ink-2`, `bg-glass`,
  `border-line-strong`…). Un composant ne contient jamais de couleur de thème en dur. Exceptions
  voulues : le papier des napkins et le fond des miniatures pixel-art, qui sont des objets
  physiques et ne changent pas avec l'éclairage.
- **Motion (Framer Motion)** pour ce que le CSS fait mal : présence et sortie des dialogues, aperçu
  à ressort, horloge liée au défilement (`useScroll`), bulles du chat.
- **Révélations et entrées en CSS, pas en Motion.** Un premier essai avec `whileInView` produisait
  un HTML serveur en `opacity: 0`, que l'hydratation ne corrige pas. Résultat : contenu invisible
  sans JavaScript ou en mouvement réduit. Désormais, un script inline pose `data-motion="on"`
  seulement si le mouvement est permis, et les états de départ (`.reveal`, `.enter`) n'existent que
  sous cet attribut. Un `IntersectionObserver` partagé déclenche les révélations.
- **Le GIF n'est jamais chargé d'office** : il ne l'est qu'au clic sur « lights up », jamais en
  mouvement réduit (un GIF ne se met pas en pause). L'image fixe floue sert d'affiche.
- **Contraste AA vérifié** au point le plus sombre de chaque dégradé (valeurs en tête de
  `globals.css`). `--ink-3` a été foncé quand le dégradé clair a été approfondi.

## 7. Vérification visuelle et fonctionnelle

Planches côte à côte original / local aux mêmes dimensions (1440×900, 820×1180, 390×844), section
par section, après un défilement progressif qui déclenche les révélations.

Corrections apportées au fil des itérations :

1. Une bande claire apparaissait entre Contact et le pied de page : la marge de la dernière section
   débordait de `<main>`. Corrigé avec `flow-root`.
2. Le dégradé était trop plat par rapport à la « descente » de l'original. Il a été approfondi, et
   `--ink-3` foncé pour rester en AA.
3. Sur mobile, le texte était nettement plus grand que sur l'original. Échelle racine à 14,5 px
   sous 640 px (tout est en `rem`).
4. Sur mobile, le pied de page n'était pas centré comme sur l'original. Corrigé.
5. Sur tablette, l'original garde ses deux colonnes et un dock compact. Le point de rupture est
   passé de `lg` (1024 px) à `md` (768 px).
6. L'aperçu au survol recouvrait le titre du projet. Il est maintenant ancré dans la marge et ne
   suit le curseur que verticalement. Le ressort sur `x` ne suivait pas sa cible, d'où une
   position directe pour `x`.
7. Contenu invisible sans JavaScript ou en mouvement réduit : voir § 6.

`npm run verify` (serveur lancé sur le port 3100) exécute 19 contrôles. Tous passent, sans erreur
console :

- horloge à 8:00 pm en haut et à 2:00 am en bas ;
- GIF chargé seulement après « lights up » ;
- chat : messages d'accueil et réponse à une puce ;
- Échap ferme le dialogue et rend le focus au bouton du dock ;
- note de napkin persistante après rechargement ;
- thème sombre appliqué, et conservé dès le premier rendu ;
- copie de l'email ;
- aperçu au survol ;
- lien profond `#hackathons` ;
- aucun débordement horizontal à 390, 820 et 1440 px ;
- contenu visible sans JavaScript ;
- mouvement réduit : contenu visible sans animation, GIF jamais chargé.

## 8. Écarts restants, assumés

- Ambiance différente : café pixel-art sombre et chaud contre plage claire.
- Le titre du hero ne passe pas en italique serif comme l'original : Fraunces n'est embarquée qu'en
  romain, et une italique synthétique serait laide. Le contraste vient du passage Archivo → Fraunces.
- Le dock compte quatre outils au lieu de sept (voir § 4).
- Pas de décor flottant ni d'illustration en pied de page.
