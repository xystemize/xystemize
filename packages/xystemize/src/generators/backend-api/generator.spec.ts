import { Tree } from '@nx/devkit';
import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';

import { backendApiGenerator } from './generator';
import { BackendApiGeneratorSchema } from './schema';

describe('backend-api generator', () => {
  let tree: Tree;
  const options: BackendApiGeneratorSchema = { name: 'api' };

  beforeEach(() => {
    tree = createTreeWithEmptyWorkspace();
  });

  it('should run successfully', async () => {
    await backendApiGenerator(tree, options);
  });
});
