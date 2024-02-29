import { formatFiles, generateFiles, installPackagesTask, names, readJson, Tree } from '@nx/devkit';
import { libraryGenerator } from '@nx/js';
import { LibraryGeneratorSchema } from '@nx/js/src/utils/schema';
import { appendNxGeneratedJsonFile } from '@xystemize/utility';
import * as path from 'path';

import { JsLibGeneratorSchema } from './schema';

export async function jsLibGenerator(tree: Tree, options: JsLibGeneratorSchema) {
  const { name, directory } = options;
  const packageJson = readJson(tree, 'package.json');
  const scopeName = packageJson.scopeName ?? packageJson.name;
  const libName = names(name).fileName;
  const resolvedOptions = {
    ...options,
    name: libName,
    pascalCaseFiles: true,
    publishable: true,
    importPath: `${scopeName}/${libName}`,
  };

  let projectRoot = `libs/${libName}`;

  if (directory) {
    projectRoot = `libs/${directory}/${libName}`;
  }

  await libraryGenerator(tree, resolvedOptions as LibraryGeneratorSchema);
  generateFiles(tree, path.join(__dirname, 'files'), projectRoot, resolvedOptions);

  appendNxGeneratedJsonFile({
    tree,
    filePath: `${libName}/package.json`,
    fileContent: {
      publishConfig: {
        access: 'public',
      },
    },
  });

  appendNxGeneratedJsonFile({
    tree,
    filePath: `${libName}/project.json`,
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
