import Vue from 'vue';
import singleSpaVue from 'single-spa-vue';
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
const vueLifecycles = singleSpaVue({
  Vue,
  appOptions: {
    router,
    template: `<router-view base="/app3" mode="history"></router-view>`,
  },
});

export const bootstrap = vueLifecycles.bootstrap;

export const mount = function(props) {
  props.domElement = domElementGetter();
  return vueLifecycles.mount(props);
};

export const unmount = function(props) {
  console.debug('Vue app unmount');
  document.querySelector('#app3').remove();
  return vueLifecycles.unmount(props);
};

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
