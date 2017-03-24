
Sass & Compass
===============================================================================

Nous utilisions [Sass](http://sass-lang.com) et
[Compass](http://compass-style.org) dans de nombreux projets historique.

Configuration:
```json
{
  "css": {
    "engine": "compass",
  }
}
```

Vérifier votre environnement
-------------------------------------------------------------------------------

Sass et compass reposent sur [Ruby](https://www.ruby-lang.org/fr/), assurez-vous que vous l'avez bien installé sur votre environnement.

Il est également nécessaire d'installer l'utilitaire
[Bundler](http://bundler.io/) dans votre environnement global (cela permet
d'avoir plusieurs versions de Sass en fonction de chaque projets).

Puis exécutez simplement la commande suivante :

```bash
$ sudo gem install bundler
```

Copiers à la racine du projet les fichiers `config.rb` et `Gemfile` que vous trouverez dans le dossier `.gsk/conf`.

Puis, pour être sûr que vous disposer de la dernière version de Sass et Compass
pour le projet sur lequel vous travaillez, exécutez la commande suivante :

```bash
$ bundle install --path .gems
```

En cas de problème de compilation Sass sur un projet existant commencez
toujours par exécuter la commande suivante :

```bash
$ bundle update
```


Configuration standard
-------------------------------------------------------------------------------

Vous pouvez utiliser Sass/Compass de manière traditionnelle, toute la
configuration de l'environnement est centralisé dans le ficher `config.rb`.
Un fichier de configuration près à l'emploie est disponible dans `.gsk/conf`

Pour compiler les styles du projet vers l'environnement de développement,
exécuter simplement la commande suivante :

```bash
$ gulp css
```

Ou bien pour une compilation standalone:

```bash
$ bundle exec compass compile
```

Pour compiler les styles du projet vers l'environnement de production il suffit
de rajouter le paramètre adéquat :

```bash
$ gulp css --optimize
```

Ou bien en standalone

```bash
$ bundle exec compass compile -e production
```


Configuration avancée
-------------------------------------------------------------------------------

### Installer un module via NPM (à préférer autant que possible)

Exemple avec sass-mq:

Installer le module NPM `npm install sass-mq --save`

Puis importez le modules dans vos scss `@import 'sass-mq/mq';`.

### Installer un module via bundler

Exemple avec Sass-globing :

Ajouter cette ligne au fichier Gemfile `gem 'sass-globbing'`

Lancer un `bundle install` en ligne de comande pour que ce nouveau module soit bien installé.

Puis ajouter la ligne suivante `require 'sass-globbing'` dans le fichier `config.rb`.

Si votre gem expose des mixins vous devez l’importer dans votre css comme dans cet exemple avec bourbon `@import 'bourbon';`.

