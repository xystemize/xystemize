import { names, Tree } from '@nx/devkit';
import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import { libraryGenerator } from '@nx/js';

import {
  appendNxGeneratedFile,
  appendNxGeneratedJsonFile,
  readNxGeneratedFile,
  readNxGeneratedJsonFile,
  writeNxGeneratedFile,
} from './GeneratorUtility';

describe('Generator Utility', () => {
  let tree: Tree;
  const options = { name: 'TestTest' };

  describe('appendNxGeneratedJsonFile()', () => {
    const libName = names(options.name).fileName;

    beforeAll(async () => {
      tree = createTreeWithEmptyWorkspace();
      await libraryGenerator(tree, options);
    });

    test('default behavior', async () => {
      appendNxGeneratedJsonFile({
        tree: tree,
        filePath: `${libName}/package.json`,
        fileContent: {
          scripts: {
            prepare: 'husky install',
          },
        },
      });

      const packageJson = readNxGeneratedJsonFile({ tree, filePath: `${libName}/package.json` });
      expect(packageJson.scripts).toStrictEqual({ prepare: 'husky install' });
    });

    test('overwrite object behavior', () => {
      appendNxGeneratedJsonFile({
        tree: tree,
        filePath: `${libName}/package.json`,
        fileContent: {
          scripts: {
            codeCheck: 'npx prettier --check .',
          },
        },
        overwrite: true,
      });

      const packageJson = readNxGeneratedJsonFile({ tree, filePath: `${libName}/package.json` });
      expect(packageJson.scripts).toStrictEqual({
        codeCheck: 'npx prettier --check .',
      });
    });

    test('append object behavior', () => {
      appendNxGeneratedJsonFile({
        tree: tree,
        filePath: `${libName}/package.json`,
        fileContent: {
          scripts: {
            prepare: 'husky install',
          },
        },
        overwrite: false,
      });

      const packageJson = readNxGeneratedJsonFile({ tree, filePath: `${libName}/package.json` });

      expect(packageJson.scripts).toStrictEqual({
        codeCheck: 'npx prettier --check .',
        prepare: 'husky install',
      });
    });

    test('overwrite array behavior', () => {
      appendNxGeneratedJsonFile({
        tree: tree,
        filePath: `${libName}/package.json`,
        fileContent: {
          array: [1],
        },
        overwrite: true,
      });

      const packageJson = readNxGeneratedJsonFile({ tree, filePath: `${libName}/package.json` });
      expect(packageJson.array).toStrictEqual([1]);
    });

    test('append array behavior', () => {
      appendNxGeneratedJsonFile({
        tree: tree,
        filePath: `${libName}/package.json`,
        fileContent: {
          array: [2],
        },
        overwrite: false,
      });

      const packageJson = readNxGeneratedJsonFile({ tree, filePath: `${libName}/package.json` });
      expect(packageJson.array).toStrictEqual([1, 2]);
    });

    test('overwrite value behavior', () => {
      appendNxGeneratedJsonFile({
        tree: tree,
        filePath: `${libName}/package.json`,
        fileContent: {
          value: 1,
        },
        overwrite: true,
      });

      const packageJson = readNxGeneratedJsonFile({ tree, filePath: `${libName}/package.json` });
      expect(packageJson.value).toStrictEqual(1);
    });

    test('append value behavior', () => {
      appendNxGeneratedJsonFile({
        tree: tree,
        filePath: `${libName}/package.json`,
        fileContent: {
          value: 2,
        },
        overwrite: false,
      });

      const packageJson = readNxGeneratedJsonFile({ tree, filePath: `${libName}/package.json` });
      expect(packageJson.value).toStrictEqual(2);
    });

    test('appendNxGeneratedFile', () => {
      const filePath = 'index.ts';
      writeNxGeneratedFile({
        tree,
        filePath,
        fileContent: `
        // Start
        // End
      `,
      });

      appendNxGeneratedFile({ tree, pattern: '// End', filePath, fileContent: `export const api = new Api();` });

      const fileContent = readNxGeneratedFile({ tree, filePath });
      expect(fileContent.includes('export const api = new Api();')).toBeDefined();
    });
  });
});
