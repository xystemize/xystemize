import { Tree } from '@nx/devkit';
import { applicationGenerator } from '@nx/nest';

import { BackendAppGeneratorSchema } from './schema';

export async function backendAppGenerator(tree: Tree, options: BackendAppGeneratorSchema) {
  applicationGenerator(tree, options);
}

export default backendAppGenerator;
