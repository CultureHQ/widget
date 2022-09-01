const path = require("path");

module.exports = {
  entry: path.join(__dirname, "src", "widget.js"),
  output: {
    library: "CHQ",
  },
  module: {
    rules: [{ test: /\.js$/, use: "babel-loader", exclude: /node_modules/ }],
  },
};
