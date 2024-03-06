import { addDependenciesToPackageJson, Tree } from '@nx/devkit';
import { appendNxGeneratedJsonFile, writeNxGeneratedFile } from '@xystemize/utility';

export const setUpPreset = async ({ tree }: { tree: Tree }) => {
  // add dependencies
  const packageDefaultVersion = 'latest';
  const dependencies = {};
  const devDependencies = {
    husky: packageDefaultVersion,
    'lint-staged': packageDefaultVersion,
    'eslint-plugin-simple-import-sort': packageDefaultVersion,
    'eslint-plugin-unused-imports': packageDefaultVersion,
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
};
