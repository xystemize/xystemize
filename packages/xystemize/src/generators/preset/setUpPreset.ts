import { Tree } from '@nx/devkit';
import { appendNxGeneratedJsonFile } from '@xystemize/utility';

export const setUpPreset = async ({ tree }: { tree: Tree }) => {
  // add script
  appendNxGeneratedJsonFile({
    tree,
    filePath: 'package.json',
    fileContent: {
      scripts: {
        nxLintAndFix: 'npx nx run-many --all --skip-nx-cache --parallel --targets=lint,type-check --fix',
        nxReleaseSetup: 'npx nx generate nx-release:configure',
        codeCheck: 'npx prettier --check .',
        codeFormat: 'npx prettier --write . && npm run nxLintAndFix',
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
};
