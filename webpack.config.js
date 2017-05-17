var path = require('path');
var srcPath = path.join(__dirname, 'src');
var buildPath = path.join(__dirname, 'dist');

module.exports = {
  context: srcPath,
  entry: path.join(srcPath, 'js', 'app.js'),
  output: {
      path: buildPath,
      filename: "bundle.js"
  },
  module: {
      loaders: [
          {
            test: /\.js?$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
              presets: ['es2015']
            }
          }
      ]
  }
};