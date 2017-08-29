
SVG : symboles
===============================================================================

Le Garden Starter Kit embarque une solution pour inclure une collection de symbole svg inline dans le html.

Vous trouverez plus d’infos sur cette technique dans [l’article de css-tricks sur le sujet](https://css-tricks.com/svg-symbol-good-choice-icons/).


Configuration
-------------------------------------------------------------------------------

```json
  "svg": {
    "src-dir"  : "./src/assets/svg/symbols",
    "dest-dir" : "./src/assets/svg",
    "id-prefix": "symbol",
    "dest-file": "symbols"
  },
```

Vos fichiers svg pour chaque icon sera dans le dossier et sous dossiers de `src-dir`.
La tâche `gulp svg` en fera des symboles dans le fichier `dest-file`.svg qui sera situé dans le dossier `dest-dir`.

Les `id` des symboles seront préfixés par `id-prefix` et composer de leur chemin depuis `src-dir`.

Avec la config par défaut on aura donc pour un fichier source `./src/assets/svg/symbols/animals/fish.svg` un symbole avec l’id `symbols-animals-fish` dans le fichier `./src/assets/svg/symbol.svg`.


Utilisation
-------------------------------------------------------------------------------

Mettez vos symboles SVG « propres » dans le dossier sources.
Puis lancez la tâche `gulp svg`.

Notez que builder le fichiers de symboles ne suffira pas à avoir les symboles à jour dans le html ou le styleguide. Il faudra donc rebuildez ceux-ci.

Les tâches `gulp watch` ou `gulp live` surveillent aussi l’ajout et la modification des svg sources afin de regénérer le html et le styleguide.

