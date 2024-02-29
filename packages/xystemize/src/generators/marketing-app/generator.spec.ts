import { readProjectConfiguration, Tree } from '@nx/devkit';
import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';

import { marketingAppGenerator } from './generator';
import { MarketingAppGeneratorSchema } from './schema';

describe('marketing-app generator', () => {
  let tree: Tree;
  const options: MarketingAppGeneratorSchema = { name: 'test', style: 'css' };

  beforeEach(() => {
    tree = createTreeWithEmptyWorkspace();
  });

  it('should run successfully', async () => {
    await marketingAppGenerator(tree, options);
    const config = readProjectConfiguration(tree, 'test');
    expect(config).toBeDefined();
  });
});
