import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
require('./index.css');

class App extends React.Component {
  componentDidCatch(error, info) {
    console.error(error, info);
  }
  render() {
    return (
      <ul className="navbar">
        <Router>
          <Link href="/app1" to="/app1">
            <li>App 1</li>
          </Link>
          <Link href="/app2" to="/app2">
            <li>App 2</li>
          </Link>
          <Link href="/app3" to="/app3">
            <li>App 3</li>
          </Link>
        </Router>
      </ul>
    );
  }
}

export default App;
