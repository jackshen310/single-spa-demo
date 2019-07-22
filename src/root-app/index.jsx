import React from 'react';
import ReactDOM from 'react-dom';
import { registerApplication, start } from 'single-spa';
require('./index.css');
// 或者指定loader http://webpack.wuhaolin.cn/1%E5%85%A5%E9%97%A8/1-4%E4%BD%BF%E7%94%A8Loader.html
// require('style-loader!css-loader?minimize!./index.css');

class App extends React.Component {
  handleRoute = path => {
    singleSpaNavigate(path);
  };
  render() {
    return (
      <ul className="navbar">
        <a onClick={this.handleRoute.bind(this, '/app1')}>
          <li>App 1</li>
        </a>
        <a onClick={this.handleRoute.bind(this, '/app2')}>
          <li>App 2</li>
        </a>
      </ul>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));

/**
 * 第四个参数为自定义属性 https://single-spa.js.org/docs/building-applications.html
 share a common access token with all child apps
 pass down some initialization information, like the rendering target
 pass a reference to a common event bus so each app may talk to each other
 */
registerApplication('app-1', () => import('../app1/index.js'), pathPrefix('/app1'), {
  appInfo: 'react app',
});
registerApplication('app-2', () => import('../app2/index.js'), pathPrefix('/app2'), {
  appInfo: 'angular app',
});
registerApplication('app-3', () => import('../app3/index.js'), pathPrefix('/app3'), {
  appInfo: 'vue app',
});

start();

function pathPrefix(prefix) {
  return function(location) {
    return location.pathname.startsWith(`${prefix}`);
  };
}

// 热更新
if (module.hot) {
  module.hot.accept();
}
