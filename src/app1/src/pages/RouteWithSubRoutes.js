import React from 'react';
import { Route } from 'react-router-dom';

export default route => {
  return (
    <Route
      path={route.path}
      render={props => {
        return <route.component {...props} routes={route.routes} />;
      }}
    />
  );
};
