module.exports = {
  resolve: {
    extensions: ['.ts', '.js']
  },
  output: {
    path: __dirname + '/dist',
    filename: 'bundle.js',
    libraryTarget: 'commonjs' // CommonJSとして出力
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
