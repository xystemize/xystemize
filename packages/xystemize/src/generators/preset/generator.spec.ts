import { readProjectConfiguration, Tree } from '@nx/devkit';
import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import { readNxGeneratedJsonFile } from '@xystemize/utility';

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

  test('presetGenerator()', async () => {
    await presetGenerator(tree, options);

    const backend = readProjectConfiguration(tree, 'backend');
    expect(backend).toBeDefined();

    const mobile = readProjectConfiguration(tree, 'mobile');
    expect(mobile).toBeDefined();

    const marketing = readProjectConfiguration(tree, 'marketing');
    expect(marketing).toBeDefined();

    const web = readProjectConfiguration(tree, 'web');
    expect(web).toBeDefined();

    const packageJson = readNxGeneratedJsonFile({ tree, filePath: 'package.json' });
    expect(packageJson.scripts).toBeDefined();

    const prettier = readNxGeneratedJsonFile({ tree, filePath: '.prettierrc' });
    expect(prettier).toStrictEqual({
      singleQuote: true,
      printWidth: 120,
      tabWidth: 2,
    });
  });
});
