import { formatFiles, generateFiles, Tree } from '@nx/devkit';
import { removeTrailingSlash, toClassName, toPropertyName } from '@xystemize/app-core';
import { isArray, kebabCase, trim } from 'lodash';
import * as path from 'path';

import { appendNxGeneratedFile, AppendStategy, readNxGenerateFileContent } from '../../utility';

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
  const moduleName = `${formatedName}Module`;
  const componentRoot = `${resolvedOptions.directory}/${resolvedOptions.folderName}`;

  generateFiles(tree, path.join(__dirname, 'files'), componentRoot, resolvedOptions);

  const apiV1Path = `${resolvedOptions.directory}/@api-v1/ApiV1.ts`;
  let content = readNxGenerateFileContent({
    tree,
    filePath: apiV1Path,
    pattern: new RegExp(/@Module\((\{[^]*?\})\)/),
  });

  if (content) {
    content = content.replace('@Module(', '').replace(')', '').trim().replace(/,\s*}/g, '}');
    content = content
      .replace(/([{,]\s*)([a-zA-Z0-9_]+?)\s*:/g, '$1"$2":')
      .replace(/([[]\s*)([a-zA-Z0-9_]+?)\s*]/g, '$1"$2"');

    const moduleObj = JSON.parse(content);

    if (moduleObj?.imports) {
      moduleObj.imports.push(moduleName);
      moduleObj.imports = moduleObj.imports.sort();
    }

    const moduleValues: string[] = [];

    Object.keys(moduleObj).forEach((key) => {
      const value = moduleObj[key];

      if (isArray(value)) {
        moduleValues.push(`${key}: [${value.join(', ')}]`);
      } else {
        // don't set for now. we expect all values are array
      }
    });

    const newModule = `
    @Module({
      ${moduleValues.join(',\n')}
    })`;

    appendNxGeneratedFile({
      tree,
      filePath: apiV1Path,
      pattern: new RegExp(/@Module\((\{[^]*?\})\)/),
      stategy: AppendStategy.Replace,
      fileContent: newModule,
    });

    appendNxGeneratedFile({
      tree,
      filePath: apiV1Path,
      pattern: 'export const ApiV1',
      stategy: AppendStategy.AddAbovePattern,
      fileContent: `import { ${moduleName} } from '../${resolvedOptions.folderName}/${resolvedOptions.name}Api';\n`,
    });
  }

  await formatFiles(tree);
}

export default backendComponentGenerator;
