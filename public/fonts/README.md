# Polices auto-hébergées

Les deux fichiers sont servis depuis ce dossier plutôt que depuis un CDN : aucune requête vers un
tiers, aucune dépendance npm, et des URL stables qui permettent un `<link rel="preload">` fiable
dans `index.html`.

| Fichier | Famille | Axes variables | Poids |
|---|---|---|---|
| `fraunces-latin-variable.woff2` | Fraunces | `opsz` 9–144, `wght` 100–900, `SOFT` 0–100, `WONK` 0–1 | 118 Ko |
| `archivo-latin-variable.woff2` | Archivo | `wght` 100–900, `wdth` 62–125 | 88 Ko |

## Sous-ensemble

Les deux fichiers sont le sous-ensemble **`latin`** (`U+0000-00FF`, `U+0152-0153`, `U+2000-206F`,
`U+20AC`…). Il couvre **intégralement le français** : é è ê ë à â ç ù û ï î ô œ Œ « » — tous ces
caractères sont dans Latin-1 ou dans les plages explicitement incluses.

Le sous-ensemble `latin-ext` n'est donc **pas** nécessaire et n'est pas embarqué : il aurait ajouté
142 Ko pour des caractères d'Europe centrale et orientale que le site n'utilise pas.

Conséquence à connaître : les symboles hors de ces plages (flèches `↗`, losanges `◇`…) ne sont pas
dans les fichiers. Ils sont donc dessinés en SVG en ligne, jamais écrits comme caractères.

## Provenance

Extraits des paquets Fontsource, puis les paquets ont été désinstallés :

```bash
npm install --no-save @fontsource-variable/fraunces @fontsource-variable/archivo
cp node_modules/@fontsource-variable/fraunces/files/fraunces-latin-full-normal.woff2 \
   public/fonts/fraunces-latin-variable.woff2
cp node_modules/@fontsource-variable/archivo/files/archivo-latin-standard-normal.woff2 \
   public/fonts/archivo-latin-variable.woff2
```

Pour Fraunces, la variante `full` a été retenue plutôt que `standard` : elle seule embarque les axes
`SOFT` et `WONK`, qui donnent aux grands titres leur aspect encré et légèrement irrégulier.

## Licences

Les deux familles sont sous **SIL Open Font License 1.1**, reproduite dans `LICENSE-Fraunces.txt` et
`LICENSE-Archivo.txt`. Elle autorise l'usage web, y compris commercial, à condition de conserver
l'avis de licence — c'est l'objet de ces deux fichiers.

- Fraunces — Undercase Type, Phaedra Charles, Flavia Zimbardi
- Archivo — Omnibus-Type
