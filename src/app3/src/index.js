import Vue from 'vue';
import singleSpaVue from 'single-spa-vue';
import './App';

if (!process.env.SINGLE_SPA) {
  new Vue({
    el: '#root',
    template: `<root-vue />`,
  });
}

// 参考：https://github.com/CanopyTax/single-spa-examples/tree/master/src/vue
const vueLifecycles = singleSpaVue({
  Vue,
  appOptions: {
    el: '#app3',
    template: `<root-vue id="app3" style="margin-top: 100px;" />`,
  },
});

export const bootstrap = vueLifecycles.bootstrap;

export const mount = vueLifecycles.mount;

export const unmount = function(props) {
  console.debug('Vue app unmount');
  document.querySelector('#app3').remove();
  return vueLifecycles.unmount(props);
};
