var postcss = require('postcss')

module.exports = postcss.plugin('postcss-fade-to-gray', function (opts) {
  opts = opts || {}

  // defaults
  opts.saturation = opts.saturation || 0

  var hexaColorTest = /#[0-9a-f]{6}|#[0-9a-f]{3}/gi
  var sat = opts.saturation / 100

  function componentToHex (c) {
    var hex = c.toString(16)
    return hex.length === 1 ? '0' + hex : hex
  }

  function rgbToHex (r, g, b) {
    return '#' + componentToHex(r) + componentToHex(g) + componentToHex(b)
  }

  function hexToRgb (hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null
  }

  return function (root) {
    root.walkDecls(function transformDecl (decl) {
      var matches = decl.value.match(hexaColorTest)
      if (!matches) {
        return
      }
      matches.forEach(function (color) {
        var col = hexToRgb(color)
        if (col !== null) {
          var gray = col.r * 0.3086 + col.g * 0.6094 + col.b * 0.0820

          col.r = Math.round(col.r * sat + gray * (1 - sat))
          col.g = Math.round(col.g * sat + gray * (1 - sat))
          col.b = Math.round(col.b * sat + gray * (1 - sat))

          var result = rgbToHex(col.r, col.g, col.b)

          decl.value = decl.value.replace(color, result)
        }
      })
    })
  }
})
