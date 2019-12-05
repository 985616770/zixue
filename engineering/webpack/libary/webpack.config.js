const path = require('path');
module.exports = {
  mode: 'production',
  entry: path.join(__dirname, 'src', 'index'),
  // 忽略导入的库
  externals: ['lodash'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'library.js', 
    library: 'zp', // 库的名称
    libraryTarget: 'umd', // 打包的模式
  },
};
