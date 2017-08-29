// Toutes les taches sont externalisées pour permettre une flexibilité et une
// configurabilité maximum.

// Les deux taches les plus utiles sont :
// ----------------------------------------------------------------------------
// $ gulp build   # (Compile le site statique pour livraison ou tests)
// $ gulp live    # (Tâche de travail avec watcher et serveur statique)

// Pour connaître l'ensemble des tâches disponibles :
// ----------------------------------------------------------------------------
// $ gulp help

// TASKS
// ----------------------------------------------------------------------------
// plug the help module before anything else
require('gulp-help')(require('gulp'));
// read the gulp tasks from the tasks folder
require('./tasks');