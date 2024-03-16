import { addDependenciesToPackageJson, Tree } from '@nx/devkit';

import { appendNxGeneratedJsonFile } from '../../../utility';
import { generalDependencies, generalDevDependencies } from '../../dependency/dependencies';

export const setUpDependencies = async ({ tree }: { tree: Tree }) => {
  // add dependencies
  addDependenciesToPackageJson(tree, generalDependencies, generalDevDependencies);

  // add script
  appendNxGeneratedJsonFile({
    tree,
    filePath: 'package.json',
    fileContent: {
      scripts: {
        prepare: 'husky install',
        lint: 'npx nx run-many --all --skip-nx-cache --parallel --targets=lint,type-check --fix',
        codeCheck: 'npx prettier --check .',
        codeFormat: 'npx prettier --write . && npm run nxLintAndFix',
      },
      'lint-staged': {
        '*.{js,json,ts,tsx}': 'eslint --cache --fix',
        '*.{js,json,ts,tsx,css,md}': 'prettier --write',
      },
    },
  });
};
