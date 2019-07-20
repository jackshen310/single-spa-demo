import React from 'react';
import show from './show';
import style from './d.css';

export default class D extends React.Component {
  onClick = () => {
    show(() => 'render D..');
  };
  render() {
    return (
      <div className={'wrapper-d'}>
        this is D...
        <button onClick={this.onClick}>click</button>
      </div>
    );
  }
}
