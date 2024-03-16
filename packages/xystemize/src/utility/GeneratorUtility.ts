/* eslint-disable @typescript-eslint/no-explicit-any */
import { Tree } from '@nx/devkit';
import { first, isArray, isPlainObject } from 'lodash';

export const readNxGeneratedFile = ({ tree, filePath }: { tree: Tree; filePath: string }) => {
  const content = tree.read(filePath);

  if (!content) {
    return null;
  }

  return content.toString('utf8');
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
}: {
  tree: Tree;
  filePath: string;
  fileContent: any;
  pattern?: string | RegExp;
}) => {
  let currentFileContent = readNxGeneratedFile({ tree, filePath }) ?? '';

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
