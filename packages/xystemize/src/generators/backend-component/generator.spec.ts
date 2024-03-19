import { Tree } from '@nx/devkit';
import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import { isCharExistsInString } from '@xystemize/app-core';

import { fileShouldExists, readNxGeneratedFile } from '../../utility';

import { backendComponentGenerator } from './generator';
import { BackendComponentGeneratorSchema } from './schema';

describe('backend-component generator', () => {
  let tree: Tree;
  const options: BackendComponentGeneratorSchema = { name: 'accounts' };

  beforeEach(() => {
    tree = createTreeWithEmptyWorkspace();
  });

  test('backendComponentGenerator', async () => {
    const projectRoot = `apps/backend`;
    const componentRoot = `${projectRoot}/src/${options.name}`;

    await backendComponentGenerator(tree, options);

    fileShouldExists({ tree, filePath: `${componentRoot}/Accounts.spec.ts` });
    fileShouldExists({ tree, filePath: `${componentRoot}/AccountsApi.ts` });
    fileShouldExists({ tree, filePath: `${componentRoot}/AccountsController.ts` });
    fileShouldExists({ tree, filePath: `${componentRoot}/AccountsService.ts` });

    const accountController = readNxGeneratedFile({ tree, filePath: `${componentRoot}/AccountsController.ts` });
    expect(isCharExistsInString({ char: `import { Name } from '@proj/app-core';`, string: accountController }));
  });
});
