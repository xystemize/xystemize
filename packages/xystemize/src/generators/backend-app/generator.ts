import { addDependenciesToPackageJson, formatFiles, generateFiles, Tree } from '@nx/devkit';
import { applicationGenerator } from '@nx/nest';
import { kebabCase, trim } from 'lodash';
import * as path from 'path';

import {
  appendNxGeneratedFile,
  deleteNxGeneratedFile,
  readNxGeneratedJsonFile,
  writeNxGeneratedFile,
  WriteStategy,
} from '../../utility';
import backendApiGenerator from '../backend-api/generator';
import backendComponentGenerator from '../backend-component/generator';
import { backendDependencies, backendDevDependencies } from '../dependency/dependencies';
import jsLibGenerator from '../js-lib/generator';

import { updateProjectJson } from './lib/Project';
import { BackendAppGeneratorSchema } from './schema';

export async function backendAppGenerator(tree: Tree, options: BackendAppGeneratorSchema) {
  const packageJson = readNxGeneratedJsonFile({ tree, filePath: 'package.json' });
  const orgName = trim(packageJson.orgName ?? packageJson.name).replace('/source', '');

  const formatedName = kebabCase(options.name);
  const defaultDirectory = 'apps';
  const resolvedOptions = {
    ...options,
    name: kebabCase(options.name),
    orgName: orgName,
    directory: options.directory ?? defaultDirectory,
  };
  const projectRoot = `${resolvedOptions.directory}/${formatedName}`;

  // add libs
  const backendLib = 'backend-lib';
  await jsLibGenerator(tree, { name: backendLib });

  // add dependencies
  addDependenciesToPackageJson(tree, backendDependencies, backendDevDependencies);

  await applicationGenerator(tree, resolvedOptions);
  generateFiles(tree, path.join(__dirname, 'files'), projectRoot, resolvedOptions);
  generateFiles(tree, path.join(__dirname, 'rootFiles'), '.', resolvedOptions);
  generateFiles(tree, path.join(__dirname, 'libFiles'), `libs/${backendLib}/src`, resolvedOptions);
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

  appendNxGeneratedFile({
    tree,
    filePath: `${projectRoot}/jest.config.ts`,
    stategy: WriteStategy.AddAbovePattern,
    pattern: `moduleFileExtensions: ['ts', 'js', 'html'],`,
    fileContent: `globalSetup: '<rootDir>/src/@test/JestGlobalSetup.ts',`,
  });

  // replace files
  generateFiles(tree, path.join(__dirname, 'fileReplacements'), `${projectRoot}/src`, resolvedOptions);

  // delete files
  deleteNxGeneratedFile({ tree, filePath: `${projectRoot}/src/app` });
  deleteNxGeneratedFile({ tree, filePath: `${projectRoot}/src/assets` });
  deleteNxGeneratedFile({ tree, filePath: `${projectRoot}/src/main.ts` });

  await formatFiles(tree);
}

export default backendAppGenerator;
