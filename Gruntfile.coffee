module.exports = (grunt) ->
  try
    require('time-grunt')(grunt)
  catch error
    grunt.log.debug "time-grunt not installed"

  try
    require('jit-grunt')(grunt,
      usebanner: 'grunt-banner'
      scsslint: 'grunt-scss-lint'
      useminPrepare: 'grunt-usemin'
    )
  catch error
    grunt.log.debug "jit-grunt not installed"

  semver = require 'semver'
  pkg = grunt.file.readJSON 'package.json'

  # TÂCHES PERSONNALISÉES COMMUNES A TOUS LES PROJETS
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

  # $ grunt deploy
  # Alias of `sftp-deploy`
  grunt.registerTask 'deploy', ['sftp-deploy:build']

  # $ grunt version
  # Montée de version avec prompt
  grunt.registerTask 'version', ['prompt:bump', 'bump']

  # $ grunt kss
  # Generation du style guide basé sur les commentaires KSS des fichiers SCSS
  # Alias de grunt exec:kss
  grunt.registerTask 'kss', ['exec:kss']


  # CONFIGURATION DES TÂCHES CHARGÉES
  # ============================================================================
  grunt.initConfig
    pkg: grunt.file.readJSON 'package.json'


    # HTML
    # ••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••
    # Les tâches suivantes sont exclusivement dédiées au traitement du HTML

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
          dest   : 'build/dev/docs/docs'
        },{
          src : 'readme.md'
          dest: 'build/dev/docs/index.html'
        },{
          expand : true
          cwd    : 'src/docs/'
          src    : ['**/*.md']
          dest   : 'build/dev/docs'
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


    # IMAGES
    # ••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••
    # Les tâches suivantes sont exclusivement dédiées au traitement des images

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
    # Les tâches suivantes sont exclusivement dédiées au traitement de CSS

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
    # Les tâches suivantes sont exclusivement dédiées au traitement de JS

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
    # Les tâches suivantes sont des utilitaires génériques

    # $ grunt clean
    # --------------------------------------------------------------------------
    # Supprime tous les fichiers avant de lancer un build
    clean:
      dev : ['build/dev']
      prod: ['build/prod']

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
      kss: 'kss-node -c kss.json'

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
          base       : 'build/dev'
          port       : 8000
          livereload : true

      # $ grunt connect:dev
      # Pour pouvoir voir le contenu du repertoir `/build/dev`
      # A l'adresse http://localhost:8000
      dev:
        options :
          base       : 'build/dev'
          port       : 8000
          keepalive  : true

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


    # GIT HOOKS
    # --------------------------------------------------------------------------
    # Relie des tâches grunt aux hooks de git
    githooks:
      all:
        options:
          template: 'hooks/pre-commit.js'
        'pre-commit': 'test'


    # Deploy
    # ••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••

    # $ grunt sftp-deploy
    # --------------------------------------------------------------------------
    # Configuration du déploiment sftp sur le serveur de preview
    # Ajouter un fichier `.ftppass` au même niveau que le Gruntfile.coffee qui
    # contient les informations de connections sous cette forme :
    #
    # ```
    # {
    #   "key1": {
    #     "username": "your user name",
    #     "password": "your password"
    #   }
    # }
    # ```
    'sftp-deploy':
      build:
        auth:
          host: 'garden.clever-age.net'
          port: 22006
          authKey: 'key1'
        src: 'build'
        dest: '/home/integration/www/<%= pkg.name %>/<%= pkg.name %>_<%= pkg.version %>'
        exclusions: ['build/**/.DS_Store', 'build/**/Thumbs.db']
        serverSep: '/'
        concurrency: 4
        progress: true


    # GESTION DE LA VERSION
    # --------------------------------------------------------------------------

    # $ grunt bump
    # --------------------------------------------------------------------------
    # bump version
    bump:
      options:
        files: ['package.json']
        updateConfigs: ['pkg']
        commit: true
        commitMessage: '=== Bump to version <%= pkg.name %>_%VERSION% ==='
        commitFiles: ['package.json']
        createTag: true
        tagName: '<%= pkg.name %>_%VERSION%'
        tagMessage: 'Bumping <%= pkg.name %> to version %VERSION%'
        push: true
        pushTo: 'origin'
        gitDescribeOptions: '--tags --always --abbrev=1 --dirty=-d'
        globalReplace: false
        prereleaseName: false
        regExp: false


    # $ grunt prompt
    # --------------------------------------------------------------------------
    # prompt user for version bump
    prompt:
      bump:
        options:
          questions: [{
            config  : 'bump.options.versionType'
            type    : 'list'
            message : 'Bump version from ' + '<%= pkg.version %>' + ' to:'
            default : 'patch'
            choices: [{
              value : 'git'
              name  : 'Build:  '+ (pkg.version + '-?') + ' Unstable, betas, and release candidates.'
            },{
              value : 'patch'
              name  : 'Patch:  ' + semver.inc(pkg.version, 'patch') + ' Bug fixes.'
            },{
              value : 'minor'
              name  : 'Minor:  ' + semver.inc(pkg.version, 'minor') + ' Add some evolutions.'
            },{
              value : 'major'
              name  : 'Major:  ' + semver.inc(pkg.version, 'major') + ' Add new functionalities.'
            },{
              value : 'custom'
              name  : 'Custom: ?.?.? Specify version...'
            }]
          },{
            config   : 'bump.options.setVersion'
            type     : 'input'
            message  : 'What specific version would you like?'
            when     : (answers) ->
              answers['bump.options.versionType'] == 'custom'
            validate : (value) ->
              valid = semver.valid value
              typeof valid == 'string' || 'Must be a valid semver, such as 1.2.3-rc1. See http://semver.org/ for more details.'
          }]


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
