import 'zone.js';
import 'reflect-metadata';
import singleSpaAngular from 'single-spa-angular';
import { ApplicationRef, NgZone } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import mainModule from './main-module';
import { Router } from '@angular/router';

console.log('----------------', process.env.SINGLE_SPA);
if (!process.env.SINGLE_SPA) {
  platformBrowserDynamic().bootstrapModule(mainModule);
}

const ngLifecycles = singleSpaAngular({
  domElementGetter,
  //mainModule,
  angularPlatform: platformBrowserDynamic(),
  template: `<app2 />`,
  Router,
  ApplicationRef,
  bootstrapFunction: singleSpaProps => {
    return platformBrowserDynamic().bootstrapModule(mainModule);
  },
  NgZone,
});

export function bootstrap(props) {
  return ngLifecycles.bootstrap(props);
}

export function mount(props) {
  return ngLifecycles.mount(props).then(val => {});
}

export function unmount(props) {
  return ngLifecycles.unmount(props);
}

function domElementGetter() {
  // Make sure there is a div for us to render into
  let el = document.getElementById('app2');
  if (!el) {
    el = document.createElement('div');
    el.id = 'app2';
    document.querySelector('.ant-layout-content').appendChild(el);
  }

  return el;
}
