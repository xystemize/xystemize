import { Tree } from '@nx/devkit';
import { reactNativeApplicationGenerator } from '@nx/react-native';

import { MobileAppGeneratorSchema } from './schema';

export async function mobileAppGenerator(tree: Tree, options: MobileAppGeneratorSchema) {
  // const projectRoot = `libs/${options.name}`;
  // addProjectConfiguration(tree, options.name, {
  //   root: projectRoot,
  //   projectType: 'library',
  //   sourceRoot: `${projectRoot}/src`,
  //   targets: {},
  // });
  // generateFiles(tree, path.join(__dirname, 'files'), projectRoot, options);
  // await formatFiles(tree);
  reactNativeApplicationGenerator(tree, options);
}

export default mobileAppGenerator;
