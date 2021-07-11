import React from 'react';
import { Switch } from 'react-router-dom';
import NotFoundPage from '../containers/pageNotFound/loadable';
import { renderRoutes } from './routeFuncs';
import { routeArray } from './routeArray';
import PrivateRoute from '../components/hoc/privateRoute';

function Routes() {
  return (
    <>
      <Switch>
        {renderRoutes(routeArray)}
        <PrivateRoute component={NotFoundPage} />
      </Switch>
    </>
  );
}

export default Routes;
