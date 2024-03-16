import { addDependenciesToPackageJson, formatFiles, generateFiles, Tree } from '@nx/devkit';
import { applicationGenerator } from '@nx/nest';
import { kebabCase } from 'lodash';
import * as path from 'path';

import backendApiGenerator from '../backend-api/generator';
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
    name: 'apiv1',
    folderName: '@api-v1',
    directory: `${projectRoot}/src`,
  });

  await formatFiles(tree);
}

export default backendAppGenerator;
