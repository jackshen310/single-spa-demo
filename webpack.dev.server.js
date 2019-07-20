const webpack = require('webpack');
const webpackConfig = require('./webpack.dev.config');
const express = require('express');
const webpackMiddleware = require('webpack-dev-middleware');
const fallback = require('express-history-api-fallback');

// http://webpack.wuhaolin.cn/3%E5%AE%9E%E6%88%98/3-18%E4%BD%BF%E7%94%A8WebpackDevMiddleware.html
webpackConfig.entry = {
  index: ['webpack-hot-middleware/client?noInfo=true&reload=true', './src/root-app/root-app.js'],
  'common-dependencies': [
    // We want just one version of angular, so we put it into the common dependencies
    'core-js/client/shim.min.js',
    '@angular/common',
    '@angular/compiler',
    '@angular/core',
    '@angular/platform-browser-dynamic',
    '@angular/router',
    'reflect-metadata',
    /* Just one version of react, too. react-router is fine to have multiple versions of,
     * though, so no need to put it in common dependencies
     */
    'react',
    'react-dom',
  ],
};
webpackConfig.entry = ['webpack-hot-middleware/client?noInfo=true&reload=true', './src/root-app/root-app.js'];

// 实例化一个 Expressjs app
const app = express();

// 用读取到的 Webpack 配置实例化一个 Compiler
const compiler = webpack(webpackConfig);
// 给 app 注册 webpackMiddleware 中间件
app.use(
  webpackMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
    quiet: true, //向控制台显示任何内容
  })
);
// 为了支持模块热替换，响应用于替换老模块的资源
app.use(require('webpack-hot-middleware')(compiler));
// 把项目根目录作为静态资源目录，用于服务 HTML 文件
app.use(express.static('./dist'));
app.use(fallback('index.html', { root: './dist' }));
// 启动 HTTP 服务器，服务器监听在 3000 端口
app.listen(9090);
