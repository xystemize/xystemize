import { addDependenciesToPackageJson, Tree } from '@nx/devkit';

import { appendNxGeneratedJsonFile } from '../../../utility';
import { generalDependencies, generalDevDependencies } from '../../dependency/dependencies';

export const setUpDependencies = async ({ tree, orgName }: { tree: Tree; orgName: string }) => {
  // add dependencies
  addDependenciesToPackageJson(tree, generalDependencies, generalDevDependencies);

  // add script
  appendNxGeneratedJsonFile({
    tree,
    filePath: 'package.json',
    fileContent: {
      orgName: orgName,
      scripts: {
        prepare: 'husky install && echo "npm run lintPrePush" > .husky/pre-push',
        lint: 'npx nx run-many --all --skip-nx-cache --parallel --targets=lint,type-check --fix',
        lintPrePush: 'npx nx run-many --all --skip-nx-cache --parallel --targets=lint,type-check',
        codeCheck: 'npx prettier --check .',
        codeFormat: 'npx prettier --write . && npm run lint',
        test: 'npx nx run-many --all --target=test',
      },
      'lint-staged': {
        '*.{js,json,ts,tsx}': 'eslint --cache --fix',
        '*.{js,json,ts,tsx,css,md}': 'prettier --write',
      },
    },
  });
};
