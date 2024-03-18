import { Tree } from '@nx/devkit';
import { isArray } from 'lodash';

import { appendNxGeneratedFile, readNxGenerateFileContent, WriteStategy } from './GeneratorUtility';

export const addComponentReferenceToApiModule = ({
  tree,
  filePath,
  folderName,
  name,
}: {
  tree: Tree;
  filePath: string;
  name: string;
  folderName: string;
}) => {
  const moduleName = `${name}Module`;
  let content = readNxGenerateFileContent({
    tree,
    filePath: filePath,
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
        // don't set for now. we expect all values to be array
      }
    });

    const newModule = `
    @Module({
      ${moduleValues.join(',\n')}
    })`;

    appendNxGeneratedFile({
      tree,
      filePath: filePath,
      pattern: new RegExp(/@Module\((\{[^]*?\})\)/),
      stategy: WriteStategy.Replace,
      fileContent: newModule,
    });

    appendNxGeneratedFile({
      tree,
      filePath: filePath,
      pattern: 'export const ApiV1',
      stategy: WriteStategy.AddAbovePattern,
      fileContent: `import { ${moduleName} } from '../${folderName}/${name}Api';\n`,
    });
  }
};
