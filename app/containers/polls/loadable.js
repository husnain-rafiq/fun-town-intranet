/**
 *
 * Asynchronously loads the component for Polls
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
