const webpack = require('webpack');
const devConfig = {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    contentBase: './dist',
    port: '1234',
    open: true,
    hot: true,
    hotOnly: true,
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
  output: {
    filename: '[name].js',
    chunkFilename: '[name].chunk.js',
  },
};
module.exports = devConfig;
