var path = require('path');
var nodeExternals = require('webpack-node-externals');

module.exports = {
  target: 'node',
  externals: [
    {
      'aws-sdk': 'aws-sdk',
    },
    nodeExternals(),
  ],
  entry: './src/lambda.ts',
  output: {
    path: path.join(__dirname, './dist/production'),
    filename: 'index.js',
    libraryTarget: 'commonjs',
  },
  resolve: {
    root: [
      path.join(__dirname, './dist/src')
    ],
    extensions: ['', '.ts', '.tsx', '.js']
  },
  module: {
    loaders: [
      { test: /\.tsx?$/, loader: 'ts-loader' },
    ]
  },
};
