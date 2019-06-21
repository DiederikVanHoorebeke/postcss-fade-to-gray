# PostCSS Fade To Gray [![Build Status][ci-img]][ci]

[PostCSS] plugin to desaturate your colors..

[PostCSS]: https://github.com/postcss/postcss
[ci-img]:  https://travis-ci.org/DiederikVanHoorebeke/postcss-fade-to-gray.svg
[ci]:      https://travis-ci.org/DiederikVanHoorebeke/postcss-fade-to-gray

```css
.foo {
  color: #dae1e7;
  background-color: #e3342f;
}
```

```css
.foo {
  color: #dfdfdf;
  background-color: #6a6a6a;
}
```

## Example postcss.config.js

```js
module.exports = ({
  options
}) => ({
  plugins: {
    'postcss-import': {},
    'autoprefixer': {},
    'postcss-fade-to-gray': {
      saturation: 0
    },
    'cssnano': {},
  }
})
```

### Parameters
**saturation**: 0 (default, max 100)
