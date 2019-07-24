const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // https://www.cnblogs.com/steamed-twisted-roll/p/10990309.html
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.config');

module.exports = merge(baseWebpackConfig, {
  mode: 'production',
  devtool: 'cheap-module-source-map',
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ['*', '!app1/*', '!app2/*', '!app3/*', '!navbar/*'],
    }), // 删除dist目录
  ],
});
