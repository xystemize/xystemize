import { Tree } from '@nx/devkit';
import { reactNativeApplicationGenerator } from '@nx/react-native';

import { MobileAppGeneratorSchema } from './schema';

export async function mobileAppGenerator(tree: Tree, options: MobileAppGeneratorSchema) {
  reactNativeApplicationGenerator(tree, options);
}

export default mobileAppGenerator;
