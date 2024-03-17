import { formatFiles, generateFiles, Tree } from '@nx/devkit';
import { removeTrailingSlash, toClassName, toPropertyName } from '@xystemize/app-core';
import { kebabCase, trim } from 'lodash';
import * as path from 'path';

import { BackendComponentGeneratorSchema } from './schema';

export async function backendComponentGenerator(tree: Tree, options: BackendComponentGeneratorSchema) {
  const defaultRootDirectory = 'apps/backend';
  const defaultDirectory = `${defaultRootDirectory}/src`;
  const formatedName = toClassName(trim(options.name));
  const folderName = options.folderName ?? kebabCase(formatedName);

  const directory = removeTrailingSlash(options.directory ?? defaultDirectory);
  const hasSourceFolder = directory?.includes('src');
  const normalizedDirectory = hasSourceFolder ? directory : `${directory}/src`;

  const resolvedOptions = {
    ...options,
    name: formatedName,
    nameLowerCase: formatedName.toLowerCase(),
    nameCamelCase: toPropertyName(formatedName),
    folderName: folderName,
    directory: normalizedDirectory ?? defaultDirectory,
    pascalCaseFiles: true,
  };
  const projectRoot = `${resolvedOptions.directory}/${resolvedOptions.folderName}`;

  generateFiles(tree, path.join(__dirname, 'files'), projectRoot, resolvedOptions);
  await formatFiles(tree);
}

export default backendComponentGenerator;
