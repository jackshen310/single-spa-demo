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

registerApplication('app-1', () => import('../app1/index.js'), pathPrefix('/app1'));
registerApplication('app-2', () => import('../app2/index.js'), pathPrefix('/app2'));

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
