import { addDependenciesToPackageJson, Tree } from '@nx/devkit';
import { appendNxGeneratedJsonFile, writeNxGeneratedFile } from '@xystemize/utility';

export const setUpDependencies = async ({ tree }: { tree: Tree }) => {
  // add dependencies
  const dependencies = {};
  const devDependencies = {
    husky: '^9.0.11',
    'lint-staged': '^15.2.2',
    'eslint-plugin-simple-import-sort': '^12.0.0',
    'eslint-plugin-unused-imports': '^3.1.0',
  };

  addDependenciesToPackageJson(tree, dependencies, devDependencies);

  // add script
  appendNxGeneratedJsonFile({
    tree,
    filePath: 'package.json',
    fileContent: {
      scripts: {
        prepare: 'husky install',
        nxLintAndFix: 'npx nx run-many --all --skip-nx-cache --parallel --targets=lint,type-check --fix',
        nxReleaseSetup: 'npx nx generate nx-release:configure',
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
