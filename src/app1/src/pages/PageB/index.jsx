import React from 'react';
import { Route, Link } from 'react-router-dom';
import RouteWithSubRoutes from '../RouteWithSubRoutes';

export default ({ routes }) => (
  <div>
    this is page B <br />
    <Link to="/pageB/pageC">to page C</Link>
    {routes.map((route, i) => {
      return <RouteWithSubRoutes {...route} key={i} />;
    })}
  </div>
);
