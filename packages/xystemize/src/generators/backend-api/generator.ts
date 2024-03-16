import { formatFiles, generateFiles, Tree } from '@nx/devkit';
import { removeTrailingSlash, toClassName, toPropertyName } from '@xystemize/app-core';
import { kebabCase, trim } from 'lodash';
import * as path from 'path';

import { appendNxGeneratedFile, AppendStategy } from '../../utility';

import { BackendApiGeneratorSchema } from './schema';

export async function backendApiGenerator(tree: Tree, options: BackendApiGeneratorSchema) {
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
    nameLowerCamelCase: toPropertyName(formatedName),
    folderName: folderName,
    directory: normalizedDirectory ?? defaultDirectory,
    pascalCaseFiles: true,
    tpl: '',
  };
  const projectRoot = `${resolvedOptions.directory}/${resolvedOptions.folderName}`;

  generateFiles(tree, path.join(__dirname, 'files'), projectRoot, resolvedOptions);

  const indexFilePath = `${resolvedOptions.directory}/index.ts`;

  appendNxGeneratedFile({
    tree,
    filePath: indexFilePath,
    fileContent: `import { ${resolvedOptions.name} } from './${resolvedOptions.folderName}/${resolvedOptions.name}';`,
    pattern: '// ### Imports:End ###',
    stategy: AppendStategy.AddAbovePattern,
  });

  appendNxGeneratedFile({
    tree,
    filePath: indexFilePath,
    fileContent: `export const ${resolvedOptions.nameLowerCase} = regularFunction.onRequest(${resolvedOptions.name});`,
    pattern: '// ### APIs:End ###',
    stategy: AppendStategy.AddAbovePattern,
  });

  await formatFiles(tree);
}

export default backendApiGenerator;
