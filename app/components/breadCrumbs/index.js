import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Breadcrumbs } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { BodyTextLarge } from '../typography';
import {
  returnBreadCrumbKey,
  returnNoOfEntriesToSkip,
  filterRouteArrayByKey,
} from '../../routes/routeFuncs';
import { routeArray } from '../../routes/routeArray';

function toTitleCase(str) {
  return str.replace(
    /\b\w+/g,
    (s) => s.charAt(0).toUpperCase() + s.substr(1).toLowerCase()
  );
}

const useStyles = makeStyles(() => ({
  linkStyle: {
    textDecoration: 'none',
  },
}));

function BreadCrumbs() {
  const location = useLocation();
  const classes = useStyles();
  const pathnames = location.pathname.split('/').filter((x) => x);

  // input ['directory','edit','5']
  // output ['directory','edit']
  const removeUselessEntriesFromPathnames = (_pathnames) => {
    const result = [..._pathnames];
    const paths = _pathnames;
    for (let i = 0; i < paths.length; i += 1) {
      if (i === 0) {
        result.splice(
          i + 1 < paths.length ? i + 1 : i,
          returnNoOfEntriesToSkip(paths[0])
        );
      } else {
        result.splice(
          i + 1 < paths.length ? i + 1 : i,
          returnNoOfEntriesToSkip(paths[0], paths[i])
        );
      }
    }
    return result;
  };

  // input ['useful-links','motivational-quote']
  // output ['Useful Links', 'Quote']
  const fetchBreadCrumbNames = (_pathnames) => {
    const parent = _pathnames[0];
    const breadCrumbArray = [];
    const paths = _pathnames;
    paths.map((val, index) => {
      if (index === 0) {
        return breadCrumbArray.push(returnBreadCrumbKey(parent));
      }
      return breadCrumbArray.push(returnBreadCrumbKey(parent, val));
    });
    return breadCrumbArray;
  };

  const data = fetchBreadCrumbNames(
    removeUselessEntriesFromPathnames(pathnames) || pathnames
  );

  const lastIndex = data.length - 1;

  return (
    <Breadcrumbs aria-label="Breadcrumb">
      <Link className={classes.linkStyle} to="/">
        <BodyTextLarge component="span" color="secondary">
          Home
        </BodyTextLarge>
      </Link>

      {data.map((value, index) => {
        const last = index === lastIndex;
        const currentRoute =
          filterRouteArrayByKey(routeArray, pathnames[0]) || [];
        let sliceCount = 1;
        if (
          currentRoute.length > 0 &&
          currentRoute[0]?.nestedRoutes &&
          currentRoute[0]?.nestedRoutes[2]?.nestedRoutes
        ) {
          sliceCount =
            currentRoute[0]?.nestedRoutes[2]?.nestedRoutes[0]
              ?.thirdLvlNesting && index !== 0
              ? 2
              : 1;
        }
        const to = `/${pathnames.slice(0, index + sliceCount).join('/')}`;
        let result = <> </>;
        if (last) {
          result = (
            <BodyTextLarge component="span" color="primary">
              {toTitleCase(value)}
            </BodyTextLarge>
          );
        } else {
          result = (
            <Link
              color="inherit"
              to={to}
              key={to}
              className={classes.linkStyle}
            >
              <BodyTextLarge component="span" color="secondary">
                {toTitleCase(value)}
              </BodyTextLarge>
            </Link>
          );
        }

        return result;
      })}
    </Breadcrumbs>
  );
}

export default BreadCrumbs;
