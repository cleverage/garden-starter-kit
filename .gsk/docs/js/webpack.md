
JS: Webpack
===============================================================================

Gérer les scripts de votre projet avec Webpack va vous permettre de travailler
de manière plus fine et plus avancée sur vos projets. Cette tache JS va vous
permettre les choses suivantes :

* Modulariser votre code
* Gérer vos dépendances tiers via NPM
* Utiliser la syntaxe ES2015 pour tous vos scripts

Configuration:
```json
{
  "js": {
    "engine": "webpack"
  }
}
```


Configuration standard
-------------------------------------------------------------------------------

### Fichiers d’entrée

Les fichiers d’entrée sont par défaut tous les fichiers `*.js` à la racine du dossier `src/js`.
Les fichiers de sortie correpondants porteront le même nom.

### Bibliothèques tiers

Si vous utilisez des bibliothèques tiers (comme jQuery), il vous suffit de les
installer via NPM (notez l'utilisation de `--save` pour que les dépendances
soient proprement versionnées avec l’ensemble du projet) :

```bash
$ npm i jquery,underscore,moment --save
```

Pour les utiliser, vous pouvez soit utiliser la fonction `require` des modules
CommonJS, soit la syntax `import` des modules ES2015.

### Babel et ES2015

Par defaut, webpack utilise [Babel](http://babeljs.io/) pour transpiler en
ES5 les scripts qui suivent la syntaxe standard ES2015. Si vous souhaitez que
Babel fasse plus de choses (par exemple traiter les fichier React JSX), il vous
suffit juste d'installer [les plugin correspondant](http://babeljs.io/docs/plugins/).

```bash
$ npm i babel-react --save-dev
```

### Utilisation avancée

Pour plus de configuration vous pouvez modifier le fichier `webpack-config.js`.
Vous trouverez plus de documentation sur [la doc officielle](http://webpack.github.io/docs/).
