module.exports = {
	plugins: [
		require("postcss-import")({ from: "assets/css/main.css" }),
		require("autoprefixer")(),
		require("postcss-nesting")(),
		require("postcss-short")(),
		require("postcss-custom-unit")({
			units: [
				{
					// Major Scale
					from: "m",
					convert: function(val) {
						return val * 8 + "px";
					}
				}
			]
		})
	]
};
