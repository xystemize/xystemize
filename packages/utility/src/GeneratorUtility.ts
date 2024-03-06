/* eslint-disable @typescript-eslint/no-explicit-any */
import { Tree } from '@nx/devkit';
import { isArray, isPlainObject } from 'lodash';

export const readNxGeneratedJsonFile = ({ tree, filePath }: { tree: Tree; filePath: string }) => {
  const content = tree.read(filePath);

  if (!content) {
    return null;
  }

  return JSON.parse(content.toString('utf8'));
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
  return tree.write(filePath, JSON.stringify(fileContent));
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
          [key]: [...existingValue, ...fileContentValue],
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
