const webpackConfig = require('./webpack.prod.config');
const webpack = require('webpack');
// const config = require('./config/dev');

// 修改打包输出格式
webpackConfig.output.library = 'index';
webpackConfig.output.libraryTarget = 'amd';
webpackConfig.output.publicPath = `/app1/`;

webpackConfig.plugins.splice(0, 1);
webpackConfig.plugins.push(
  new webpack.DefinePlugin({
    'process.env.SINGLE_SPA': 'true',
  })
);
// 支持跨域加载资源文件
// webpackConfig.devServer.headers = {
//   'Access-Control-Allow-Origin': '*',
// };

module.exports = webpackConfig;
