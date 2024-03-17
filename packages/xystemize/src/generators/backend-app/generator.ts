import { addDependenciesToPackageJson, formatFiles, generateFiles, Tree } from '@nx/devkit';
import { applicationGenerator } from '@nx/nest';
import { kebabCase } from 'lodash';
import * as path from 'path';

import { deleteNxGeneratedFile, writeNxGeneratedFile } from '../../utility';
import backendApiGenerator from '../backend-api/generator';
import backendComponentGenerator from '../backend-component/generator';
import { backendDependencies, backendDevDependencies } from '../dependency/dependencies';

import { updateProjectJson } from './lib/Project';
import { BackendAppGeneratorSchema } from './schema';

export async function backendAppGenerator(tree: Tree, options: BackendAppGeneratorSchema) {
  const formatedName = kebabCase(options.name);
  const defaultDirectory = 'apps';
  const resolvedOptions = {
    ...options,
    name: kebabCase(options.name),
    directory: options.directory ?? defaultDirectory,
  };
  const projectRoot = `${resolvedOptions.directory}/${formatedName}`;

  // add dependencies
  addDependenciesToPackageJson(tree, backendDependencies, backendDevDependencies);

  await applicationGenerator(tree, resolvedOptions);
  generateFiles(tree, path.join(__dirname, 'files'), projectRoot, resolvedOptions);
  updateProjectJson({ tree, projectRoot, options: resolvedOptions });

  // add backend-api
  await backendApiGenerator(tree, {
    name: 'ApiV1',
    folderName: '@api-v1',
    directory: `${projectRoot}/src`,
  });

  //add backend-component
  await backendComponentGenerator(tree, {
    name: 'accounts',
    directory: `${projectRoot}/src`,
  });

  writeNxGeneratedFile({ tree, filePath: `${projectRoot}/src/@assets/.gitkeep`, fileContent: '' });

  // delete files
  deleteNxGeneratedFile({ tree, filePath: `${projectRoot}/src/app` });
  deleteNxGeneratedFile({ tree, filePath: `${projectRoot}/src/assets` });
  deleteNxGeneratedFile({ tree, filePath: `${projectRoot}/src/main.ts` });

  await formatFiles(tree);
}

export default backendAppGenerator;
