import { addDependenciesToPackageJson, formatFiles, Tree } from '@nx/devkit';
import { applicationGenerator } from '@nx/nest';
import { kebabCase } from 'lodash';

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

  updateProjectJson({ tree, projectRoot, options: resolvedOptions });

  await formatFiles(tree);
}

export default backendAppGenerator;
