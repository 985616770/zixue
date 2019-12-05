const path = require('path');
const WebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const devConfig = require('./webpack.dev');
const prodConfig = require('./webpack.prod');
const merge = require('webpack-merge');

const commonConfig = {
  entry: {
    main: './src/index.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.(jpg|png|gif|woff)$/,
        use: {
          loader: 'url-loader',
          options: {
            name: '[name]_[hash].[ext]',
            outputPath: 'images/',
            limit: 12048, // 2048字节==2kb
          },
        },
      },
      {
        test: /\.(eot|ttf|svg)$/i,
        use: {
          loader: 'file-loader',
        },
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
      },
    ],
  },
  plugins: [
    new WebpackPlugin({
      template: 'src/index.html',
      title: 'hello webpack',
    }),
    new CleanWebpackPlugin(),
  ],
  optimization: {
    // runtimeChunk: {
    //   name: 'runtime',
    // },
    // 开启tree-shaking
    usedExports: true,
    // 开启code-splitting
    splitChunks: {
      chunks: 'all', // 对引入的方式的代码打包 async
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/, // 是否在
          priority: -10, // 优先级
          name: 'vendors', // 名字
        },
      },
    },
  },
  performance: false,
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '../dist'),
  },
};

module.exports = (env) => {
  if (env && env.production) {
    return merge(commonConfig, prodConfig);
  } else {
    return merge(commonConfig, devConfig);
  }
};
