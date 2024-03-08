import { addDependenciesToPackageJson, Tree } from '@nx/devkit';

import { appendNxGeneratedJsonFile, writeNxGeneratedFile } from '../../utility/GeneratorUtility';
import { generalDependencies, generalDevDependencies } from '../dependency/dependencies';

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
        nxLintAndFix: 'npx nx run-many --all --skip-nx-cache --parallel --targets=lint,type-check --fix',
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

export const setUpPreset = async ({ tree }: { tree: Tree }) => {
  // update tsconfig.base.json
  appendNxGeneratedJsonFile({
    tree,
    filePath: 'tsconfig.base.json',
    fileContent: {
      compilerOptions: {
        strictPropertyInitialization: false,
        allowSyntheticDefaultImports: true,
        esModuleInterop: true,
        allowJs: true,
      },
    },
  });

  // update prettier
  appendNxGeneratedJsonFile({
    tree,
    filePath: '.prettierrc',
    fileContent: {
      singleQuote: true,
      printWidth: 120,
      tabWidth: 2,
    },
  });

  // add .nvmrc
  writeNxGeneratedFile({
    tree,
    filePath: '.nvmrc',
    fileContent: 'v20.11.1',
  });

  // update .eslintrc.json
  appendNxGeneratedJsonFile({
    tree,
    filePath: '.eslintrc.json',
    fileContent: {
      plugins: ['unused-imports', 'simple-import-sort'],
      extends: ['./.eslintrc.base.json'],
    },
  });
};
