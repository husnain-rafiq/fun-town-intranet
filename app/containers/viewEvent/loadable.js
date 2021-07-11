/**
 *
 * Asynchronously loads the View Events
 *
 */
import React from 'react';
import Loading from 'components/layout/loading';
import loadable from '../../utils/loadable';

export default loadable(() => import('./index'), {
  fallback: <Loading />,
});
