import { formatFiles, generateFiles, Tree } from '@nx/devkit';
import { removeTrailingCharacter, removeTrailingSlash, toClassName, toPropertyName } from '@xystemize/app-core';
import { kebabCase, trim } from 'lodash';
import * as path from 'path';

import {
  addComponentReferenceToApiModule,
  appendNxGeneratedFile,
  readNxGeneratedJsonFile,
  WriteStategy,
} from '../../utility';

import { BackendComponentGeneratorSchema } from './schema';

export async function backendComponentGenerator(tree: Tree, options: BackendComponentGeneratorSchema) {
  const packageJson = readNxGeneratedJsonFile({ tree, filePath: `package.json` });
  const orgName = trim(packageJson.orgName ?? packageJson.name).replace('/source', '');
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
    orgName: orgName,
    folderName: folderName,
    directory: normalizedDirectory ?? defaultDirectory,
    pascalCaseFiles: true,
  };
  const componentRoot = `${resolvedOptions.directory}/${resolvedOptions.folderName}`;

  generateFiles(tree, path.join(__dirname, 'files'), componentRoot, resolvedOptions);

  const nameSingular =
    resolvedOptions.nameSingular ?? removeTrailingCharacter({ string: resolvedOptions.nameLowerCase, char: 's' });

  appendNxGeneratedFile({
    tree,
    filePath: `libs/app-core/src/constant/Name.ts`,
    pattern: '// ### Data:End ###',
    stategy: WriteStategy.AddAbovePattern,
    fileContent: `${nameSingular} = '${nameSingular}',`,
  });

  appendNxGeneratedFile({
    tree,
    filePath: `libs/app-core/src/constant/Name.ts`,
    pattern: '// ### Data:End ###',
    stategy: WriteStategy.AddAbovePattern,
    fileContent: `${resolvedOptions.nameLowerCase} = '${resolvedOptions.nameLowerCase}',`,
  });

  addComponentReferenceToApiModule({
    tree,
    filePath: `${resolvedOptions.directory}/@api-v1/ApiV1.ts`,
    name: resolvedOptions.name,
    folderName: resolvedOptions.folderName,
  });

  await formatFiles(tree);
}

export default backendComponentGenerator;
