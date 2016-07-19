
Eyeglass
===============================================================================

Default css engine.

Configuration:
```json
{
  "css": {
    "engine": "eyeglass",
  }
}
```


Use assets and sprites
-------------------------------------------------------------------------------

Assets path in `asset-url` function must be relative to `src/assets` directory.

```scss
@import 'assets';

.logo {
  background-image: asset-url('img/logo.png');
}
```

For spriting, eyeglass-spiting is installed by default.

```scss
@import 'assets';
@import 'spriting';

// define a icon sprites
$icon-sprite: sprite-map('icon-sprite',
  sprite-layout(horizontal, (spacing: 5px, alignment: bottom)),
  'img/sprite/*'); // wildcard relative to `src/assets` directory

%icon-bg {
  // calling sprite-background generates the sprite map image
  @include sprite-background($icon-sprite);
}

@each $icon in sprite-list($icon-sprite) {
  .icon-#{sprite-identifier($icon-sprite, $icon)} {
    @extend %icon-bg;
    @include sprite-position($icon-sprite, $icon);
    // If all of your sprites are the same size, include sprite-dimensions() n %icon-bg
    @include sprite-dimensions($icon-sprite, $icon);
  }
}
```


Add an Eyeglass module
-------------------------------------------------------------------------------

Install it as dependency with npm:
```bash
npm install eyeglass-moduleName --save
```

And import the module in your scss:
```scss
@import 'spriting';
```



