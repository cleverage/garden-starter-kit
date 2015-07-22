module.exports = (grunt) ->
  try
    require('time-grunt')(grunt)
  catch error
    grunt.log.debug "time-grunt not installed"

  # TACHES PERSONNALISÉES COMMUNES A TOUS LES PROJETS
  # ============================================================================
  # $ grunt live
  # Lance tous les watcher grunt ainsi qu'un serveur statique pour voir le
  # contenu du repertoir `/build/dev`. Ce serveur utilise livereload pour
  # rafraichir automatiquement le navigateur dès qu'un  fichier est mis à jour.
  grunt.registerTask 'live',  ['build', 'connect:live', 'watch']

  # $ grunt build
  # Régénère le contenu du dossier `/build`. Il est recommandé de lancer cette
  # tache à chaque fois que l'on réalise un `git pull` du projet.
  grunt.registerTask 'build', ['ifbower', 'clean', 'css', 'html', 'js', 'test']

  # $ grunt bower
  # Execute bower depuis grunt et copies les assets utils là ou ils sont
  # necessaire: `js` => `src/js/lib`; `scss` => restent la ou ils sont
  grunt.registerTask 'bower', ['exec:bower','copy:bower']

  # $ grunt css
  # Régènère uniquement les feuilles de styles (et les sprites/images associés)
  grunt.registerTask 'css', ['compass', 'postcss', 'imagemin', 'copy:fonts']

  # $ grunt html
  # Régènère uniquement les pages HTML
  grunt.registerTask 'html', ['assemble', 'prettify', 'kss']

  # $ grunt js
  # Régènère uniquement les fichiers JS
  grunt.registerTask 'js', ['copy:js', 'useminPrepare', 'concat:generated', 'uglify:generated', 'usemin']

  # $ grunt test
  # Lance les tests du projets
  grunt.registerTask 'test', ['scsslint', 'jshint']


  # CHARGE LES TACHES A LA DEMANDE POUR ACCELERER
  # L'EXECUTION DES TACHES APPELLÉES INDIVIDUELLEMENT
  # ============================================================================
  [
    'assemble'
    'grunt-contrib-clean'
    'grunt-contrib-compass'
    'grunt-contrib-concat'
    'grunt-contrib-copy'
    'grunt-contrib-imagemin'
    'grunt-contrib-jshint'
    'grunt-contrib-uglify'
    'grunt-exec'
    'grunt-kss'
    'grunt-newer'
    'grunt-postcss'
    'grunt-prettify'
  ].forEach (npmTask) ->
    task = npmTask.replace /^grunt-(contrib-)?/, ''
    # cas particulier
    task = task.replace 'scss-lint', 'scsslint'
    grunt.registerTask task, [], () ->
      # on renomme la tâche pour éviter les boucles infinies si le module n'est pas chargé
      grunt.task.renameTask task, "#{task}-old"
      grunt.loadNpmTasks npmTask
      grunt.task.run task

  # taches qui ne peuvent pas être optimisées de cette manière
  grunt.loadNpmTasks 'grunt-usemin'
  grunt.loadNpmTasks 'grunt-scss-lint'
  grunt.loadNpmTasks 'grunt-contrib-connect'
  grunt.loadNpmTasks 'grunt-contrib-watch'


  # CONFIGURATION DES TACHES CHARGÉES
  # ============================================================================
  grunt.initConfig
    pkg: grunt.file.readJSON 'package.json'


    # HTML
    # ••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••
    # Les taches suivantes sont exclusivement dédiées au traitement du HTML

    # $ grunt assemble
    # --------------------------------------------------------------------------
    # Utilise Handlebars pour créer les sources HTML du projet à partir de
    # gabarits factorisés
    assemble:
      options:
        helpers   : ['handlebars-helper-compose', 'src/helpers/**/*.js']
        partials  : 'src/tpl/inc/**/*.hbs'
        layoutdir : 'src/tpl/layouts'
        layout    : 'default.hbs'

      dev:
        options:
          assets : 'build/dev/'
          data   : 'src/tpl/data/{*,dev/*}.json'
        expand : true
        cwd    : 'src/tpl/'
        src    : ['index.hbs','pages/**/*.hbs']
        dest   : 'build/dev'

      prod:
        options:
          assets : 'build/prod/'
          data   : 'src/tpl/data/{*,prod/*}.json'
        expand : true
        cwd    : 'src/tpl/'
        src    : ['index.hbs','pages/**/*.hbs']
        dest   : 'build/prod'

      doc:
        options:
          assets : 'build/'
          data   : 'src/tpl/data/{*,dev/*}.json'
          layout : 'documentation.hbs'
        files: [{
          expand : true
          cwd    : 'docs/'
          src    : ['**/*.md']
          dest   : 'build/docs/docs'
        },{
          src : 'readme.md'
          dest: 'build/docs/index.html'
        },{
          expand : true
          cwd    : 'src/docs/'
          src    : ['**/*.md']
          dest   : 'build/docs'
        }]

    # $ grunt prettify
    # --------------------------------------------------------------------------
    # Indente correctement le HTML du build de dev pour qu'il soit plus lisible
    prettify:
      options:
        config: '.jsbeautifyrc'
      dev:
        expand: true
        src   : ['build/dev/**/*.html']
      prod:
        expand: true
        src   : ['build/prod/**/*.html']

    # $ grunt kss
    # --------------------------------------------------------------------------
    # Generation du style guide basé sur les commentaires KSS des fichiers SCSS
    kss:
      styleguide:
        options:
          config: 'kss.json'

    # IMAGES
    # ••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••
    # Les taches suivantes sont exclusivement dédiées au traitement des images

    # $ grunt imagemin
    # --------------------------------------------------------------------------
    # Optimise automatiquement les images (png, jpeg, gif et svg)
    # Seul les images à la racine de `src/img` sont optimisées. Les images
    # optimisées sont automatiquement placées dans `build/dev` et `build/prod`
    imagemin:
      options:
        progressive: false
        svgoPlugins: [
          removeHiddenElems  : false
          convertStyleToAttrs: false
        ]
      dev:
        files: [
          expand: true,
          cwd   : 'src/img/',
          src   : ['*.{png,jpg,gif,svg}'],
          dest  : 'build/dev/img/'
        ]
      prod:
        files: [
          expand: true,
          cwd   : 'src/img/',
          src   : ['*.{png,jpg,gif,svg}'],
          dest  : 'build/prod/img/'
        ]



    # CSS
    # ••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••
    # Les taches suivantes sont exclusivement dédiées au traitement de CSS

    # $ grunt compass
    # --------------------------------------------------------------------------
    # Gère la compilation compass
    # TODO: configurer l'option watch pour rendre la compilation plus rapide
    compass:
      options:
        bundleExec: true
        config: 'config.rb'
      dev:
        options:
          environment: 'development'
      prod:
        options:
          environment: 'production'

    # $ grunt postcss
    # --------------------------------------------------------------------------
    # Applique des filtres de post-traitement aux feuilles de styles générées
    # Les post processeur CSS utilisés sont:
    # * Autoprefixer: Les problématiques de prefix sont gérées automatiquement
    postcss:
      options:
        processors: [
          require('autoprefixer-core')({browsers: ['> 4%', 'ie >= 8']}).postcss,
        ]
      dev:
        src: 'build/dev/css/*.css'
      prod:
        src: 'build/prod/css/*.css'

    # $ grunt scsslint
    # --------------------------------------------------------------------------
    # Vérifie que les fichiers Sass suivent les conventions de codage
    scsslint:
      all: ['src/**/*.scss','!src/sass/doc.scss']
      options:
        bundleExec: true
        config: '.scss-lint.yml'



    # JS
    # ••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••
    # Les taches suivantes sont exclusivement dédiées au traitement de JS

    # $ grunt useminPrepare
    # --------------------------------------------------------------------------
    useminPrepare:
      prod:
        src: 'build/dev/pages/*.html'
        options:
          dest: 'build/prod/pages'

    # $ grunt usemin
    # --------------------------------------------------------------------------
    usemin:
      prod:
        src: 'build/prod/**/*.html'

    # $ grunt jshint
    # --------------------------------------------------------------------------
    # Vérifie que les fichiers Javascript suivent les conventions de codage
    jshint:
      all: ['src/**/*.js','!src/js/lib/**/*.js']
      options:
        jshintrc: '.jshintrc'



    # UTILITAIRES
    # ••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••
    # Les taches suivantes sont des utilitaires génériques

    # $ grunt clean
    # --------------------------------------------------------------------------
    # Supprime tous les fichiers avant de lancer un build
    clean:
      dev : ['build/dev']
      prod: ['build/prod']
      doc : ['build/docs']

    # $ grunt copy
    # --------------------------------------------------------------------------
    # Déplace tous les fichiers qui ont besoin de l'être
    copy:
      js:
        files: [{
          expand: true
          cwd: 'src'
          src: ['js/**/*.js']
          dest: 'build/dev/'
        }]
      fonts:
        files: [{
          expand: true
          cwd: 'src'
          src: ['fonts/**/*']
          dest: 'build/dev/'
        },
        {
          expand: true
          cwd: 'src'
          src: ['fonts/**/*']
          dest: 'build/prod/'
        }]
      bower:
        files: [{
          expand: true
          cwd: 'bower_components'
          src: ['**/*.js']
          dest: 'src/js/lib/'
        }]

    # $ grunt exec
    # --------------------------------------------------------------------------
    # Permet d'executer n'importe quelle commande shell
    exec:
      bower: 'bower install'

    # $ grunt connect
    # --------------------------------------------------------------------------
    # Static web server près à l'emplois pour afficher du HTML statique.
    connect:
      options:
        hostname: '*'

      # $ grunt connect:live
      # Uniquement pour être utilisé avec watch:livereload
      live:
        options:
          port       : 8000
          livereload : true
          middleware : (connect) ->
            [ connect.static('build/dev'),
              connect().use('/docs', connect.static('build/docs')) ]

      # $ grunt connect:dev
      # Pour pouvoir voir le contenu du repertoir `/build/dev` et `/build/docs`
      # A l'adresse http://localhost:8000 et http://localhost:8000/docs/
      dev:
        options :
          port       : 8000
          keepalive  : true
          middleware : (connect) ->
            [ connect.static('build/dev'),
              connect().use('/docs', connect.static('build/docs')) ]

      # $ grunt connect:prod
      # Pour pouvoir voir le contenu du repertoir `/build/prod`
      # A l'adresse http://localhost:8001
      prod:
        options :
          base       : 'build/prod'
          port       : 8001
          keepalive  : true

    # $ grunt watch
    # --------------------------------------------------------------------------
    # Configuration de tous les watcher du projet
    watch:
      options:
        spawn: false
      livereload:
        options:
          livereload: true
        files: ['build/dev/**/*']
      sass:
        files: ['src/sass/**/*.scss','src/sass/styleguide.md']
        tasks: ['sass', 'newer:scsslint', 'kss']
      images:
        files: 'src/img/*.{png,jpg,gif,svg}'
        tasks: ['newer:imagemin:dev']
      js:
        files: 'src/js/**/*.js'
        tasks: ['newer:copy:js', 'newer:jshint']
      html:
        files: 'src/tpl/**/*.hbs'
        tasks: ['assemble:dev','newer:prettify:dev']
      fonts:
        files: 'src/fonts/**/*'
        tasks: ['newer:copy:fonts']
      css:
        files: 'build/dev/css/**/*.css'
        tasks: ['newer:postcss']



  # TACHES PERSONALISÉES
  # ============================================================================
  # Intermediate task to handle `$ grunt watch --sass=no`
  grunt.registerTask 'sass', 'Checking Sass requirement', () ->
    if grunt.option('sass') is 'no'
      grunt.log.write 'We must not compile Sass'
    else
      grunt.log.write 'We are allowed to compile Sass'
      grunt.task.run 'compass:dev'

  # Intermediate task to handle `$ grunt live --bower=no`
  grunt.registerTask 'ifbower', 'Checking Bower requirement', () ->
    if grunt.option('bower') is 'no'
      grunt.log.write 'We must not call bower'
    else
      grunt.log.write 'Updating third party lib with bower'
      grunt.task.run 'bower'


  # PROXY
  # ••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••
  #
  grunt.registerTask 'nproxy', 'Start nproxy to proxy local JS and CSS files', () ->
    nproxy = require('nproxy')
    argv   = require('yargs').argv;

    # Grunt should not finish the task
    @async()

    # This will serve static local files for JS & CSS intead of remote ones
    # use: `localhost:8989` as proxy parameter

    # see `nproxy-conf.js` for proxy configuration
    port = 8989
    options =
      timeout : 100
      debug   : false

    options.responderListFilePath = require('./nproxy-conf.js')(argv)

    nproxy port, options
