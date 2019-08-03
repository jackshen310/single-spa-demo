const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); //引入html-webpack-plugin
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  // 高级用法参考：http://webpack.wuhaolin.cn/2%E9%85%8D%E7%BD%AE/2-1Entry.html
  entry: {
    index: ['./src/root-app/index.js'], //入口文件，若不配置webpack4将自动查找src目录下的index.js文件
  },
  // http://webpack.wuhaolin.cn/2%E9%85%8D%E7%BD%AE/2-2Output.html
  output: {
    filename: '[name].[hash:8].js', //输出文件名，[name]表示入口文件js名
    path: path.join(__dirname, 'dist'), //输出文件路径
    publicPath: '/', // 指定资源路径，所有的按需加载的资源都从根路径开始找， https://webpack.js.org/guides/public-path/
  },
  resolve: {
    // import时可以忽略文件后缀，例如 import App from './App', 而不需要 './App.jsx'
    extensions: ['.js', '.ts'],
  },
  externals: {
    react: 'react',
    'react-dom': 'react-dom',
  },
  module: {
    // 链式loader执行顺序从右至左或者自下而上
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader'],
      },
      // ts-loader http://webpack.wuhaolin.cn/3%E5%AE%9E%E6%88%98/3-2%E4%BD%BF%E7%94%A8TypeScript%E8%AF%AD%E8%A8%80.html
      {
        test: /\.tsx?$/,
        use: ['ts-loader'],
        exclude: /node_modules/,
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html', //输出文件名
      template: './index.html', // 以当前目录下的index.html文件为模板生成dist/index.html文件
    }),
    new CopyPlugin([
      { from: './node_modules/systemjs/dist/system.js', to: '' },
      { from: './node_modules/systemjs/dist/extras/amd.js', to: 'extras/' },
      { from: './node_modules/systemjs/dist/extras/named-exports.js', to: 'extras/' },
      { from: './node_modules/systemjs/dist/extras/use-default.js', to: 'extras/' },
      { from: './node_modules/react/umd/react.development.js', to: '' },
      { from: './node_modules/react-dom/umd/react-dom.development.js', to: '' },
    ]),
  ],
};
