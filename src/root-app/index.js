import { registerApplication, start } from 'single-spa';
import devConfig from './config/dev';
import prodConfig from './config/prod';
import '../navbar/src/index.css'; // FIXME 这个样式放到navbar项目不生效，故先临时放在这里
import * as singleSpa from 'single-spa';
import MsgCenter from './MsgCenter';
import singleSpaLeakedGlobals from 'single-spa-leaked-globals';

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
  registerApp(item);
});

start();

window.stores = [];
async function registerApp(item) {
  // 将全局globalMsgCenter对象注入到每一个single-spa应用
  const customProps = {
    globalMsgCenter: globalMsgCenter,
  };

  if (item.store) {
    // 在这里,我们会用SystemJS来导入模块的对外输出的Store(后续会被称作模块对外API),统一挂载到消息总线上
    try {
      const Store = await SystemJS.import(item.store);
      customProps.store = new Store();
      // TODO 临时将store存放到window对象，这样navbar应用就可以获取到所有微应用信息
      window.stores.push(customProps.store);
    } catch (e) {
      console.log(`Could not load store of app ${item.name}.`, e);
      //如果失败则不注册该模块
      return;
    }
  }

  registerApplication(
    item.name,
    async () => {
      const { bootstrap: bootstrap, mount, unmount, globalVariableNames } = await SystemJS.import(item.main);

      const leakedGlobalsLifecycles = singleSpaLeakedGlobals({
        globalVariableNames: globalVariableNames || [],
      });

      return {
        bootstrap: [leakedGlobalsLifecycles.bootstrap, bootstrap],
        mount: [
          // Make sure leaked globals lifecycles' mount function is **before** other lifecycles' mount
          // This is so the global vars are available when the framework mounts
          leakedGlobalsLifecycles.mount,
          ...toArray(mount),
        ],
        unmount: [
          ...toArray(unmount),
          // Make sure leaked globals lifecycles' unmount function is **after** other lifecycles' unmount
          // This is so the global vars are still available during the framework unmount lifecycle function.
          leakedGlobalsLifecycles.unmount,
        ],
      };
    },
    item.base ? () => true : pathPrefix(item.path),
    customProps
  );
}
function toArray(args) {
  return Array.isArray(args) ? args : [args];
}
// 动态加载微应用的入口entry
// function loadApp(app) {
//   return SystemJS.import(`http://localhost:${config[app].port}/index.js`);
// }

function pathPrefix(prefix) {
  return function(location) {
    return location.pathname.startsWith(`${prefix}`);
  };
}
