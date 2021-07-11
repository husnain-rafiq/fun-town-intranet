import React from 'react';
import { Route, useLocation } from 'react-router-dom';
import PrivateRoute from '../components/hoc/privateRoute';
import Home from '../containers/home/loadable';
import { ROLES } from '../utils/constants';
import { routeArray } from './routeArray';

const routeTypes = { public: 'public', private: 'private' };
export const renderRoutes = (_routeArray, parentPath = '') =>
  _routeArray &&
  _routeArray.map((route) => {
    const path = parentPath + route.path;
    return [
      route.routeType === routeTypes.public ? (
        <Route
          exact={route.exact || true}
          path={path || '/'}
          component={route.component || Home}
          roles={route.roles || [ROLES.ADMIN, ROLES.USER]}
        />
      ) : (
        <PrivateRoute
          exact={route.exact || true}
          path={path || '/'}
          component={route.component || Home}
          roles={route.roles || [ROLES.ADMIN, ROLES.USER]}
        />
      ),
      route.nestedRoutes && renderRoutes(route.nestedRoutes, path),
    ];
  });

export const filterRouteArrayByKey = (allRouteArray, key) =>
  allRouteArray.filter((val) => {
    const result = val.simplifiedPath
      ? val.simplifiedPath === key
      : val.path.substring(1) === key;

    return result;
  });
export const returnNoOfEntriesToSkip = (
  parentRouteName,
  currentPathNameEntry = null
) => {
  // eslint-disable-next-line
  const location = useLocation();
  const parentObj = filterRouteArrayByKey(routeArray, parentRouteName);
  if (currentPathNameEntry && parentObj[0] && parentObj[0].nestedRoutes) {
    const childObj = filterRouteArrayByKey(
      parentObj[0].nestedRoutes,
      currentPathNameEntry
    );
    const secondLvlNestedRoute = ['useful-links'];
    if (
      parentObj &&
      parentObj[0]?.nestedRoutes &&
      parentObj[0]?.nestedRoutes[2]?.nestedRoutes?.length > 0 &&
      location.pathname.includes(secondLvlNestedRoute)
    ) {
      return 1;
    }
    return childObj.length > 0 && childObj[0].noOfEnteriesToSkipAfterThisEntry
      ? childObj[0].noOfEnteriesToSkipAfterThisEntry
      : 0;
  }
  return parentObj.length > 0 && parentObj[0].noOfEnteriesToSkipAfterThisEntry
    ? parentObj[0].noOfEnteriesToSkipAfterThisEntry
    : 0;
};
export const returnBreadCrumbKey = (
  parentRouteName,
  currentPathNameEntry = null
) => {
  // eslint-disable-next-line
  const location = useLocation();
  const parentObj = filterRouteArrayByKey(routeArray, parentRouteName);
  if (currentPathNameEntry && parentObj[0] && parentObj[0].nestedRoutes) {
    const childObj = filterRouteArrayByKey(
      parentObj[0].nestedRoutes,
      currentPathNameEntry
    );
    const thirdLvlNestedRoute = ['add', 'edit'];
    // if you're implemented 3 level nesting don't forget to include 2nd level path name here it'll discriminate the effect of 3rd level nesting at 1st level
    const secondLvlNestedRoute = ['useful-links'];
    if (
      thirdLvlNestedRoute.includes(currentPathNameEntry) &&
      parentObj &&
      parentObj[0]?.nestedRoutes &&
      parentObj[0]?.nestedRoutes[2]?.nestedRoutes?.length > 0 &&
      location.pathname.includes(secondLvlNestedRoute)
    ) {
      return currentPathNameEntry;
    }
    return childObj.length > 0
      ? childObj[0] && childObj[0].breadCrumbKey
      : currentPathNameEntry;
  }
  return parentObj.length > 0 && parentObj[0].breadCrumbKey
    ? parentObj[0].breadCrumbKey
    : parentRouteName;
};
