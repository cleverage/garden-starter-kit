
Docker : Image docker du Garden Starter Kit
===============================================================================

Installation de Docker :
-------------------------------------------------------------------------------

Merci de suivre les instructions sur [le site officiel](https://www.docker.com/products/docker).

Création de l’image en locale
-------------------------------------------------------------------------------

> **NOTE :**  _l’image étant disponible sur le Docker hub, cette étape n’est pas necéssaire à part si vous voulez votre propre image liée à votre projet._

```bash
docker build -t cleverage/garden-starter-kit .
```

Simplement avoir un aperçu de G.S.K. :
-------------------------------------------------------------------------------

Vous pouvez avoir un aperçu de G.S.K. avec la commande suivante :

```bash
$ docker-compose up
```

Il vous suffit ensuite de vous rendre sur http://localhost:8000

Puis pour tout arreter :
```bash
$ docker-compose down
```

Utilisation sur votre projet :
-------------------------------------------------------------------------------

Créer et démarrer le conteneur :

```bash
$ docker-compose up
```

Ou avec l’option `-d` pour qu’il tourne en tâche de fond :

```bash
$ docker-compose up -d
```

À sa création le conteneur Docker lance un `npm install` puis un `gulp build` et un `gulp connect`

Vous pouvez ensuite lancer d’autres commandes comme ceci :

```bash
$ docker-compose exec gsk [ma commande]
```

Exemples :

```bash
$ docker-compose exec gsk gulp watch
$ docker-compose exec gsk gulp html
```

Où travailler directement dans le conteneur :

```bash
$ docker-compose exec gsk bash
```

Pour supprimer le conteneur :

```bash
docker-compose down
```
