/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
import { registerTsConfigPaths } from '@nx/js/src/internal';
const cleanupRegisteredPaths = registerTsConfigPaths('tsconfig.base.json');

import { initializeBackendServices } from './TestUtil';

require('dotenv-flow').config({ silent: true });

export default initializeBackendServices;

cleanupRegisteredPaths();
