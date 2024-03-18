import { Tree } from '@nx/devkit';
import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';

import { fileShouldExists, readNxGeneratedFile } from '../../utility';

import { backendApiGenerator } from './generator';
import { BackendApiGeneratorSchema } from './schema';

describe('backend-api generator', () => {
  let tree: Tree;
  const options: BackendApiGeneratorSchema = { name: 'api' };

  beforeEach(() => {
    tree = createTreeWithEmptyWorkspace();
  });

  test('backendApiGenerator', async () => {
    const projectRoot = `apps/backend`;
    const componentRoot = `${projectRoot}/src/${options.name}`;

    await backendApiGenerator(tree, options);

    const index = readNxGeneratedFile({ tree, filePath: `${projectRoot}/src/index.ts` });
    expect(index).toBeDefined();

    fileShouldExists({ tree, filePath: `${componentRoot}/Api.ts` });
  });
});
