import { Tree } from '@nx/devkit';
import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';

import { fileShouldExists } from '../../utility';

import { backendComponentGenerator } from './generator';
import { BackendComponentGeneratorSchema } from './schema';

describe('backend-component generator', () => {
  let tree: Tree;
  const options: BackendComponentGeneratorSchema = { name: 'accounts' };

  beforeEach(() => {
    tree = createTreeWithEmptyWorkspace();
  });

  it('should run successfully', async () => {
    const componentRoot = `apps/backend/src/${options.name}`;

    await backendComponentGenerator(tree, options);

    fileShouldExists({ tree, filePath: `${componentRoot}/Accounts.spec.ts` });
    fileShouldExists({ tree, filePath: `${componentRoot}/AccountsApi.ts` });
    fileShouldExists({ tree, filePath: `${componentRoot}/AccountsController.ts` });
    fileShouldExists({ tree, filePath: `${componentRoot}/AccountsService.ts` });
  });
});
