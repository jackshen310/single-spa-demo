import React from 'react';
import show from '../utils/show';
import './index.css';

export default class PageA extends React.Component {
  onClick = () => {
    show(() => 'render page A');
  };
  render() {
    return (
      <div className={'wrapper-d'}>
        this is page A<br />
        <button onClick={this.onClick}>click</button>
      </div>
    );
  }
}
