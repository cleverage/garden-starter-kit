
Twig
===============================================================================

Dans la mesure ou de nombreux projets chez Clever Age utilisent Symfony,
[Twig](http://twig.sensiolabs.org/) est aussi le système de templating par
défaut que l'on utilise pour créer nos pages HTML statiques (via `twig.js`).

Configuration:
```json
{
  "html": {
    "engine": "twig",
  }
}
```


Configuration standard
-------------------------------------------------------------------------------

Twig ne requiers aucune configuration particulière. Cependant, il faut noter
que, par défaut, toutes les variables qui seront utilisées pour peupler les
fichiers lors de la compilation sont dans le dossier `src/data`

Ces données sont sous la forme de fichiers JSON avec un fichier générique
(`src/data/data.json`), plus un fichier spécifique qui doit porter le même nom
que le gabarit Twig correspondant (`src/data/mon/fichier/twig.json`). Les deux
sont amalgamés pour être utilisé par le gabarit Twig. Si les deux fichiers
proposent les mêmes variables, celles du fichier spécifique écrasent celles du
fichier générique.

Étendre Twig
-------------------------------------------------------------------------------
Tout comme la version de PHP permet d'étendre Twig, la version JS offre aussi
cette possibilité. Le starter kit normalise la façon de le faire.

De manière générale, pour rajouter un tag, une fonction ou un filtre, il faut
écrire un module CommonJS et le mettre dans un des répertoires suivants selon
ce que vous voulez rajouter:

* `tools/twig/tags/` pour rajouter un tag
* `tools/twig/functions/` pour rajouter une fonction
* `tools/twig/filters/` pour rajouter un filtre

Pour les fonctions et les filtres, votre module doit exporter un objet:

```javascript
module.exports = {
  name: 'leNomDeMaFonctionOuFiltre',
  func: function (args) {
    return 'leResultatDeMaFonctionOuFiltre';
  }
};
```

Pour les tags, votre module doit exporter une fonction qui prend un objet Twig
en entrée. Cet objet expose toute l’API interne de Twig.js pour pouvoir rajouter
un tag. On ne va pas se le cacher, [c’est assez chaud à faire](https://github.com/justjohn/twig.js/wiki/Extending-twig.js-With-Custom-Tags).

A noter que la fonction exportée par le module est celle qui sera utilisée par
`Twig.extend`.

```javascript
module.exports = function (Twig) {
  // Bon courage :-/
};
```

Pour voir quelques exemples concrets vous pouvez jetez un coup d’œil dans le
repertoire [tools/twig](tools/twig).

