import { addDependenciesToPackageJson, Tree } from '@nx/devkit';
import { applicationGenerator } from '@nx/nest';
import { kebabCase } from 'lodash';

import { backendDependencies, backendDevDependencies } from '../dependency/dependencies';

import { updateProjectJson } from './lib/Project';
import { BackendAppGeneratorSchema } from './schema';

export async function backendAppGenerator(tree: Tree, options: BackendAppGeneratorSchema) {
  const formatedName = kebabCase(options.name);
  const projectRoot = `${options.directory}/${formatedName}`;
  const resolvedOptions = {
    ...options,
    name: kebabCase(options.name),
  };

  // add dependencies
  addDependenciesToPackageJson(tree, backendDependencies, backendDevDependencies);

  await applicationGenerator(tree, resolvedOptions);

  updateProjectJson({ tree, projectRoot, options: resolvedOptions });
}

export default backendAppGenerator;
