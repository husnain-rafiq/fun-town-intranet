/**
 *
 * Asynchronously loads the useful links page
 *
 */
import React from 'react';
import Loading from 'components/layout/loading';
import loadable from '../../utils/loadable';

export default loadable(() => import('./index'), {
  fallback: <Loading />,
});
