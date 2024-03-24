import { Tree } from '@nx/devkit';

import {
  appendNxGeneratedFile,
  appendNxGeneratedJsonFile,
  writeNxGeneratedFile,
  WriteStategy,
} from '../../../utility/GeneratorUtility';

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

  // update app-core
  appendNxGeneratedFile({
    tree,
    filePath: `libs/app-core/jest.config.ts`,
    stategy: WriteStategy.AddAbovePattern,
    pattern: `};`,
    fileContent: `setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],`,
  });
};
