import { addDependenciesToPackageJson, Tree } from '@nx/devkit';
import { applicationGenerator } from '@nx/nest';

import { backendDependencies, backendDevDependencies } from '../dependency/dependencies';

import { BackendAppGeneratorSchema } from './schema';

export async function backendAppGenerator(tree: Tree, options: BackendAppGeneratorSchema) {
  // add dependencies
  addDependenciesToPackageJson(tree, backendDependencies, backendDevDependencies);

  await applicationGenerator(tree, options);
}

export default backendAppGenerator;
