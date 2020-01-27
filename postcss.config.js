module.exports = {
 plugins: [
  require("postcss-partial-import")(),
  require("autoprefixer")(),
  require("postcss-nesting")(),
  require("postcss-short")(),
  require("postcss-color-hex-alpha")(),
  require("postcss-hexrgba")(),
  require("postcss-custom-unit")({
   units: [
    {
     // Major Scale
     from: "maj",
     convert: function(val) {
      return val * 8 + "px"
     }
    }
   ]
  })
 ]
}
