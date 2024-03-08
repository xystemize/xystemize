import { addDependenciesToPackageJson, Tree } from '@nx/devkit';
import { applicationGenerator } from '@nx/nest';

import { backedDevDependencies, backendDependencies } from '../preset/dependencies';

import { BackendAppGeneratorSchema } from './schema';

export async function backendAppGenerator(tree: Tree, options: BackendAppGeneratorSchema) {
  // add dependencies
  addDependenciesToPackageJson(tree, backendDependencies, backedDevDependencies);

  await applicationGenerator(tree, options);
}

export default backendAppGenerator;
