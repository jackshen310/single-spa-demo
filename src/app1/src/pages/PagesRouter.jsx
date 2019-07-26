import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import routes from './routes';
import RouteWithSubRoutes from './RouteWithSubRoutes';

class PagesRouter extends React.Component {
  fallback = () => {
    return <div>Loading...</div>;
  };
  render() {
    return (
      <Suspense fallback={this.fallback()}>
        {routes.map((route, i) => {
          return <RouteWithSubRoutes {...route} key={i} />;
        })}
      </Suspense>
    );
  }
}
export default PagesRouter;
