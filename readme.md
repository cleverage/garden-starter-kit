Clever _Garden Starter Kit_
===============================================================================

Ce dépôt sert de kit de démarrage pour les projets d'intégration statique.

Il contient toutes nos bonnes pratiques et tous les outils nécessaires pour
nos projets d’intégration statique chez Clever Age. Parmi tous les outils
présents dans ce kit, vous trouverez ceux qui doivent être utilisés
obligatoirement aussi bien que ceux qui sont simplement recommandés.

Chaque outil utilisé dispose d’une documentation dédiée sur la façon de
l'utiliser dans notre contexte. Cette documentation est rédigée au [format
Markdown](https://daringfireball.net/projects/markdown/syntax) et est disponible dans le répertoire `.gsk/docs` de ce dépôt.


Créer un nouveau projet
-------------------------------------------------------------------------------
Pour créer un nouveau projet, suivez simplement les instructions ci-après.

> **NOTE :** _Il s’agit ici des instructions manuelles à suivre. Cependant, à terme,
  il est prévu qu'un script d'installation soit disponible pour simplifier le démarage._

## Initialisez votre projet
Vous avez deux options pour démarrer votre projet :

1. [Télécharger](https://github.com/cleverage/garden-starter-kit/archive/master.zip) le contenu de ce dépôt et l'utiliser comme base de démarrage
2. Clôner ce dépôt avec Git (voir ci-après)

### Clôner le kit de démarrage avec Git
Si vous le souhaitez, vous pouvez directement clôner ce dépôt avec Git.

Le plus simple :

```bash
$ cd ~/monProjet
$ git clone git@github.com:cleverage/garden-starter-kit.git .
$ rm -rf .git
```

Il ne vous reste plus qu’à initialiser le dépôt git de votre projet et commiter
le _starter kit_ que vous avez récupéré pour commencer votre projet :

```bash
$ git init
$ git add --all
$ git commit -m "First commit"
$ git remote add origin <URL-de-votre-depot-git>
$ git push -u origin master
```

> **NOTE :** _Si la branche master existe déjà et/ou est protégée, il faut faire le `git push` sur une autre branche (`git push -u origin gsk`) puis faire une « pull request »_

### Configurer le GSK

À l’initialisation du projet vous devez choisir quels outils vont être utilisés pour builder le html et le css selon les besoins du projet.

Les outils listés ci-après sont à configurer via le fichier `.gsk/config.json`. Si vous n’utilisez que les choix recommandés, ils sont déjà configurés par défaut.

Voir les instructions de configuration ci-après :

#### CSS
* [Sass](.gsk/docs/css/sass.md) [Recommandé]
* [Sass/Compass](.gsk/docs/css/compass.md)
* [Stylus](.gsk/docs/css/stylus.md)
* [LESS](.gsk/docs/css/less.md)
* Si vous ne choisissez pas de préprocesseur, le projet n’utilisera que PostCss

#### HTML
* [Twig](.gsk/docs/html/twig.md) [Recommandé]
* [Handlebars](.gsk/docs/html/handlebars.md)

#### JavaScript
* [Webpack + NPM](.gsk/docs/js/webpack.md) [Recommandé]

### Finalisation

Une fois les étapes précédantes executées, vous n’êtes déjà plus sur le GSK mais dans votre nouveau projet.

1. Remplacez votre `readme.md` par le `readme.dist.md`.
2. Dans celui-ci, remplacez `PROJECT_NAME` par le nom de votre projet et `GIT_REPO_URL` par l’url de son dépôt git.
3. Changez dans le `package.json` toutes les entrées suivantes :

  ```json
  "name": "garden-starterkit",
  "homepage": "https://github.com/cleverage/garden-starter-kit",
  "title": "Garden Starter Kit",
  "description": "Set de base pour les projets Garden statiques.",
  "version": "2.0.0",
  "license" : "MIT",
  "repository": {
    "type": "git",
    "url": "https://github.com/cleverage/garden-starter-kit.git"
  },
  ```

4. Changez ou supprimez le fichier `LICENSE`.

_Bravo !! Votre projet est en route._

### Pour aller plus loin

Vous pouvez supprimer les dépendances inutiles à votre projet comme Less si vous utilisez Sass.

