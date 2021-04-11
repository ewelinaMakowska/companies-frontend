'use strict'

const webpack = require('webpack')
const { VueLoaderPlugin } = require('vue-loader')
const HtmlWebpackPlugin = require('html-webpack-plugin');
require("babel-polyfill");
const Dotenv = require('dotenv-webpack');

let envPath;


if(process.env.NODE_ENV === 'production' || !process.env.NODE_ENV) {
  envPath = '.env.prod'
} else if (process.env.NODE_ENV === 'development') {
  envPath = '.env.dev'
} else if (process.env.NODE_ENV === 'testing') {
  envPath = '.env.test'
} else {
  envPath = '.env.prod'
}


module.exports = {
  mode: 'development',
 /*  entry: [
    './src/main.js'
  ],  */
  entry: [
    "babel-polyfill", './src/main.js'
  ], 
  output: {
    publicPath: '/'
  },
  devServer: {
    hot: true,
    watchOptions: {
      poll: true
    },
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: 'vue-loader'
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader' ]
      },
      { 
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',             
          }
        ] 
      },
      {
        test: /\.js$/,
        use: 'babel-loader'
      }/* ,
      {
        test: /\.(js|vue)$/,
        use: 'eslint-loader',
        enforce: 'pre'
      } */
    ]
  },
  plugins: [
    new Dotenv({path: envPath}),
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    })
  ],
}
