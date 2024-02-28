import { Tree } from '@nx/devkit';
import { applicationGenerator } from '@nx/next';

import { WebAppGeneratorSchema } from './schema';

export async function webAppGenerator(tree: Tree, options: WebAppGeneratorSchema) {
  applicationGenerator(tree, options);
}

export default webAppGenerator;
