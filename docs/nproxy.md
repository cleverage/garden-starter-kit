
NProxy : Proxyfier les fichiers JS et CSS
===============================================================================

Module utilisé : [NProxy](https://github.com/stephane-tessier/nproxy)


Cette manipulation peut s'avérer très utile pour corriger un bug qui n'est pas reproductible sur la maquette, à cause de données différentes, de scripts tiers, ou tout simplement pour ne pas avoir à faire tourner une lourde VM dont on n’a pas forcément besoin en tant que développeur front.

Proxyfier ?!
-------------------------------------------------------------------------------

Proxyfier signifie utiliser un élément tiers qui vient se placer entre le serveur et le navigateur. Dans notre cas, le proxy va permettre de naviguer sur un site distant (recette, pre-prod, prod, etc.), mais en chargeant les fichiers JS et/ou CSS locaux (à la place des fichiers distants).


      SERVEUR <---------------\
                               PROXY <-------> NAVIGATEUR
      JS ET CSS LOCAUX <------/


Installation
-------------------------------------------------------------------------------

Le proxy est installé en même temps que les autres paquets NodeJS (via la commande ```npm install```).

Démarrer le proxy
-------------------------------------------------------------------------------

Pour démarrer le proxy, se placer dans le dossier racine du projet (contenant le fichier _gulpfile.js_), et entrez la commande suivante :

```shell
> gulp nproxy
```

Le proxy ```localhost:8989``` est alors accessible.

Proxyfier le Javascript uniquement (**pas encore implémenté**) :

```shell
> gulp nproxy --js
```

Proxyfier le CSS uniquement (**pas encore implémenté**) :

```shell
> gulp nproxy --css
```

Désactiver les scripts externes (e.g. Google Tag Management, Facebook) (**pas encore implémenté**) :

(repectivement ''--no-gmt'', ''--no-facebook'')

```shell
> gulp --no-externals
```

Pour désactiver ces modules, on dessert un fichier javascript vide au lieu du fichier original.



Utiliser le proxy
--------------------------------------------------------------------------------

Vous pouvez configurer le proxy au niveau du système ou du navigateur avec le paramètre suivant : ```localhost:8989```.

Mais vous l'aurez compris, tout votre trafique va alors passer par votre proxy, ce qui n'est pas vraiment souhaitable (sauf dans le cas d'une VM dédiée, avec par exemple IE).

### Exemple de plugin

De nombreux plugins (extensions de navigateurs) permettent de facilement activer/désactiver le proxy au niveau du navigateur, ainsi que de paramétrer quelles URLs sont proxifiées, lesquelles ne le sont pas.

Voici deux exemples :

 * [SwitchyOmega](https://chrome.google.com/webstore/detail/padekgcemlokbadohgkifijomclgjgif) sur Chrome
 * [FoxyProxy](https://addons.mozilla.org/fr/firefox/addon/foxyproxy-standard/) sur Firefox


Configuration
--------------------------------------------------------------------------------

La configuration du proxy s'effectue dans le fichier _nproxy-conf.js_rg/fr/firefox/addon/foxyproxy-standard/) sur Firefox


Configuration
--------------------------------------------------------------------------------

La configuration du proxy s'effectue dans le fichier _nproxy-conf.js_

__Associé à chaque configuration du proxy, un exemple de configuration SwitchyOmega est proposé.__

Configuration du plugin navigateur
--------------------------------------------------------------------------------

__Etapes à suivre (exemple pour switchyomega)__

* Ouvrir les options
* Aller dans l'onglet proxy et configurer le serveur (localhost) et le port (8989)
* Supprimer dans le textarea bypass list, en dessous le texte "<local>"
* Cliquez ensuite sous l'onglet autoswitch sur le bouton "New profile"
* Nommer le profile RSC par exemple
* Cochez le bouton radio "switch profile" puis cliquez sur create
* Cliquez sur le bouton "edit source code"
* Remplacer le contenu du textarea par les lignes en dessous.
* Demarrer nproxy : ```gulp nproxy```
* Demarrer un ```gulp connect:dev``` ou ```gulp live```
* Aller sur localhost:8000/
* Cliquez sur le plugin switchyomega en haut à gauche du navigateur.
* Et cliquez le profil que vous venez de creer : RSC, et voilà !


__Lignes à copiées dans le textarea (edit source code)__
```
[SwitchyOmega Conditions]
@with result

[JS - DEV]
UrlWildcard: *localhost:8000/*.js* +proxy

* +direct
```
