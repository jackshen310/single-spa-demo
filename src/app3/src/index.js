import Vue from 'vue';
import Antd from 'ant-design-vue';
import Main from './Main';
import router from './pages/routers';
import Router from 'vue-router';

import 'ant-design-vue/dist/antd.css'; // TODO 后续改为按需导入
Vue.config.productionTip = false;
Vue.use(Antd);
Vue.use(Router);

if (!process.env.SINGLE_SPA) {
  const app3 = new Vue({
    el: '#root',
    router,
    components: { Main },
    template: '<Main/>',
  });
  window.app3 = app3;
}

// 参考：https://github.com/CanopyTax/single-spa-examples/tree/master/src/vue
// const vueLifecycles = singleSpaVue({
//   Vue,
//   appOptions: {
//     router,
//     template: `<router-view base="/app3" mode="history"></router-view>`,
//   },
// });

// 定义全局变量，确保应用隔离
export const globalVariableNames = ['_'];

let instance = null;
export async function bootstrap() {
  console.log('react app bootstraped');
}

export async function mount(props) {
  console.log('props from main framework', props);
  instance = new Vue({
    el: domElementGetter(),
    router,
    template: `<router-view base="/app3" mode="history"></router-view>`,
  });
}

export async function unmount() {
  instance.$destroy();
  instance = null;
}

function domElementGetter() {
  // Make sure there is a div for us to render into
  let el = document.getElementById('app3');
  if (!el) {
    el = document.createElement('div');
    el.id = 'app3';
    document.querySelector('.ant-layout-content').appendChild(el);
  }

  return el;
}
