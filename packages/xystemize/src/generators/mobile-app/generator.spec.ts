import { readProjectConfiguration, Tree } from '@nx/devkit';
import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import { Linter } from '@nx/eslint';

import { mobileAppGenerator } from './generator';
import { MobileAppGeneratorSchema } from './schema';

describe('mobile-app generator', () => {
  let tree: Tree;
  const options: MobileAppGeneratorSchema = {
    name: 'test',
    unitTestRunner: 'jest',
    linter: Linter.EsLint,
    e2eTestRunner: 'none',
    bundler: 'webpack',
    install: false,
  };

  beforeEach(() => {
    tree = createTreeWithEmptyWorkspace();
  });

  it('should run successfully', async () => {
    await mobileAppGenerator(tree, options);
    const config = readProjectConfiguration(tree, 'test');
    expect(config).toBeDefined();
  });
});
