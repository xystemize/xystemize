import { readProjectConfiguration, Tree } from '@nx/devkit';
import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';

import { presetGenerator } from './generator';
import { PresetGeneratorSchema } from './schema';

describe('preset generator', () => {
  let tree: Tree;
  const options: PresetGeneratorSchema = {
    name: 'test',
    includeBackend: true,
    includeMarketing: true,
    includeMobile: true,
    includeWeb: true,
  };

  beforeEach(() => {
    tree = createTreeWithEmptyWorkspace();
  });

  it('should run successfully', async () => {
    await presetGenerator(tree, options);
    const config = readProjectConfiguration(tree, 'test');
    expect(config).toBeDefined();
  });
});
