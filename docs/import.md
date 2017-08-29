
Import : importer des fichiers externes dans son build
===============================================================================

Le Garden Starter Kit embarque une solution pour ajouter des ressources externes au build.

Les tâches d’import copient simplement des fichiers depuis une source vers une destination.

Elles peuvent servir par exemple pour copier un asset provenant d’une dépendance NPM.


Configuration
-------------------------------------------------------------------------------

```json
  "import": {
    "fontAwesome": {
      "src"      : "./node_modules/font-awesome/fonts/*-webfont.*",
      "dest-dir" : "./build/fonts/font-awesome"
    },
    "jQueryUI": {
      "src"      : "./node_modules/jquery-ui/themes/base/images/*",
      "dest-dir" : "./build/img/jquery-ui"
    }
  },
```

Dans cet exemple, la première partie nommée `fontAwesome` copiera les fichiers de polices de caractère de la dépendance NPM `font-awesome` dans le dossier `fonts/font-awesome` du build.

La seconde partie nommée `jQueryUI` copiera les images de la dépendance NPM `jquery-ui` dans le dosser `img/jquery-ui` du build.


Utilisation
-------------------------------------------------------------------------------

La commande `gulp import` déclenchera tous les imports.

Cependant, une tâche pour chaque entrée de la config sera aussi disponible.

Par exemple, pour la config de l’exemple ci-dessus, il existera les tâches `gulp import:fontAwesome` et `gulp import:jQueryUI`.
