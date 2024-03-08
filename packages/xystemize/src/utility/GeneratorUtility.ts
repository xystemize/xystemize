/* eslint-disable @typescript-eslint/no-explicit-any */
import { Tree } from '@nx/devkit';
import { isArray, isPlainObject } from 'lodash';

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
