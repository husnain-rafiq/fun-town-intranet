/**
 *
 * Asynchronously loads the component for PageNotFound
 *
 */

import loadable from '../../utils/loadable';

export default loadable(() => import('./index'));
