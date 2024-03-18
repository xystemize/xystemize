import { names, readProjectConfiguration, Tree } from '@nx/devkit';
import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';

import { readNxGeneratedJsonFile } from '../../utility/GeneratorUtility';

import { jsLibGenerator } from './generator';
import { JsLibGeneratorSchema } from './schema';

describe('js-lib generator', () => {
  let tree: Tree;
  const options: JsLibGeneratorSchema = {
    name: 'TestTest',
    compiler: 'tsc',
  };

  beforeEach(() => {
    tree = createTreeWithEmptyWorkspace();
  });

  test('jsLibGenerator()', async () => {
    const libName = names(options.name).fileName;
    const libRoot = `libs/${libName}`;

    await jsLibGenerator(tree, options);

    const config = readProjectConfiguration(tree, libName);
    expect(config).toBeDefined();

    const packageJson = readNxGeneratedJsonFile({ tree, filePath: `${libRoot}/package.json` });
    expect(packageJson.publishConfig).toStrictEqual({ access: 'public' });

    const projectJson = readNxGeneratedJsonFile({ tree, filePath: `${libRoot}/project.json` });
    expect(projectJson.release).toStrictEqual({
      executor: 'nx-release:build-update-publish',
      options: {
        libName: 'app-core',
      },
    });
  });
});
