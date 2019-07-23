const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin'); //引入html-webpack-plugin
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // 使用参考：https://www.npmjs.com/package/mini-css-extract-plugin

// http://webpack.wuhaolin.cn/4%E4%BC%98%E5%8C%96/4-3%E4%BD%BF%E7%94%A8HappyPack.html
const HappyPack = require('happypack');
// 构造出共享进程池，进程池中包含5个子进程
const happyThreadPool = HappyPack.ThreadPool({ size: 5 });

module.exports = {
  // 高级用法参考：http://webpack.wuhaolin.cn/2%E9%85%8D%E7%BD%AE/2-1Entry.html
  entry: {
    index: ['./src/index.js'], //入口文件，若不配置webpack4将自动查找src目录下的index.js文件
  },
  // http://webpack.wuhaolin.cn/2%E9%85%8D%E7%BD%AE/2-2Output.html
  output: {
    filename: '[name].js', //输出文件名，[name]表示入口文件js名
    path: path.join(__dirname, 'dist'), //输出文件路径
    chunkFilename: '[name].[chunkhash:8].js', // chunkhash是根据具体每一个模块文件自己的的内容包括它的依赖计算所得的hash，所以某个文件的改动只会影响它本身的hash，不会影响其它文件。
    publicPath: '/', // 指定资源路径，所有的按需加载的资源都从根路径开始找， https://webpack.js.org/guides/public-path/
  },
  // ResolveLoader 用于配置 Webpack 如何寻找 Loader。
  // 默认情况下只会去 node_modules 目录下寻找，为了让 Webpack 加载放在本地项目中的 Loader 需要修改 resolveLoader.module
  // resolveLoader: {
  //   modules: ['node_modules', 'loaders'], // 在./loaders目录下查找自定义loader
  // },
  resolve: {
    // import时可以忽略文件后缀，例如 import App from './App', 而不需要 './App.jsx'
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    alias: {
      vue$: 'vue/dist/vue.esm.js',
    },
    // 针对 Npm 中的第三方模块优先采用 jsnext:main 中指向的 ES6 模块化语法的文件
    mainFields: ['jsnext:main', 'browser', 'main'],
  },
  module: {
    // 链式loader执行顺序从右至左或者自下而上
    rules: [
      {
        // react loader
        test: /\.(js|jsx)?$/,
        // 把对 .js 文件的处理转交给 id 为 babel 的 HappyPack 实
        use: ['happypack/loader?id=babel'],
        exclude: /node_modules/,
      },
      // ts-loader http://webpack.wuhaolin.cn/3%E5%AE%9E%E6%88%98/3-2%E4%BD%BF%E7%94%A8TypeScript%E8%AF%AD%E8%A8%80.html
      {
        test: /\.tsx?$/,
        use: ['ts-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.(sa|sc|c)ss$/,
        exclude: /node_modules/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader, // 替换style-loader
            options: {
              hmr: process.env.NODE_ENV === 'development',
              reloadAll: true,
            },
          },
          'css-loader',
          {
            // 自定义loader
            loader: 'my-loader',
            options: {
              arg: 'test',
            },
          },
          'sass-loader',
        ],
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html', //输出文件名
      template: './index.html', // 以当前目录下的index.html文件为模板生成dist/index.html文件
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
    // new webpack.DllReferencePlugin({
    //   context: path.join(__dirname, '.', 'dll'),
    //   manifest: require('./dll/manifest.json'),
    // }),
    // https://www.cnblogs.com/zhishaofei/p/8590627.html
    new webpack.HashedModuleIdsPlugin(),
    new HappyPack({
      // 用唯一的标识符 id 来代表当前的 HappyPack 是用来处理一类特定的文件
      id: 'babel',
      // 如何处理 .js 文件，用法和 Loader 配置中一样
      loaders: ['babel-loader?cacheDirectory'],
      // 使用共享进程池中的子进程去处理任务
      threadPool: happyThreadPool,
      // ... 其它配置项
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
  ],
};
