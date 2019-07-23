import React from 'react';
require('./index.css');

class App extends React.Component {
  handleRoute = path => {
    singleSpaNavigate && singleSpaNavigate(path);
  };
  componentDidCatch(e) {
    console.error(e);
  }
  render() {
    return (
      <ul className="navbar">
        <a onClick={this.handleRoute.bind(this, '/app1')}>
          <li>App 1</li>
        </a>
        <a onClick={this.handleRoute.bind(this, '/app2')}>
          <li>App 2</li>
        </a>
        <a onClick={this.handleRoute.bind(this, '/app3')}>
          <li>App 3</li>
        </a>
      </ul>
    );
  }
}

export default App;
