
KSS
===============================================================================

[KSS](http://warpspire.com/kss/) est une convention de documentation pour les feuilles de styles. Elle permet de structurer les commentaires afin de générer
un guide complet des styles du projet.

Il existe plusieurs outils capable de lire les commentaires pour générer un guide des styles. Nous utilisons ici [kss-node](http://kss-node.github.io/kss-node/).


Configuration
-------------------------------------------------------------------------------

Toute la configuration pour la génération du guide des styles est centralisée dans le fichier `kss.json`.

```javascript
{
  // Le dossier comportant les sources à analyser
  // (le chemin est relatif à l’emplacement du fichier kss.json)
  "source": "./src/sass",

  // La page d’accueil statique du guide des style au format Markdown
  // (le chemin est relatif à l'emplacement des sources à analyser)
  "homepage": "styleguide.md",

  // L'emplacement ou le guide des style sera généré
  // (le chemin est relatif à l'emplacement du fichier kss.json)
  "destination": "./build/docs/styleguide",

  // L'emplacement du gabarit KSS personalisé à utiliser
  // (le chemin est relatif à l'emplacement du fichier kss.json)
  "template": "./node_modules/garder-starterkit/kss",

  // Les divers fichiers CSS à inclure dans le template
  // (leur chemin est l’URL relative des fichiers et dépend donc de la
  //  configuration du serveur HTTP utilisé pour afficher la documentation)
  "css": [
    "../../css/doc.css",
    "../../css/styles.css"
  ]
}
```
