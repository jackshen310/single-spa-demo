import { registerApplication, start } from 'single-spa';
import config from './config/dev';
import '../navbar/src/index.css'; // FIXME 这个样式放到navbar项目不生效，故先临时放在这里
import * as singleSpa from 'single-spa';
import MsgCenter from './MsgCenter';

window.SystemJS = window.System;
window.singleSpa = singleSpa;
/**
 * 第四个参数为自定义属性 https://single-spa.js.org/docs/building-applications.html
 share a common access token with all child apps
 pass down some initialization information, like the rendering target
 pass a reference to a common event bus so each app may talk to each other
 */
// 导航页
// registerApplication(
//   'navbar',
//   () => loadApp('navbar'),
//   () => {
//     return () => true; // 导航页，永远显示
//   }
// );
// registerApplication('app-1', () => loadApp('app1'), pathPrefix('/app1'), {
//   appInfo: 'react app',
// });
// registerApplication('app-2', () => loadApp('app2'), pathPrefix('/app2'), {
//   appInfo: 'angular app',
// });
// registerApplication('app-3', () => loadApp('app3'), pathPrefix('/app3'), {
//   appInfo: 'vue app',
// });
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
