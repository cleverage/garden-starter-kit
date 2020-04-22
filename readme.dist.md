PROJECT_NAME
===============================================================================

Ce dépôt contient les maquettes sous forme d’intégration statique ainsi que la documentation et les outils nécessaires à la conception frontend du projet.

Ce dépôt est basé sur le [Garden Starter Kit](https://github.com/cleverage/garden-starter-kit).

Chaque outil du GSK dispose d’une documentation dédiée sur la façon de
l’utiliser dans notre contexte. Cette documentation est rédigée au [format
Markdown](https://daringfireball.net/projects/markdown/syntax) et est disponible dans le répertoire `.gsk/docs` de ce dépôt.


Prérequis
-------------------------------------------------------------------------------

## Avec Docker (recommandé)
Ce projet nécécite que ces outils soient installé sur votre machine.

* [Git](http://git-scm.com/)
* [Docker](https://www.docker.com/products/docker) : Merci de suivre les instructions d’instalation sur le site officiel.

[Pour plus d’info sur l’usage de docker](.gsk/docs/docker.md).

## Sans Docker (non-recommandé)
Sans Docker ce projet nécessite que votre environnement dispose de tous les outils suivants installés au niveau global sur votre machine :

* [Git](http://git-scm.com/)
* [NodeJS](http://nodejs.org/)
* [Ruby](https://www.ruby-lang.org/fr/)
* [Rubygems](http://rubygems.org/)
* [Bundler](http://bundler.io/)

> Pour **Mac** : _vous devez obligatoirement installer XCode et ses outils en ligne de commande (XCode les installe automatiquement depuis la version 6.1. Vous pouvez vérifier qu'ils sont bien installés en suivant ces instructions: http://docwiki.embarcadero.com/RADStudio/Berlin/fr/Installation_des_outils_de_ligne_de_commande_Xcode_sur_un_Mac. Ruby et Rubygems seront installés automatiquement en même temps). 
Il est également recommandé d'installer et d'utiliser
  [Homebrew](http://brew.sh/) pour installer tous les outils en ligne de
  commande dont vous pourriez avoir besoin._

> Pour **Windows** : _un des modules installés par Bundle nécessite une
  compilation en C. Pour cela, installez le Ruby Development Kit en suivant
  [ces instructions](https://github.com/oneclick/rubyinstaller/wiki/Development-Kit)._

> Pour **Linux** : _Chaque distribution a ses propre prérequis. Par exemple,
  Linux Mint 16 a besoin de `ruby1.9.1-beta`_

Afin de pouvoir utiliser facilement les commandes fournies par npm (notamment _gulp_), installées
dans votre répertoire projet (dans le dossier `node_modules`), plusieurs méthodes existent.

### Solution 1 : ajout au PATH

La plus simple est d'ajouter le répertoire `./node_modules/.bin` a votre `PATH`, mais suivant votre environnement, vous aurez peut-être besoin de le faire pour chaque projet.

Pour Mac/Linux, rajouter la ligne suivante dans votre fichier `~/.profile`
(Mac), `~/.bash_rc` (Linux) ou tout autre fichier de configuration
correspondant à votre shell, pour que le changement soit effectif à chaque
lancement de votre terminal.

```sh
export PATH="./node_modules/.bin:$PATH"
```

Vous pourrez alors lancer directement depuis votre terminal les commandes :

```
$ gulp live
```

### Solution 2 : méthode dédiée

Une autre solution valable d’un projet à l’autre est de définir une fonction dédiée dans votre _profile_ de terminal qui ira à chaque fois lancer les commandes inhérentes au projet en cours.

Pour Mac/Linux, rajouter la fonction suivante dans votre fichier `~/.profile`
(Mac), `~/.bash_rc` (Linux) ou tout autre fichier de configuration
correspondant à votre shell, pour que le changement soit effectif à chaque
lancement de votre terminal.

```
function npm-do {
	(PATH=$(npm bin):$PATH; eval $@;)
}
```

Vous pourrez alors lancer les commandes voulues par le biais de cette méthode :

```
$ npm-do gulp live
```


Innitialisez votre environement
-------------------------------------------------------------------------------

### Clôner ce dépôt avec Git

Clôner ce dépôt avec Git :

```bash
$ cd ~
$ git clone GIT_REPO_URL
```

### Initialisation de Docker

Si vous utilisez Docker lancer il faut créer l’image docker locale :

```bash
$ docker build -t cleverage/garden-starter-kit .
```

> **NOTE :** _À terme,
  il est prévu que l’image soit disponible sur le Docker hub._

Vous pouvez ensuite travailler dans cette image :

```bash
$ docker run -it --name myProject -v "$PWD":/usr/src/app -p 8000:8000 -p 3001:3001 cleverage/garden-starter-kit bash
```

### Installation des dépendances du projet
Lors du démarrage de votre projet et à chaque fois que le dépôt est rapatrié en
local, exécutez les commandes suivantes :

```bash
$ npm install
```

> **NOTE :** _Commande à lancer dans l’image Docker si vous utilisez Docker._


Organisation des fichiers
-------------------------------------------------------------------------------

Le projet utilise la structure de fichiers suivante.

Les sources sur lesquelles nous travaillons sont toutes dans le répertoire
`src`. _Normalement, seuls les fichiers présents dans ce répertoire devraient
être modifiés après l’initialisation du projet._

* `/src`
* `/src/css` : l’ensemble des fichiers qui produiront du CSS.
* `/src/js` : l’ensemble des sources JavaScript du projet
* `/src/assets` : l’ensemble des fichiers qui doivent être utilisés par le projet en l’état.
* `/src/assets/img` : l’ensemble des images d’interface du projet
* `/src/assets/sprites` : l’ensemble des images d’interface qui seront regroupées en sprites
* `/src/assets/fonts` : l’ensemble des fontes utilisées par le projet
* `/src/html` : l’ensemble des gabarits qui produiront du HTML
* `/src/data` : les fichiers JSON de données à injecter dans les gabarits HTML ou autres
* `/src/docs` : l’ensemble de la documentation statique du projet au format Markdown

À chaque fois que le projet est « construit », le résultat est disponible dans
les répertoires suivant :

* `/build`
* `/build/doc` : toute la documentation du projet au format HTML


Tâches
-------------------------------------------------------------------------------

Le projet hérite des tâches Gulp normalisées du _Garder Starter Kit_ dispose d'un certain nombre de tâches.

**live** : Permet de démarrer un serveur statique pour les pages HTML et d’avoir un _watch_ sur les fichiers du projet en même temps.

> **ATTENTION :** _Même si tous les chemins sont résolus de manière relative, il
  est vivement conseillé de préférer cette méthode à tout autre serveur local
  que vous pourriez utiliser. De cette manière, vous verrez toujours votre site
  « à la racine ». Votre site répondra sur l’URL : [http://localhost:8000](http://localhost:8000)_

```bash
$ gulp live

# Pour ne pas être embêté par les tests,
# vous pouvez lancer le live en mode relax
# (Mais c’est mal et vous le savez)
$ gulp live --relax

# Pour des raisons de performance,
# le watcher ne génère pas par défaut la documentation
# Mais vous pouvez activer cette fonctionalité :
$ gulp live --doc
```

**build** : Contruit la version statique du projet (compile les fichiers Sass, assemble les fichiers HTML, etc.)

```bash
$ gulp build

# Pour créer un build optimisé pour la prod
# (Fichiers minifiés, pas de doc, etc.)
$ gulp build --optimize
```

**css** : construit les feuilles de styles

```bash
$ gulp css
```

**html** : construit les pages HTML statiques

```bash
$ gulp html
```

**js** : construit les fichiers JS

```bash
$ gulp js
```

**assets** : déplace et optimise les ressources statiques du projet

```bash
$ gulp assets
```

**doc** : génère la documentation du projet

```bash
$ gulp doc
```

**test** : exécute tous les tests du projet

```bash
$ gulp test
```

**sftp-deploy** : déploie le dossier build sur le serveur de preview. Sur le serveur distant, le nom du dossier créé contiendra le numéro de version renseigné dans le fichier `package.json`.

```bash
$ gulp sftp-deploy
```


Outils utilisés
-------------------------------------------------------------------------------
Les outils listés ici doivent êtres utilisés obligatoirement lorsqu’on démarre un nouveau projet d’intégration. Ils garantissent un _workflow_ de travail optimal.

* [Gulp](http://gulpjs.com/)
* [Linter](.gsk/docs/linter.md)

Les outils listés ci-après sont à utiliser et à configurer pour votre projet.
Ils sont tous utilisables tels quels, mais le _starter kit_ est suffisamment flexible pour s’adapter à vos besoins. Le choix d'utilisation de ces outils se fait via le fichier `.gsk/config.json`, voir les instructions de configuration ci-après :

### CSS
* [Sass](.gsk/docs/css/sass.md) [Recommandé]
* ~~[Sass/Compass](.gsk/docs/css/compass.md)~~
* ~~[Stylus](.gsk/docs/css/stylus.md)~~
* ~~[LESS](.gsk/docs/css/less.md)~~

### HTML
* [Twig](.gsk/docs/html/twig.md) [Recommandé]
* ~~[Handlebars](.gsk/docs/html/handlebars.md)~~

### JavaScript
* [Webpack + NPM](.gsk/docs/js/webpack.md)

### Documentation
* [Documentation statique](docs/index.md)
* [KSS](.gsk/docs/kss.md)

### Autres outils
* [Nproxy](.gsk/docs/nproxy.md) pour servir vos fichiers locaux à la place de fichiers distants (debug)
* [Browsersync](.gsk/docs/browsersync.md) pour rendre le browser-testing plus facile
* [Import](.gsk/docs/import.md) pour copier simplement des fichiers dans le build (exemple : assets de dépendances)
