import Vue from 'vue';
import singleSpaVue from 'single-spa-vue';
import './App';

console.log('abc', process.env.SINGLE_SPA);
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
    template: `<root-vue id="app3"/>`,
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
