const webpackConfig = require('./webpack.dev.config');
const webpack = require('webpack');
const config = require('./config/dev');

// 修改entry入口
// webpackConfig.entry.index = ['./src/spa-index.js'];

// 修改打包输出格式
webpackConfig.output.library = 'index';
webpackConfig.output.libraryTarget = 'amd';
webpackConfig.output.publicPath = `http://localhost:${config.port}/`;
webpackConfig.output.jsonpFunction = 'webpackJsonp_app1';

webpackConfig.plugins.splice(0, 1); // 不需要HtmlWebpackPlugin
webpackConfig.plugins.push(
  new webpack.DefinePlugin({
    'process.env.SINGLE_SPA': 'true',
  })
);
// 支持跨域加载资源文件
webpackConfig.devServer.headers = {
  'Access-Control-Allow-Origin': '*',
};

// 在spa模式下，使用公共依赖
webpackConfig.externals = [/^react$/, /^react-dom$/];
module.exports = webpackConfig;
