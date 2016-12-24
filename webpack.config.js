var glob = require('glob');
var path = require('path');

var entries = {};
glob.sync('./src/**/*.ts').forEach(function (file) {
  entries[file.replace('.ts', '')] = [file];
});
glob.sync('./tests/**/*.ts').forEach(function (file) {
  entries[file.replace('.ts', '')] = [file];
});

module.exports = {
  entry: entries,
  output: {
    path: path.join(__dirname, 'dist'),
    filename: "[name].js",
  },
  target: 'node',
  resolve: {
    extensions: ['', '.ts', '.js']
  },
  module: {
    loaders: [
      {
        test: /\.ts$/,
        loader: 'awesome-typescript-loader'
      }
    ]
  }
};
