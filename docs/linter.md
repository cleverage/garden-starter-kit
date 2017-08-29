
Linter
===============================================================================

Les Linters sont des outils qui vérifient la qualité du code. Le starter kit,
est configuré de tel manière que des linters sont systématiquement utilisés
pour JavaScript et pour les préprocesseur CSS.


Configuration des linters
-------------------------------------------------------------------------------
Une configuration par défaut de ces linters est disponible dans le répertoire
`strater/`. Il suffit de copier ces fichiers de configuration à la racine du
projet pour qu'ils soient utilisés par Gulp automatiquement.

Vous pouvez bien sur mettre en place vos propres contraintes que ce soit en
durcissant les vérifications ou en les assouplissant. Cependant, éviter de
changer la configuration une fois le projet démarré.


Utilisation des linters
-------------------------------------------------------------------------------
Les linters sont exécutés à chaque fois qu'une tache Gulp va vouloir consommer
les fichiers qui lui corresponde. Les erreurs de linting sont listées dans
votre terminal et sont bloquantes (tant qu'il y a une erreur, le fichier ne
compile pas)

Pour anticiper les erreurs de linting, nous vous encourageons à configurer vos
éditeurs de texte pour qu'ils consomment les configurations de linting du
projet et vous avertissent dès qu'il y a un problème.

* Sublime Text:
  * https://packagecontrol.io/packages/SublimeLinter
* WebStorm:
  * https://www.jetbrains.com/webstorm/help/code-quality-tools.html
* Atom:
  * https://github.com/AtomLinter


Linters disponibles
-------------------------------------------------------------------------------
Le starter kit est actuellement configuré pour utiliser les linters suivant:

* JavaScript
  * ESLint
    * Site: http://eslint.org
    * Règles: http://eslint.org/docs/rules/
* Sass
  * scss-lint
    * Site: https://github.com/brigade/scss-lint
    * Règles: https://github.com/brigade/scss-lint/blob/master/lib/scss_lint/linter/README.md
* Stylus
  * Stylint
    * Site & Règles: https://rosspatton.github.io/stylint/
* LESS
  * lesshint
    * Site: https://github.com/lesshint/lesshint
    * Règles: https://github.com/lesshint/lesshint/blob/master/lib/linters/README.md
