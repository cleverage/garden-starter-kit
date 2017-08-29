Documentation du projet
===============================================================================

Tous les fichiers au format MarkDown (avec l'extention `.md`) present dans
ce repertoire `docs` seront convertis en HTML et rajoutés à la documentation
du projet à chaque build.

Il y a deux choses importantes à savoir:

* La documentation n'est pas générée lors des build optimisés
* Les liens fait vers des fichiers markdown (avec l'extention `.md`) sont
  automatiquement transformés en liens vers les fichiers HTML correspondant. De
  cette manière, les liens relatifs de la documentation peuvent être suivit
  aussi bien dans la version HTML générée que dans l'interface de gitlab.
