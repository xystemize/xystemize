import { formatFiles, generateFiles, Tree } from '@nx/devkit';
import { toClassName, toPropertyName } from '@xystemize/app-core';
import { kebabCase, trim } from 'lodash';
import * as path from 'path';

import { appendNxGeneratedFile } from '../../utility';

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

  const indexFilePath = `${defaultDirectory}/index.ts`;

  appendNxGeneratedFile({
    tree,
    filePath: indexFilePath,
    pattern: '// ### Imports:End ###',
    fileContent: `import { ${resolvedOptions.name} } from './${folderName}/${resolvedOptions.name}';`,
  });

  appendNxGeneratedFile({
    tree,
    filePath: indexFilePath,
    pattern: '// ### APIs:End ###',
    fileContent: `export const ${resolvedOptions.nameLowerCase} = regularFunction.onRequest(${resolvedOptions.name});`,
  });

  await formatFiles(tree);
}

export default backendApiGenerator;
