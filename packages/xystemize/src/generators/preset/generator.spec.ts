import { readProjectConfiguration, Tree } from '@nx/devkit';
import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';

import { checkIfDependenciesExist, readNxGeneratedFile, readNxGeneratedJsonFile } from '../../utility/GeneratorUtility';

import { allDependencies, allDevDependencies } from './dependencies';
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
    const scripts = packageJson.scripts;

    expect(packageJson.scripts).toBeDefined();
    expect(packageJson['lint-staged']).toBeDefined();
    expect(scripts.prepare).toBeDefined();

    checkIfDependenciesExist({
      tree,
      filePath: 'package.json',
      dependencies: allDependencies,
      devDependencies: allDevDependencies,
    });

    const prettier = readNxGeneratedJsonFile({ tree, filePath: '.prettierrc' });
    expect(prettier).toStrictEqual({
      singleQuote: true,
      printWidth: 120,
      tabWidth: 2,
    });

    const nvmrc = readNxGeneratedFile({ tree, filePath: '.nvmrc' });
    expect(nvmrc).toBe('v20.11.1');

    const jestPreset = readNxGeneratedFile({ tree, filePath: 'jest.preset.js' });
    expect(jestPreset).toBeDefined();

    const eslintBase = readNxGeneratedJsonFile({ tree, filePath: '.eslintrc.base.json' });
    const eslint = readNxGeneratedJsonFile({ tree, filePath: '.eslintrc.json' });
    expect(eslintBase).toBeDefined();
    expect(eslint.extends).toStrictEqual(['./.eslintrc.base.json']);
    expect(eslint.plugins).toStrictEqual(['@nx', 'unused-imports', 'simple-import-sort']);
  });
});
