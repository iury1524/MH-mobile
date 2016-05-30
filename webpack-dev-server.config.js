var webpack = require('webpack');
var path = require('path');
var buildPath = path.resolve(__dirname, 'build');
var nodeModulesPath = path.resolve(__dirname, 'node_modules');
var TransferWebpackPlugin = require('transfer-webpack-plugin');

var config = {
  //Entry points to the project
  entry: [
    'webpack/hot/dev-server',
    'webpack/hot/only-dev-server',
    path.join(__dirname, '/src/app/app.jsx')
  ],
  resolve: {
    extensions: ["", ".js", ".jsx"]
  },
  //Server Configuration options
  devServer:{
    contentBase: 'src/app',  //Relative directory for base of server
    devtool: 'eval',
    hot: true,        //Live-reload
    inline: true,
    port: 3000        //Port Number
  },
  devtool: 'eval',
  output: {
    path: buildPath,    //Path of output file
    filename: 'app.js'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new TransferWebpackPlugin([
      {from: 'app'}
    ], path.resolve(__dirname, "src"))
  ],
  module: {
    preLoaders: [
      { test: /\.(js|jsx)$/,
        loader: 'source-map',
        include: [path.resolve(__dirname, "src/app")],
        exclude: [nodeModulesPath]
      },
    ],
    loaders: [
      {   test: /\.scss$/,
          include: /scss/,
          loaders: [
              'style',
              'css',
              'autoprefixer?browsers=last 3 versions',
              'sass?outputStyle=expanded'
          ]
      },
      { test: /\.(jpe?g|png|gif|svg|jpg)$/i,
        loader: 'url?limit=25000'
      },
      { test: /\.(js|jsx)$/,
        loaders: ['react-hot', 'babel'],
        exclude: [nodeModulesPath]
      },
      { test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
    ]
  },
  eslint: {
    configFile: '.eslintrc'
  },
};

module.exports = config;
