import { Tree } from '@nx/devkit';
import { applicationGenerator } from '@nx/next';

import { MarketingAppGeneratorSchema } from './schema';

export async function marketingAppGenerator(tree: Tree, options: MarketingAppGeneratorSchema) {
  applicationGenerator(tree, options);
}

export default marketingAppGenerator;
