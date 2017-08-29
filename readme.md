# Clever _Garden Starter Kit_

This project is a package of usefull gulp tasks for static project.

It contains every tools for implementing our best practicesrequired in our static project at Clever Age.

Each tool has a dedicated documentation about his use in our context. This documentation is edited in [Markdown format](https://daringfireball.net/projects/markdown/syntax) and available in `docs` directory of this repository.

## Initialize your project

1. Initialize git `git init` (or clone your project repository if existing yet).
2. Initialize your project with `npm init`.
3. Install the GSK `npm install cleverage/garden-starter-kit#next` (`next` is branch for v4 alpha).
4. Run `gsk` command. It will ask you which html and css engine you want (Twig and Sass by default). Then it will install required dependencies for these engines and prepare some files in your project

  ⚠ You won’t be able to change these choices later.

5. You can commit your change and start your project.

## Engine choices informations

### CSS
* [Sass](docs/css/sass.md) [Recommanded]
* [Sass/Compass](docs/css/compass.md)
* [Stylus](docs/css/stylus.md)
* [LESS](docs/css/less.md)

### HTML
* [Twig](docs/html/twig.md) [Recommanded]
* [Handlebars](docs/html/handlebars.md)

### JavaScript
* [Webpack + NPM](docs/js/webpack.md)
