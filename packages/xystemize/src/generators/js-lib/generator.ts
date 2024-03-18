import { formatFiles, generateFiles, installPackagesTask, names, readJson, Tree } from '@nx/devkit';
import { libraryGenerator } from '@nx/js';
import { LibraryGeneratorSchema } from '@nx/js/src/utils/schema';
import { replace } from 'lodash';
import * as path from 'path';

import { appendNxGeneratedJsonFile } from '../../utility/GeneratorUtility';

import { JsLibGeneratorSchema } from './schema';

export async function jsLibGenerator(tree: Tree, options: JsLibGeneratorSchema) {
  const { name, directory = 'libs' } = options;
  const packageJson = readJson(tree, 'package.json');
  const scopeName = replace(packageJson.projectName ?? packageJson.name ?? '', '/source', '');
  const libName = names(name).fileName;
  const resolvedOptions: JsLibGeneratorSchema = {
    ...options,
    name: libName,
    directory: directory,
    pascalCaseFiles: true,
    publishable: true,
    importPath: `${scopeName}/${libName}`,
  };

  const libRoot = `${resolvedOptions.directory}/${libName}`;

  await libraryGenerator(tree, resolvedOptions as LibraryGeneratorSchema);
  generateFiles(tree, path.join(__dirname, 'files'), libRoot, resolvedOptions);

  appendNxGeneratedJsonFile({
    tree,
    filePath: `${libRoot}/package.json`,
    fileContent: {
      publishConfig: {
        access: 'public',
      },
    },
  });

  appendNxGeneratedJsonFile({
    tree,
    filePath: `${libRoot}/project.json`,
    fileContent: {
      release: {
        executor: 'nx-release:build-update-publish',
        options: {
          libName: 'app-core',
        },
      },
    },
  });

  await formatFiles(tree);

  return () => {
    installPackagesTask(tree);
  };
}

export default jsLibGenerator;
