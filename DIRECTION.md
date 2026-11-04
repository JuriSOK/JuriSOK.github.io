# Direction artistique — « 2 a.m., le bureau d'Arnaud »

Ce document remplace la direction « Chez Arnaud » (club de jazz). Celle-ci a été abandonnée, pas
retouchée.

## 1. Pourquoi repartir de zéro

Les versions précédentes, vitrine vCard, récit en défilement puis club de jazz, partageaient le
même squelette : **une pile verticale de sections**, chacune avec un titre et des blocs dessous.
On changeait la peinture, pas la maison. Les projets restaient des cartes (image, titre, texte,
liens), les hackathons des blocs costumés, et le visiteur faisait défiler un CV.

Le critère retenu : **si l'on masque les couleurs et les polices, reconnaît-on encore l'ancien
portfolio ?** Pour toutes les versions précédentes, oui.

## 2. Contenu conservé, et lui seul

Il vient intégralement de `src/content/`, sans rien d'inventé :

- identité, rôle et liens (email, LinkedIn, GitHub) ;
- About, 3 valeurs, 5 domaines visés, domaines métier ;
- alternance : équipe, missions, outils ;
- 2 diplômes ;
- 2 projets GitHub (Personal Finance Tracker, MiniSGBDR) ;
- 2 hackathons (KinCall, DraftLens) ;
- 4 familles de compétences ;
- 5 centres d'intérêt, dont un lien Letterboxd ;
- l'invitation au contact.

On garde aussi deux fonctionnalités utiles :

- le trio de jazz génératif (voir SOUND.md), désormais joué par la radio ;
- le livre d'or local, désormais des post-it collés sur le bureau.

## 3. Trois directions étudiées

| Direction | Idée | Pourquoi elle n'a pas été retenue |
|---|---|---|
| **Radio Arnaud 88.7** | Un poste de radio vintage : on tourne le cadran pour capter des « stations » (les sections). | Superbe pour le son, mais le contenu finit dans un panneau de texte unique. On change de section au lieu de la faire défiler : la structure reste la même. |
| **Le comptoir** | Un long travelling horizontal le long d'un bar de nuit, objets en parallaxe. | Immersif, mais c'est encore une pile, tournée de 90°. |
| **2 a.m., le bureau** ✓ | Une vue de dessus du bureau d'Arnaud, la nuit, sous une lampe. **Chaque objet est un contenu**, et on le prend en main. | Retenue. |

### Pourquoi le bureau

- **Il casse vraiment la structure.** Il n'y a plus de sections, mais une seule scène où tout
  est visible d'un coup et qu'on explore dans l'ordre qu'on veut. Masquer couleurs et polices ne
  laisse rien de l'ancien site : il ne reste que des objets épars sur une surface.
- **Chaque projet reçoit la forme de ce qu'il raconte**, au lieu d'une carte commune.
- **C'est cozy par nature** : une lampe, du bois, du papier, une radio, l'heure réelle de Paris.
  C'est intime et personnel, c'est son bureau.
- **C'est ludique** : on déplace les objets, on retourne un badge, on imprime un ticket, on tape
  sur un clavier, on pousse les objets du bout de la souris.

## 4. Les objets — la forme suit le contenu

| Objet sur le bureau | Contenu | Ce qu'on fait en le prenant |
|---|---|---|
| Fiche agrafée « hi, i'm Arnaud » | Nom (le `h1`), rôle | Elle est posée au centre, c'est la première chose lue. |
| Carnet en cuir avec élastique | About, valeurs, domaines visés | Il s'ouvre en double page sur papier ligné, et l'on tourne la page. |
| Badge d'entreprise sur son tour de cou | Alternance (Crédit Agricole Assurances) | On le retourne : l'équipe et les missions sont au dos. |
| Deux cartes d'étudiant | Master MIAGE, Licence | Elles s'étalent sur la table. |
| **Ticket de caisse** | **Personal Finance Tracker** | Il **s'imprime ligne à ligne**, avec le bruit d'une imprimante thermique. Un projet de suivi de dépenses présenté comme un ticket « itemisé » : stack, nombre de dépôts, liens. |
| **Fiches bristol sous élastique** | **MiniSGBDR** | On **fait défiler les fiches** : notice, « catalogue entry », emplacement. Un SGBD présenté comme un fichier de bibliothèque. |
| **Message « While you were out »** | **KinCall** | Un message téléphonique : de qui, à propos de quoi, le message, « my part », l'issue, et le lien « call back ». Un projet d'agents vocaux qui appellent, raconté comme un appel manqué. |
| **Carte à collectionner** | **DraftLens** | Une carte de draft NBA avec un reflet holographique au survol. On la retourne pour lire le « scouting report ». |
| Clavier mécanique | Compétences | Chaque rangée est un domaine, chaque touche un outil. On appuie : la touche descend avec un clic, et un petit écran affiche l'usage. Toutes les touches ont la même taille : aucune notation. |
| Polaroïds | Centres d'intérêt | On en prend un, il se retourne : l'histoire est au dos. |
| Carte postale « Greetings from Paris » | Contact | Elle arrive face image puis se retourne : message, adresse, copie de l'email, « write back ». |
| Stickers sur le laptop | GitHub, LinkedIn, email | De vrais liens, découpés et collés de travers. Ils se décollent légèrement au survol. |
| Radio | La musique | Le corps l'allume et l'éteint, le bouton change de morceau. L'aiguille dérive pendant qu'elle joue. |
| Horloge à volets | L'heure réelle à Paris | |
| Bloc de post-it | Livre d'or local | On écrit, et le post-it tombe sur le bureau. On peut le déplacer. |
| Lampe | La lumière | Vue réellement de dessus : pied lesté, bras à ressorts, dos de l'abat-jour orienté vers la flaque de lumière ; seule la doublure de l'ouverture s'allume. C'est la source des ombres. |

## 5. Lumière et matières

- **Bois** : du noyer, dont le veinage est généré en SVG (turbulence étirée dans le sens des
  planches) et dont les joints de planches restent visibles.
- **Lumière** : une seule source, la lampe. Chaque objet est éclairé selon sa distance à la lampe,
  et son ombre portée part dans la direction opposée, d'autant plus longue qu'il en est loin.
  Tout est calculé à partir de la disposition (`lib/desk.ts`), donc rien n'est réglé à la main. La luminosité se lit dans la flaque de lumière ; l'ombre part de l'abat-jour lui-même (`lampSource`), plus longue et plus floue avec la distance — les taches et le bois usé n'en ont pas.
- **Habité** : une tasse de café (vapeur), un rond de tasse, un crayon trop taillé, des trombones, une gomme, un brouillon froissé, un nœud et le vernis usé devant le clavier ; une pliure sur la fiche, le papier thermique qui gondole, le cachet de la poste, le cuir usé aux coins du carnet. Inertes, sous les objets, jamais focalisables.
- **Papier** : chaque imprimé garde sa propre encre (bristol, papier thermique, carbone rose,
  carte glacée), avec un grain de fibre.
- **Typographies**, chacune avec un rôle :
  - **Caveat** (manuscrite) pour tout ce qu'Arnaud écrit à la main ;
  - **IBM Plex Mono** pour ce qui est imprimé (ticket, fiches, adresses) ;
  - **Fraunces** pour le texte « composé » (carnet, carte postale) ;
  - **Archivo condensée** pour les en-têtes imprimés.

## 6. Le motion design — chaque mouvement a une cause

| Moment | Mouvement | Intention |
|---|---|---|
| Arrivée | La pièce est dans le noir. « it's 20:17 in Paris. Arnaud is still at his desk. », puis on allume la lampe. | La mise en scène de l'arrivée, avec l'heure réelle. |
| Allumage | La lampe clignote comme un vrai tube, la flaque de lumière s'installe, et les étiquettes manuscrites nomment chaque objet pendant 3 s. | On découvre la pièce, et l'on apprend sans mode d'emploi que tout s'ouvre. |
| Survol | L'objet se soulève et se redresse légèrement, et son étiquette manuscrite apparaît. | On tend la main vers lui. |
| **Prendre un objet** | **La vue détaillée part de l'endroit exact et de l'angle de l'objet sur le bureau, puis vient vers soi avec un ressort.** Le bureau se floute et s'assombrit derrière. | La transition principale : on soulève l'objet, au lieu d'ouvrir une modale. |
| Reposer | Le chemin inverse, jusqu'à la position *actuelle* de l'objet (il a pu être déplacé). | La pièce garde sa cohérence. |
| Déplacer | Un glisser avec inertie : l'objet se soulève et passe au-dessus des autres. | Le bureau appartient au visiteur. |
| Dans les objets | Impression ligne à ligne, page qui tourne, badge et carte qui pivotent en 3D, fiches qui se mélangent, touche qui s'enfonce, polaroïd qui se retourne. | Chaque objet bouge à sa manière. |
| Vie | La vapeur monte du café une fois la lampe allumée, l'aiguille de la radio dérive, l'horloge avance. | Un lieu vivant, sans surcharge. |

En mouvement réduit, la vapeur ne monte pas et rien ne vole : les vues apparaissent en fondu, les
retournements sont instantanés et le GIF n'existe plus.

## 7. Accessibilité, sans rien sacrifier

- Chaque objet est un vrai bouton, avec un libellé explicite (« Project — MiniSGBDR »). L'ordre de
  tabulation suit l'histoire, pas la disposition.
- **« what's on the desk? »** liste tous les objets : on peut tout ouvrir sans chercher.
- Chaque vue est un dialogue : Échap la ferme, Tab reste dedans, et le focus revient à l'objet.
- Un guide invisible à l'écran explique le bureau aux lecteurs d'écran ; chaque vue est un dialogue complet. **Il n'y a plus de version texte en bas de page** : tout passe par les objets. Sans JavaScript, une petite note donne le nom et les contacts.
- Aucun son n'est joué sans geste : « switch on the lamp » entre en silence, et la radio ne
  démarre que si on la demande.

## 8. Mobile

Le bureau a une **seconde disposition, en portrait** (1000 × 2600 unités), que l'on parcourt en
défilant. Elle n'est pas compressée : les objets sont réarrangés et agrandis pour le pouce. Le
glisser est désactivé au toucher, pour que le défilement reste naturel.

## 9. Grille d'auto-évaluation

| Question | Réponse |
|---|---|
| Couleurs et polices masquées, reconnaît-on l'ancien portfolio ? | Non : il n'y a plus de sections ni de pile, seulement une scène. |
| Les projets ressemblent-ils à des cartes ? | Non : un ticket qui s'imprime, des fiches qu'on fait défiler, un message téléphonique, une carte à collectionner. |
| Les sections sont-elles empilées ? | Il n'y a pas de sections. |
| Les animations se limitent-elles à des fondus ? | Non : objet qui vole jusqu'à la main, retournements 3D, impression, lampe qui s'allume, vapeur du café, glisser avec inertie. |
| Template IA ? | Aucun composant générique : chaque élément est un objet dessiné pour ce contenu. |
| Cozy et personnel ? | Une lampe, du bois, un café, une radio, son badge, son carnet, l'heure de Paris. |
| Envie d'explorer ? | Tout s'ouvre et se déplace, et il y a des détails à découvrir (la vapeur du café, l'aiguille de la radio, « p.s. the radio works »). |

## 10. Pistes

- **De vraies photos** (Fujifilm X-A1) dans les polaroïds, au lieu des icônes pixel.
- **Une démo déployée** : le ticket pourrait porter un QR code vers elle.
- **Mémoriser la disposition** du bureau entre deux visites.
