import React from 'react';
import ReactDOM from 'react-dom';
import singleSpaReact from 'single-spa-react';
import App from './App';
// 或者指定loader http://webpack.wuhaolin.cn/1%E5%85%A5%E9%97%A8/1-4%E4%BD%BF%E7%94%A8Loader.html
// require('style-loader!css-loader?minimize!./index.css');

if (!process.env.SINGLE_SPA) {
  // 开发环境直接渲染
  ReactDOM.render(<App />, document.getElementById('root'));
  // 热更新
  if (module.hot) {
    module.hot.accept();
  }
}

const reactLifecycles = singleSpaReact({
  React,
  ReactDOM,
  rootComponent: spa => {
    // 我们在创建生命周期的时候,把消息总线传入的东西,以props的形式传入组件当中
    // 这样,在每个模块中就可以直接调用跟查询其他模块的api与状态了
    return <App globalMsgCenter={spa.globalMsgCenter} />;
  },
  domElementGetter,
});

// This lifecycle function will be called once, right before the registered application is mounted for the first time.
export function bootstrap(props) {
  console.debug('react app bootstrap', props);
  return reactLifecycles.bootstrap(props);
}

export function mount(props) {
  console.debug('react app mount', props);
  return reactLifecycles.mount(props);
}

export function unmount(props) {
  console.debug('react app unmount', props);
  // unloadApplication('app-1'); // 卸载react app,会触发unload生命周期
  return reactLifecycles.unmount(props);
}

export function unload(props) {
  return Promise.resolve().then(() => {
    // Hot-reloading implementation goes here
    console.log('react app unloaded!');
  });
}

function domElementGetter() {
  // Make sure there is a div for us to render into
  let el = document.getElementById('app1');
  if (!el) {
    el = document.createElement('div');
    el.id = 'app1';
    el.style.marginTop = '100px';
    document.body.appendChild(el);
  }

  return el;
}
