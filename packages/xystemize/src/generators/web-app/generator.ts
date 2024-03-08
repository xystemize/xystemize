import { addDependenciesToPackageJson, Tree } from '@nx/devkit';
import { applicationGenerator } from '@nx/next';

import { webDependencies, webDevDependencies } from '../dependency/dependencies';

import { WebAppGeneratorSchema } from './schema';

export async function webAppGenerator(tree: Tree, options: WebAppGeneratorSchema) {
  // add dependencies
  addDependenciesToPackageJson(tree, webDependencies, webDevDependencies);

  await applicationGenerator(tree, options);
}

export default webAppGenerator;
