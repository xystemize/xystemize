import { names, readProjectConfiguration, Tree } from '@nx/devkit';
import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import { execAsync, readNxGeneratedJsonFile } from '@xystemize/utility';

import { jsLibGenerator } from './generator';
import { JsLibGeneratorSchema } from './schema';

describe('js-lib generator', () => {
  let tree: Tree;
  const options: JsLibGeneratorSchema = { name: 'TestTest' };

  beforeEach(() => {
    tree = createTreeWithEmptyWorkspace();
  });

  test('jsLibGenerator()', async () => {
    await jsLibGenerator(tree, options);

    const libName = names(options.name).fileName;
    const config = readProjectConfiguration(tree, libName);
    expect(config).toBeDefined();

    const packageJson = readNxGeneratedJsonFile({ tree, filePath: `${libName}/package.json` });
    expect(packageJson.publishConfig).toStrictEqual({ access: 'public' });

    const projectJson = readNxGeneratedJsonFile({ tree, filePath: `${libName}/project.json` });
    expect(projectJson.release).toStrictEqual({
      executor: 'nx-release:build-update-publish',
      options: {
        libName: 'app-core',
      },
    });
  });

  test('jsLibGenerator-e2e', async () => {
    await execAsync('npx nx generate xystemize:js-lib --name=testlib --no-interactive --dry-run');
  });
});
