var fs = require('fs-extra');
var gulp = require('gulp');
var path = require('path');
var twig = require('gulp-twig');
var rename = require('gulp-rename');

module.exports = function (config) {
  // write config file
  fs.writeFile('./gsk.json', JSON.stringify(config, null, 2) , 'utf-8', function (err) {
    if (err) throw err;
    console.log('Congratalation! You have successfully initialized your project');
  });

  // copy files relativly to choosen config
  // conditional install for other packages

  var base = path.resolve(__dirname, '../starter');
  // files wildcard relative to directory
  var files = [
    base + '/.editorconfig',
    base + '/.eslintrc.json',
    base + '/kss.json',
    base + '/webpack-config.js',
    base + '/docs/**/*',
    base + '/src/assets/**/*',
    base + '/src/css/**/*.md',
    base + '/src/data/**/*',
    base + '/src/js/**/*',
    base + '/src/html/**/*.json', // data sample for kss
  ];

  var dependencies = [
    'jquery@3.2.1',
    'slick-carousel@1.7.1',
  ];

  if (config.html.engine === 'twig') {
    files.push(base + '/src/html/**/*.twig');
  } else if (config.html.engine === 'handlebars') {
    files.push(base + '/src/html/**/*.hbs');

    dependencies.push('gulp-hb@6.0.2');
  }

  if (config.css.engine === 'compass' || config.css.engine === 'sass') {
    files.push(base + '/src/css/**/*.scss');

    if (config.css.engine === 'sass') {
      files.push(base + '/.sass-lint.yml');

      dependencies.push('gulp-sass@3.1.0');
      dependencies.push('gulp-sass-lint@1.3.3');
      dependencies.push('sass-lint@1.11.0');
      dependencies.push('node-sass@4.5.3');
      dependencies.push('node-sass-import@1.1.1');
    } else if (config.css.engine === 'compass') {
      files.push(base + '/.scss-lint.yml');
      files.push(base + '/config.rb');
      files.push(base + '/Gemfile');

      dependencies.push('gulp-compass@2.1.0');
      dependencies.push('gulp-scss-lint@0.5.0');
    }
  } else if (config.css.engine === 'stylus') {
    files.push(base + '/src/css/**/*.styl');
    files.push(base + '/.stylintrc');

    dependencies.push('gulp-stylint@4.0.0');
    dependencies.push('gulp-stylus@2.6.0');
  } else if (config.css.engine === 'less') {
    files.push(base + '/src/css/**/*.less');
    files.push(base + '/.lesshintrc');

    dependencies.push('gulp-less@3.3.2');
    dependencies.push('gulp-lesshint@4.0.0');
  }

  gulp.src(files, {base: base, dot: true})
  .pipe(gulp.dest(process.cwd()));

  gulp.src(base + '/.gitignore.dist', {base: base, dot: true})
  .pipe(rename('.gitignore'))
  .pipe(gulp.dest(process.cwd()));


  gulp.src(base + '/readme.dist.md', {base: base, dot: true})
  .pipe(twig({data: require(path.join(process.cwd(), 'package.json'))}))
  .pipe(rename('readme.md'))
  .pipe(gulp.dest(process.cwd()));

  require('child_process').execSync('npm install ' + dependencies.join(' ') + ' --save-dev', {stdio: [0, 1, 2]});
}
