/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
import { registerTsProject } from '@nx/js/src/internal';
const cleanupRegisteredPaths = registerTsProject('.', 'tsconfig.base.json');

import { initializeBackendServices } from './TestUtil';

require('dotenv-flow').config({ silent: true });

export default initializeBackendServices;

cleanupRegisteredPaths();
