import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import PageRouter from './pages/PagesRouter';
import Main from './Main';
import './Main.css';
// 或者指定loader http://webpack.wuhaolin.cn/1%E5%85%A5%E9%97%A8/1-4%E4%BD%BF%E7%94%A8Loader.html
// require('style-loader!css-loader?minimize!./index.css');

if (!process.env.SINGLE_SPA) {
  // 开发环境直接渲染
  ReactDOM.render(<Main />, document.getElementById('root'));
  // 热更新
  if (module.hot) {
    module.hot.accept();
  }
}

// const reactLifecycles = singleSpaReact({
//   React,
//   ReactDOM,
//   rootComponent: spa => {
//     // 我们在创建生命周期的时候,把消息总线传入的东西,以props的形式传入组件当中
//     // 这样,在每个模块中就可以直接调用跟查询其他模块的api与状态了
//     return (
//       <Router basename="/app1">
//         <PageRouter globalMsgCenter={spa.globalMsgCenter} />
//       </Router>
//     );
//   },
//   domElementGetter,
// });

export async function bootstrap() {
  console.log('react app bootstraped');
}

export async function mount(props) {
  console.log('props from main framework', props);
  ReactDOM.render(
    <Router basename="/app1">
      <PageRouter globalMsgCenter={props.globalMsgCenter} />
    </Router>,
    domElementGetter()
  );
}

export async function unmount() {
  ReactDOM.unmountComponentAtNode(document.getElementById('app1'));
}

// 定义全局变量，确保应用隔离
export const globalVariableNames = ['_', 'abc'];

function domElementGetter() {
  // Make sure there is a div for us to render into
  let el = document.getElementById('app1');
  if (!el) {
    el = document.createElement('div');
    el.id = 'app1';
    document.querySelector('.ant-layout-content').appendChild(el);
  }
  return el;
}
