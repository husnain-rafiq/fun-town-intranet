import loadable from 'utils/loadable';
import React from 'react';
import Loading from 'components/layout/loading';

export default loadable(() => import('./index'), {
  fallback: <Loading />,
});
