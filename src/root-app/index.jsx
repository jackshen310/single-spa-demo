import { registerApplication, start } from 'single-spa';

/**
 * 第四个参数为自定义属性 https://single-spa.js.org/docs/building-applications.html
 share a common access token with all child apps
 pass down some initialization information, like the rendering target
 pass a reference to a common event bus so each app may talk to each other
 */
// 导航页
registerApplication(
  'navbar',
  () => import('../navbar/index.js'),
  () => {
    return () => true; // 导航页，永远显示
  }
);
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
