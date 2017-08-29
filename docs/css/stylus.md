
Stylus
===============================================================================

Certain projet peuvent utiliser [Stylus](http://learnboost.github.io/stylus/)

Configuration:
```json
{
  "css": {
    "engine": "stylus",
  }
}
```


Configuration standard
-------------------------------------------------------------------------------

Stylus ne requiers aucune configuration particulière. Cependant, contrairement
à compass, il n’offre pas de mécanisme de gestion automatique des sprites.

Stylus est utilisé avec le linter Stylint. [La configuration](../../starter/.stylintrc)
proposé par le starter kit pour Stylint force une syntaxe très proche de la
syntaxe scss de Sass.

> __NOTE:__ _[Nib](http://tj.github.io/nib/) n’est pas installé avec le starter
  kit. Si vous voulez l’utiliser il vous faudra l’installer manuellement._
