const singleSpaAngularWebpack = require('single-spa-angular/lib/webpack').default;
// const environment = require('./src/environments/environment.ts');

module.exports = (angularWebpackConfig, options) => {
  // angularWebpackConfig.entry.main = ['./src/main.ts'];
  const singleSpaWebpackConfig = singleSpaAngularWebpack(angularWebpackConfig, options);

  // Feel free to modify this webpack config however you'd like to
  // return singleSpaWebpackConfig;
  return singleSpaWebpackConfig;
};
