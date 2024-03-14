import { Tree } from '@nx/devkit';

import { readNxGeneratedJsonFile, writeNxGeneratedJsonFile } from '../../../utility';
import { BackendAppGeneratorSchema } from '../schema';

export const updateProjectJson = ({
  tree,
  options,
}: {
  tree: Tree;
  options: BackendAppGeneratorSchema;
  projectRoot: string;
}) => {
  const projectJsonFilePath = `${options.name}/project.json`;
  const projectJson = readNxGeneratedJsonFile({ tree, filePath: projectJsonFilePath });

  projectJson.targets.build.options.generatePackageJson = true;

  projectJson.targets = {
    ...projectJson.targets,
    killports: {
      executor: 'nx:run-commands',
      options: {
        command: `kill-port --port kill-port --port 9001,9002,9003,9004,9005,9006`,
      },
    },
    deploy: {
      executor: 'nx:run-commands',
      dependsOn: ['build'],
      options: {
        command: `nx run ${options.name}:firebase deploy`,
      },
    },
  };

  writeNxGeneratedJsonFile({ tree, filePath: projectJsonFilePath, fileContent: projectJson });
};
