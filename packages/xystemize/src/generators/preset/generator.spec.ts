import { readProjectConfiguration, Tree } from '@nx/devkit';
import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import { isCharExistsInString } from '@xystemize/app-core';

import {
  checkIfDependenciesExist,
  fileShouldExists,
  fileShouldNotExists,
  readNxGeneratedFile,
  readNxGeneratedJsonFile,
} from '../../utility/GeneratorUtility';
import { allDependencies, allDevDependencies } from '../dependency/dependencies';

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

    expect(packageJson.orgName).toBe('@proj');
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

    const appCoreRoot = 'libs/app-core';
    const appCorePackageJson = readNxGeneratedJsonFile({ tree, filePath: `${appCoreRoot}/package.json` });
    expect(appCorePackageJson.name).toBe('@proj/app-core');

    const appCoreProjectJson = readNxGeneratedJsonFile({ tree, filePath: `${appCoreRoot}/project.json` });
    expect(appCoreProjectJson.name).toBe('app-core');

    fileShouldExists({ tree, filePath: `${appCoreRoot}/src/index.ts` });
    fileShouldExists({ tree, filePath: `${appCoreRoot}/src/constants/Name.ts` });
    fileShouldExists({ tree, filePath: `${appCoreRoot}/src/string/@GeneralString.ts` });
    fileShouldExists({ tree, filePath: `${appCoreRoot}/src/string/ErrorString.ts` });

    fileShouldNotExists({ tree, filePath: `${appCoreRoot}/src/lib/AppCore.spec.ts` });
    fileShouldNotExists({ tree, filePath: `${appCoreRoot}/src/lib/AppCore.ts` });

    const name = readNxGeneratedFile({ tree, filePath: `${appCoreRoot}/src/constants/Name.ts` });
    expect(isCharExistsInString({ char: `accounts = 'accounts',`, string: name })).toBeTruthy();
  });
});
