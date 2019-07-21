import React from 'react';
import ReactDOM from 'react-dom';
import singleSpaReact from 'single-spa-react';
import Root from './App';
import { unloadApplication } from 'single-spa';

const reactLifecycles = singleSpaReact({
  React,
  ReactDOM,
  rootComponent: Root,
  domElementGetter,
});

// This lifecycle function will be called once, right before the registered application is mounted for the first time.
export function bootstrap(props) {
  console.debug('react app bootstrap', props);
  return reactLifecycles.bootstrap(props);
}

export function mount(props) {
  console.debug('react app mount', props);
  return reactLifecycles.mount(props);
}

export function unmount(props) {
  console.debug('react app unmount', props);
  unloadApplication('app-1'); // 卸载react app,会触发unload生命周期
  return reactLifecycles.unmount(props);
}

export function unload(props) {
  return Promise.resolve().then(() => {
    // Hot-reloading implementation goes here
    console.log('react app unloaded!');
  });
}

function domElementGetter() {
  // Make sure there is a div for us to render into
  let el = document.getElementById('app1');
  if (!el) {
    el = document.createElement('div');
    el.id = 'app1';
    document.body.appendChild(el);
  }

  return el;
}
