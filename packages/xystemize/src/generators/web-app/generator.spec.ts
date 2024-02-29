import { readProjectConfiguration, Tree } from '@nx/devkit';
import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';

import { webAppGenerator } from './generator';
import { WebAppGeneratorSchema } from './schema';

describe('web-app generator', () => {
  let tree: Tree;
  const options: WebAppGeneratorSchema = { name: 'test', directory: 'apps', style: 'css' };

  beforeEach(() => {
    tree = createTreeWithEmptyWorkspace();
  });

  it('should run successfully', async () => {
    await webAppGenerator(tree, options);

    const config = readProjectConfiguration(tree, 'test');
    expect(config).toBeDefined();
  });
});
