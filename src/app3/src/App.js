import Vue from 'vue';

Vue.component('root-vue', {
  template: `<div>{{message}}</div>`,
  data: () => {
    return {
      message: 'Hello Vue.js!',
    };
  },
});
