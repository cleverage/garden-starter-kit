# Utilisation de docker

## Prérequis

* make : pour pouvoir utiliser le fichier Makefile.
* Sur Linux
  * [Docker-engine](https://docs.docker.com/engine/installation/ubuntulinux/)
* Mac OSX
  * [Docker toolbox](https://www.docker.com/docker-toolbox)

## Construire les images docker

### Toutes les images en 1 fois

```bash
$ make all
```
ou

```bash
$ make build-js-tools
```

### L'image *nodejs* + *npm*

```bash
$ make build-nodejs
```

### L'image *bundle*

```bash
$ make build-bundle
```

### L'image *grunt*

```bash
$ make build-grunt
```

### L'image *bower*

```bash
$ make build-js-tools
```

## Utilisation

### Généralité sur l'utilisation d'un Makefile

Le Makefile est appelé par la commande `make [TACHE] -- [OPTIONS]`

* Si 1 seule option est à passer, il est possible de ne pas utiliser les tirets (`--`).

  Exemple :

```bash
$ make npm install
```

* Si plusieurs options sont passés, les tirets (`--`) sont obligatoires.

  Exemple :

```bash
$ make bundle -- install --path .gems
```

### Installation des dépendances *bundle*

**/!\ non testé pour le moment /!\**

```bash
$ make bundle -- install --path .gems
```

### Installation des dépendances *npm*

```bash
$ make npm install
```

### Installation des dépendances *bower*

**/!\ non testé pour le moment /!\**

```bash
$ make bower XXX
```

### Installation des dépendances *grunt*

**/!\ non testé pour le moment /!\**

```bash
$ make grunt XXX
```

## Docker utils

Le script `docker-utils.sh` permet d'ajouter quelques fonctions de nettoyage sur les conteneurs et images créés par docker.

Lancer la commande suivante pour voir les paramètres : `bash ./docker/docker-utils.sh`

```
# Usage: docker-utils.sh [TYPE] [PARAM]
#    TYPES
#      - co : Actions on containers
#      - im : Actions on images
#
#    PARAMS
#      - trash: Special case that doesn't need a TYPE.
#               Remove all images and all containers.
#      - clean: Special case that doesn't need a TYPE.
#               Remove all non commited images and stopped containers.
#      - stopall: Stop all containers.
#      - rms : Remove all already stopped containers.
#      - rmall: Stop and Remove all containers.
#
# Note: functions are used so we need to run a terminal which support them.
```
