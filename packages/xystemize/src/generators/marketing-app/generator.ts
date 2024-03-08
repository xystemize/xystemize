import { addDependenciesToPackageJson, Tree } from '@nx/devkit';
import { applicationGenerator } from '@nx/next';

import { webDependencies, webDevDependencies } from '../preset/dependencies';

import { MarketingAppGeneratorSchema } from './schema';

export async function marketingAppGenerator(tree: Tree, options: MarketingAppGeneratorSchema) {
  // add dependencies
  addDependenciesToPackageJson(tree, webDependencies, webDevDependencies);

  await applicationGenerator(tree, options);
}

export default marketingAppGenerator;
