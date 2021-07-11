/**
 *
 * Asynchronously loads the login Container
 *
 */

import loadable from '../../utils/loadable';

export default loadable(() => import('./index'));
