module.exports = {
  output: {
    library: "CHQ"
  },
  module: {
    rules: [{ test: /\.js$/, use: "babel-loader", exclude: /node_modules/ }]
  }
};
