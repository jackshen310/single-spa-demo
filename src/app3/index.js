import Vue from 'vue';
import singleSpaVue from 'single-spa-vue';

// 参考：https://github.com/CanopyTax/single-spa-examples/tree/master/src/vue
const vueLifecycles = singleSpaVue({
  Vue,
  appOptions: {
    el: '#app3',
    data: {
      message: 'Hello Vue.js!',
    },
    template: `<div style="margin-top: 100px;" id="app3">{{message}}</div>`,
  },
});

export const bootstrap = vueLifecycles.bootstrap;

export const mount = vueLifecycles.mount;

export const unmount = vueLifecycles.unmount;
