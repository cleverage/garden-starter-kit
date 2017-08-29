
Handlebars
===============================================================================

Certains projets peuvent vouloir utiliser [Handlebars](handlebarsjs.com) pour
générer les pages statiques du projet.

Configuration:
```json
{
  "html": {
    "engine": "handlebars"
  }
}
```


Configuration standard
-------------------------------------------------------------------------------

### Data
On notera que, par défaut, toutes les variables qui seront utiliser pour
peupler les fichiers lors de la compilation sont dans le dossier `src/data`

Ces données sont sous la forme de fichiers JSON avec un fichier générique
(`src/data/data.json`), plus un fichier spécifique qui doit porter le même nom
que le gabarit Handlebars correspondant (`src/data/mon/fichier/hbs.json`). Les
deux sont amalgamés pour être utilisé par le gabarit Handlebars. Si les deux
fichiers proposent les mêmes variables, celles du fichier spécifique écrase
celles du fichier générique.

### Layout
Le layout par defaut des pages est `src/html/layout/_default.hbs`. Pour le
changer, il suffit de changer la configuration du projet:
```json
{
  "html": {
    "layout": "_default.hbs"
  }
}
```

Un layout specific peut être appliqué à chaque page, il suffit de rajouter une
clé `template` avec le nom du layout à utiliser dans le fichier de data de la
page correspondante.

> **NOTE:** _Tous les layouts doivent être placés dans le dossier
  `src/html/layout`_

> **NOTE:** _Dans le layout, le contenu de la page est inclus via le partial
  `{{> body}}`_

Helpers
-------------------------------------------------------------------------------
Handlebars peut être etendu par l'usage de helpers.

De manière général, pour rajouter un helpers, il suffit d'écrire un module
CommonJS qui exposera une fonction definisant le helpers. Ce module doit être
placé dans le dossier `tools/handlebars/helpers`. Le nom du helper sera
le nom du fichier (sans extention).

Un helper definie de cette façon a cette forme:

```javascript
module.exports = function (/* context, */ options) {
  return options.fn(this);
};
```
Pour en savoir plus sur la création de helpers, la
[documentation officiel de handlebars](http://handlebarsjs.com/block_helpers.html)
est là pour vous aider

Pour voir quelques exemples concrets vous pouvez jetez un coup d’œil dans le
repertoire [tools/handlebars/helpers](tools/handlebars/helpers).

