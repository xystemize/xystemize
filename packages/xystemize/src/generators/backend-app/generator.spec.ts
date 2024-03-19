import { readProjectConfiguration, Tree } from '@nx/devkit';
import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import { isCharExistsInString } from '@xystemize/app-core';

import { fileShouldExists, fileShouldNotExists, readNxGeneratedFile, readNxGeneratedJsonFile } from '../../utility';

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

    const projectRoot = `apps/${options.name}`;

    const projectJson = readNxGeneratedJsonFile({ tree, filePath: `${projectRoot}/project.json` });
    expect(projectJson.targets.build.options.generatePackageJson).toBe(true);
    expect(projectJson.targets.build.options.main).toBe(`${projectRoot}/src/index.ts`);
    expect(projectJson.targets.build.options.assets).toStrictEqual([`${projectRoot}/src/@assets`]);

    expect(projectJson.targets.killports).toBeDefined();
    expect(projectJson.targets.deploy).toBeDefined();

    const index = readNxGeneratedFile({ tree, filePath: `${projectRoot}/src/index.ts` });
    expect(index).toBeDefined();
    expect(isCharExistsInString({ char: `import { ApiV1 } from './@api-v1/ApiV1';`, string: index })).toBeTruthy();
    expect(
      isCharExistsInString({ char: 'export const apiv1 = regularFunction.onRequest(ApiV1);', string: index })
    ).toBeTruthy();

    const apiv1 = readNxGeneratedFile({ tree, filePath: `${projectRoot}/src/@api-v1/ApiV1.ts` });
    expect(apiv1).toBeDefined();
    expect(
      isCharExistsInString({ char: `import { AccountsModule } from '../accounts/AccountsApi';`, string: apiv1 })
    ).toBeTruthy();
    expect(isCharExistsInString({ char: `imports: [AccountsModule],`, string: apiv1 })).toBeTruthy();

    const gitkeepInRenamedAssetsFolder = readNxGeneratedFile({ tree, filePath: `${projectRoot}/src/@assets/.gitkeep` });
    expect(gitkeepInRenamedAssetsFolder).toBe('');

    fileShouldExists({ tree, filePath: `.firebaserc` });
    fileShouldExists({ tree, filePath: `firebase.json` });
    fileShouldExists({ tree, filePath: `firestore.indexes.json` });
    fileShouldExists({ tree, filePath: `firestore.rules` });
    fileShouldExists({ tree, filePath: `storage.rules` });

    fileShouldNotExists({ tree, filePath: `${projectRoot}/src/assets/.gitkeep` });
    fileShouldNotExists({ tree, filePath: `${projectRoot}/src/main.ts` });
    fileShouldNotExists({ tree, filePath: `${projectRoot}/src/app/app.module.ts` });
  });
});
