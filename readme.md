
Clever Garden Starter Kit
================================================================================

Ce dépôt GIT sert de kit de démarrage pour les projets d'intégration statique.

Ils contient toutes nos bonnes pratiques et tous les outils nécessaires pour
nos projets d'intégration statique chez Clever Age. Parmi tous les outils
présents dans ce kit vous trouverez ceux qui doivent être utilisés
obligatoirement aussi bien que ceux qui sont simplement recommandés.

Chaque outil utilisé dispose d'une documentation dédiée sur la façon de
l'utiliser dans notre contexte. Cette documentation est rédigée au format
Markdown et est disponible dans le répertoire `docs` de ce dépôt.


Créer un nouveau projet
--------------------------------------------------------------------------------
Pour créer un nouveau projet, suivez simplement les instructions ci-après.

## Vérifiez votre environnement
Tous nos projet pré-supposent que votre environnement dispose des outils suivant
installés au niveau global sur votre machine :

* [Git](http://git-scm.com/)
* [NodeJS](http://nodejs.org/)
* [Ruby](https://www.ruby-lang.org/fr/)
* [Rubygems](http://rubygems.org/)
* [Bundler](http://bundler.io/)

> Pour **Mac** : _vous devez obligatoirement installer XCode et les outils en
  ligne de commande qui l'accompagne (ce qui installera automatiquement Ruby et
  Rubygems). Il est également recommandé d'installer et d'utiliser
  [Homebrew](http://brew.sh/) pour installer tous les outils en ligne de
  commande dont vous pourriez avoir besoin._

> Pour **Windows** : _un des modules installé par Bundle nécessite une
  compilation en C. Pour cela, installez le Ruby Development Kit en suivant
  [ces instructions](https://github.com/oneclick/rubyinstaller/wiki/Development-Kit)._

> Pour **Linux** : _Chaque distribution a ses propre prérequis. Par exemple,
  Linux Mint 16 à besoin de `ruby1.9.1-beta`_

Afin de pouvoir utiliser Brunch (ou n'importe quel module NodeJS) facilement,
il est recommandé de rajouter `./node_modules/.bin` a votre `PATH`.

Pour Mac/Linux:

```bash
$ export PATH=./node_modules/.bin:$PATH
```

## Démarrez votre projet
Vous avez deux options pour démarrer votre projet:

1. Télécharger le contenu de ce dépôt et l'utiliser comme base de démarrage
2. Cloner ce dépôt avec GIT (voir ci-après)

> *NOTE :* _Il est prévu, à termes, de disposer d'un script de démarrage qui
  automatisera la mise en œuvre d'un projet_

Une fois que vous aurez récupéré le contenu de ce dépôt, vous avez la possibilité d'ajouter les outils recommandés ci-après (voir section : Outils recommandés).

### Cloner le kit de démarrage avec GIT
Si vous le souhaitez, vous pouvez directement cloner ce dépôt avec GIT.
Si vous choisissez cette option, cela vous permet de garder le lien avec ce
dépôt. Ça peut être utile si vous voulez pouvoir récupérer des mises à jour de
ce starter kit après coup. *ATTENTION:* _En l'état c'est assez risqué et il est
recommandé de supprimer la branche distante liée à ce dépôt une fois que vous
avez l'avez cloné._

Le plus simple:

```bash
$ cd ~/monProjet
$ git clone git@git.clever-age.net:clever-age-expertise/clever-garden-starter-kit.git .
$ git remote remove origin
```

Il ne vous reste plus qu'a ajouter une nouvelle `origin` vers le dépôt définitif des sources du projet final et à envoyer vos source vers le dépôt définitif.
Le paramètre `-u` permet d'associer la branche locale (ici le master) avec celle distante de façon pérenne.

```bash
$ git remote add origin git@git.clever-age.net:client-name/project-name.git
$ git push -u origin master
```

Lorsque le dépôt est rapatrié en local, exécutez les commandes
suivantes :

```bash
$ bundle install --path .gems
$ npm install
```

## Organisation des fichiers
Pour harmoniser notre travail, tous les projets utiliserons la structure de
fichiers suivante.

Les sources sur lesquelles nous travaillons sont toutes dans le répertoire `src`.
Normalement, seuls les fichiers présents dans ce répertoire devraient être
modifiés après le début du projet.

* `/src`
* `/src/css` : L'ensemble des fichiers qui produiront du CSS
* `/src/js`  : L'ensemble des sources JavaScript du projet (sauf les library tiers)
* `/src/assets` : L'ensemble des fichiers qui doivent être utilisé par le projet tel quel.
* `/src/assets/img`  : L'ensemble des images d'interface du projet
* `/src/assets/img/sprites` : L'ensemble des images d'interface qui seront regroupées en sprites
* `/src/assets/fonts`: L'ensemble des _fonts_ utilisées par le projet
* `/src/html`  : L'ensemble des gabarits qui produiront du HTML
* `/src/html/data` : Les fichiers JSON de données à injecter dans les gabarits HTML
* `/src/html/inc`  : Les gabarits partiels à injecter dans les pages HTML
* `/src/html/layout` : Les gabarits globaux de base pour les pages HTML
* `/src/html/pages`  : L'ensemble des gabarits d'assemblage des pages HTML
* `/src/docs` : L'ensemble de la documentation statique du projet au format Markdown

A chaque fois que le projet est "construit", le résultat est disponible dans
les répertoires suivant:

* `/build`
* `/build/docs` : Toute la documentation du projet au format HTML


Taches normalisées
--------------------------------------------------------------------------------

Tous projet démarré avec ce starter kit dispose d'un certain nombre de taches
Grunt normalisés utilisable quelques soient les modules grunt utilisés.

**live**: permet de démarrer un serveur static pour les pages HTML et d'avoir
un _watch_ sur les fichiers du projet en même temps.

> **ATTENTION:** _Même si tous les chemins sont résolus de manière relative, il
  est vivement conseillé de préférer cette méthode à tout autre serveur local
  que vous pourriez utiliser. De cette manière vous verrez toujours votre site
  "à la racine". Votre site répondra sur l'URL: http://localhost:8000_

```bash
$ grunt live

# l'option --sass=no permet de désactiver le watcher Sass
$ grunt live --sass=no
```

**build**: contruit la version statique du projet (compile les fichiers Sass,
assemble les fichiers HTML, etc.)

```bash
$ grunt build
```

**css**: Construit les feuilles de styles et gère les images associés

```bash
$ grunt css
```

**html**: Construit les pages HTML

```bash
$ grunt html
```

**js**: Construit les fichiers JS

```bash
$ grunt js
```

**test**: Lance tous les tests du projet

```bash
$ grunt test
```

Outils obligatoires
--------------------------------------------------------------------------------
Les outils listés ici doivent êtres utilisés obligatoirement lorsqu'on démarre
un nouveau projet d'intégration. _Le seul cas ou on ne les utilisera pas sera
lorsqu'on aura une demande explicite du client pour utiliser autre chose._

* [Grunt](docs/grunt.md)
* [Sass/compass](docs/sass.md)
* [Assemble](docs/assemble.md)
* [Linter](docs/linter.md)


Outils recommandés
--------------------------------------------------------------------------------
Les outils listés ci-après sont des recommandations. Il peuvent apporter des
fonctionnalités originales ou en cours d’expérimentation. Vous êtes libre de
les utiliser, ou non, selon vos envies ou votre contexte projet.

* [Bower](docs/bower.md)
* [KSS](docs/kss.md)


Erreurs
--------------------------------------------------------------------------------
Lors d'un watch il est possible d'avoir l'erreur `EMFILE: Too many opened files.`

C'est lié à une limite des fichiers ouverts. Sur OSX cette limite est par défaut
 à 256.

Pour voir la limite :

```bash
$ launchctl limit maxfiles
```

Pour augmenter la limite :

```bash
$ sudo launchctl limit maxfiles 10480 10480
```

Redémarrer le terminal et ça sera ok.

Pour plus de détail : [How do I fix the error EMFILE: Too many opened files ?](https://github.com/gruntjs/grunt-contrib-watch#how-do-i-fix-the-error-emfile-too-many-opened-files)