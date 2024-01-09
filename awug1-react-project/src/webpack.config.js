const GoogleFontsPlugin = require("google-fonts-webpack-plugin");

module.exports = {
  plugins: [

    new GoogleFontsPlugin({
      fonts: [
        { family: "Raleway", variants: ["400", "700"] },
      ],
      formats: ["woff2", "woff"],
    }),
  ],
};