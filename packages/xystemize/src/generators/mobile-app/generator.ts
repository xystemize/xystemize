import { addDependenciesToPackageJson, Tree } from '@nx/devkit';
import { reactNativeApplicationGenerator } from '@nx/react-native';

import { mobileDependencies, mobileDevDependencies } from '../dependency/dependencies';

import { MobileAppGeneratorSchema } from './schema';

export async function mobileAppGenerator(tree: Tree, options: MobileAppGeneratorSchema) {
  // add dependencies
  addDependenciesToPackageJson(tree, mobileDependencies, mobileDevDependencies);

  await reactNativeApplicationGenerator(tree, options);
}

export default mobileAppGenerator;
