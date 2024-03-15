import { readProjectConfiguration, Tree } from '@nx/devkit';
import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';

import { readNxGeneratedJsonFile } from '../../utility';

import { backendAppGenerator } from './generator';
import { BackendAppGeneratorSchema } from './schema';

describe('backend-app generator', () => {
  let tree: Tree;
  const options: BackendAppGeneratorSchema = { name: 'test' };

  beforeEach(() => {
    tree = createTreeWithEmptyWorkspace();
  });

  test('backendAppGenerator', async () => {
    await backendAppGenerator(tree, options);
    const config = readProjectConfiguration(tree, 'test');
    expect(config).toBeDefined();

    const projectJson = readNxGeneratedJsonFile({ tree, filePath: `apps/${options.name}/project.json` });
    expect(projectJson.targets.build.options.generatePackageJson).toBe(true);
    expect(projectJson.targets.killports).toBeDefined();
    expect(projectJson.targets.deploy).toBeDefined();
  });
});
