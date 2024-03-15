import { Tree } from '@nx/devkit';

import { appendNxGeneratedJsonFile, writeNxGeneratedFile } from '../../../utility/GeneratorUtility';

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