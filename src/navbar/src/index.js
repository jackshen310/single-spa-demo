import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import singleSpaReact from 'single-spa-react';
// 或者指定loader http://webpack.wuhaolin.cn/1%E5%85%A5%E9%97%A8/1-4%E4%BD%BF%E7%94%A8Loader.html
// require('style-loader!css-loader?minimize!./index.css');

if (!process.env.SINGLE_SPA) {
  ReactDOM.render(<App />, document.getElementById('root'));
}

const reactLifecycles = singleSpaReact({
  React,
  ReactDOM,
  rootComponent: spa => {
    // 我们在创建生命周期的时候,把消息总线传入的东西,以props的形式传入组件当中
    // 这样,在每个模块中就可以直接调用跟查询其他模块的api与状态了
    console.log(spa);
    return <App globalMsgCenter={spa.globalMsgCenter} />;
  },
  domElementGetter,
});

export function bootstrap(props) {
  return reactLifecycles.bootstrap(props);
}

export function mount(props) {
  return reactLifecycles.mount(props);
}

export function unmount(props) {
  return reactLifecycles.unmount(props);
}

function domElementGetter() {
  // Make sure there is a div for us to render into
  let el = document.getElementById('root');
  if (!el) {
    el = document.createElement('div');
    el.id = 'root';
    document.body.appendChild(el);
  }

  return el;
}

// 热更新
if (module.hot) {
  module.hot.accept();
}
