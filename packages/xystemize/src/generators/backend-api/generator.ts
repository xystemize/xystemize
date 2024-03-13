import { formatFiles, generateFiles, Tree } from '@nx/devkit';
import { toClassName, toPropertyName } from '@xystemize/app-core';
import { kebabCase, trim } from 'lodash';
import * as path from 'path';

import { BackendApiGeneratorSchema } from './schema';

export async function backendApiGenerator(tree: Tree, options: BackendApiGeneratorSchema) {
  const defaultDirectory = 'apps/backend/src';
  const formatedName = toClassName(trim(options.name));
  const folderName = kebabCase(formatedName);
  const resolvedOptions = {
    ...options,
    name: formatedName,
    nameLowerCase: formatedName.toLowerCase(),
    nameLowerCamelCase: toPropertyName(formatedName),
    folderName: folderName,
    directory: options.directory ?? defaultDirectory,
    pascalCaseFiles: true,
    tpl: '',
  };
  const projectRoot = `${resolvedOptions.directory}/${resolvedOptions.folderName}`;

  generateFiles(tree, path.join(__dirname, 'files'), projectRoot, resolvedOptions);

  await formatFiles(tree);
}

export default backendApiGenerator;
