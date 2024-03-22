/* eslint-disable @typescript-eslint/no-explicit-any */
import { Tree } from '@nx/devkit';
import { first, isArray, isPlainObject } from 'lodash';

export enum WriteStategy {
  AddAbovePattern,
  Replace,
}

export const readNxGeneratedFile = ({ tree, filePath }: { tree: Tree; filePath: string }) => {
  const content = tree.read(filePath);

  if (!content) {
    return null;
  }

  return content.toString('utf8');
};

export const readNxGenerateFileContent = ({
  tree,
  filePath,
  pattern,
}: {
  tree: Tree;
  filePath: string;
  pattern: string | RegExp;
}) => {
  const content = readNxGeneratedFile({ tree, filePath });

  if (!content) {
    return null;
  }

  return first(content.match(pattern)) || '';
};

export const writeNxGeneratedFile = ({
  tree,
  filePath,
  fileContent,
}: {
  tree: Tree;
  filePath: string;
  fileContent: any;
}) => {
  return tree.write(filePath, fileContent);
};

export const appendNxGeneratedFile = ({
  tree,
  filePath,
  fileContent,
  pattern,
  stategy,
}: {
  tree: Tree;
  filePath: string;
  fileContent: any;
  pattern?: string | RegExp;
  stategy: WriteStategy;
}) => {
  let currentFileContent = readNxGeneratedFile({ tree, filePath }) ?? '';

  if (!currentFileContent) {
    return;
  }

  if (stategy === WriteStategy.AddAbovePattern) {
    const actualStringUsingPattern = pattern ? first(currentFileContent.match(pattern)) : null;

    if (pattern && actualStringUsingPattern) {
      let additionalContent = fileContent;
      additionalContent += '\n';
      additionalContent += actualStringUsingPattern;
      currentFileContent = currentFileContent.replace(pattern, additionalContent);
    } else {
      let additionalContent = '\n';
      additionalContent += fileContent;
      currentFileContent += additionalContent;
    }
  }

  if (stategy === WriteStategy.Replace) {
    const actualStringUsingPattern = pattern ? first(currentFileContent.match(pattern)) : null;

    if (pattern && actualStringUsingPattern) {
      currentFileContent = currentFileContent.replace(pattern, fileContent);
    } else {
      let additionalContent = '\n';
      additionalContent += fileContent;
      currentFileContent += additionalContent;
    }
  }

  return tree.write(filePath, currentFileContent);
};

export const deleteNxGeneratedFile = ({ tree, filePath }: { tree: Tree; filePath: string }) => {
  return tree.delete(filePath);
};

export const readNxGeneratedJsonFile = ({ tree, filePath }: { tree: Tree; filePath: string }) => {
  const content = readNxGeneratedFile({ tree, filePath });

  if (!content) {
    return null;
  }

  return JSON.parse(content);
};

export const writeNxGeneratedJsonFile = ({
  tree,
  filePath,
  fileContent,
}: {
  tree: Tree;
  filePath: string;
  fileContent: object;
}) => {
  return writeNxGeneratedFile({ tree, filePath, fileContent: JSON.stringify(fileContent) });
};

export const appendNxGeneratedJsonFile = ({
  tree,
  filePath,
  fileContent,
  overwrite = false,
}: {
  tree: Tree;
  filePath: string;
  fileContent: { [key: string]: any };
  overwrite?: boolean;
}) => {
  const json = readNxGeneratedJsonFile({ tree, filePath });

  if (!json) {
    return;
  }

  if (overwrite) {
    Object.assign(json, fileContent);
  } else {
    const keys = Object.keys(fileContent);

    keys.forEach((key) => {
      const existingValue = json[key];
      const fileContentValue = fileContent?.[key];

      if (isPlainObject(fileContentValue)) {
        Object.assign(json, {
          [key]: {
            ...existingValue,
            ...fileContentValue,
          },
        });
      } else if (isArray(fileContentValue)) {
        Object.assign(json, {
          [key]: [...(existingValue ?? []), ...fileContentValue],
        });
      } else {
        Object.assign(json, {
          [key]: fileContentValue,
        });
      }
    });
  }

  writeNxGeneratedJsonFile({ tree, filePath, fileContent: json });
};

export const checkIfDependenciesExist = ({
  tree,
  filePath,
  dependencies,
  devDependencies,
}: {
  filePath: string;
  tree: Tree;
  dependencies: { [key: string]: any };
  devDependencies: { [key: string]: any };
}) => {
  const json = readNxGeneratedJsonFile({ tree, filePath });

  if (!json) {
    return;
  }

  const jsonDependencyKeys = Object.keys(json.dependencies);
  const jsonDevDependencyKeys = Object.keys(json.devDependencies);
  const dependencyKeys = Object.keys(dependencies);
  const devDependencyKeys = Object.keys(devDependencies);

  dependencyKeys.forEach((key) => {
    const exists = jsonDependencyKeys.includes(key);

    if (!exists) {
      throw new Error('DEPENDENCY_DOESNT_EXIST');
    }
  });

  devDependencyKeys.forEach((key) => {
    const exists = jsonDevDependencyKeys.includes(key);

    if (!exists) {
      throw new Error('DEPENDENCY_DOESNT_EXIST');
    }
  });
};

export const fileShouldExists = ({ tree, filePath }: { tree: Tree; filePath: string }) => {
  const exists = tree.exists(filePath);

  if (!exists) {
    throw new Error('FILE_DOESNT_EXIST');
  }

  return true;
};

export const folderShouldExists = ({ tree, folderPath }: { tree: Tree; folderPath: string }) => {
  const exists = tree.exists(folderPath);

  if (!exists) {
    throw new Error('FILE_DOESNT_EXIST');
  }

  return true;
};

export const fileShouldNotExists = ({ tree, filePath }: { tree: Tree; filePath: string }) => {
  const exists = tree.exists(filePath);

  if (exists) {
    throw new Error('FILE_EXIST');
  }

  return true;
};

export const folderShouldNotExists = ({ tree, folderPath }: { tree: Tree; folderPath: string }) => {
  const exists = tree.exists(folderPath);

  if (exists) {
    throw new Error('FILE_EXIST');
  }

  return true;
};

export const appendFileAtTheBottom = ({
  tree,
  filePath,
  entries,
}: {
  tree: Tree;
  filePath: string;
  entries: string[];
}) => {
  const file = readNxGeneratedFile({ tree, filePath });
  const stringEntries = '\n' + entries.join('\n');

  tree.write(filePath, file + stringEntries);
};
