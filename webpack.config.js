const path = require('path');

module.exports = {
  mode: "production",
  entry: "./src/index.js",
  output: {
    path: path.resolve('build'),
    filename: "index.js",
    libraryTarget: "commonjs2"
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
    ]
  },
  externals: {
    react: "react",
    muuri: "muuri",
    PropTypes: "prop-types"
  }
};
