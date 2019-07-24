import { registerApplication, start } from 'single-spa';
import devConfig from './config/dev';
import prodConfig from './config/prod';
import '../navbar/src/index.css'; // FIXME 这个样式放到navbar项目不生效，故先临时放在这里
import * as singleSpa from 'single-spa';
import MsgCenter from './MsgCenter';

window.SystemJS = window.System;
window.singleSpa = singleSpa;

let config = null;
if (process.env.NODE_ENV === 'development') {
  config = devConfig;
} else {
  config = prodConfig;
}

const globalMsgCenter = new MsgCenter();
config.apps.forEach(item => {
  // 将全局globalMsgCenter对象注入到每一个single-spa应用
  const customProps = {
    globalMsgCenter: globalMsgCenter,
  };
  registerApplication(item.name, () => SystemJS.import(item.main), item.base ? () => true : pathPrefix(item.path), customProps);
});

start();

// 动态加载微应用的入口entry
// function loadApp(app) {
//   return SystemJS.import(`http://localhost:${config[app].port}/index.js`);
// }

function pathPrefix(prefix) {
  return function(location) {
    return location.pathname.startsWith(`${prefix}`);
  };
}
