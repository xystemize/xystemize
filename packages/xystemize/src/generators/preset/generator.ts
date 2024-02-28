import { addProjectConfiguration, formatFiles, generateFiles, Tree } from '@nx/devkit';
import { Linter } from '@nx/eslint';
import * as path from 'path';

import backendAppGenerator from '../backend-app/generator';
import mobileAppGenerator from '../mobile-app/generator';

import { PresetGeneratorSchema } from './schema';

export async function presetGenerator(tree: Tree, options: PresetGeneratorSchema) {
  const appDirectory = 'apps';

  if (options.includeBackend) {
    backendAppGenerator(tree, {
      name: 'backend',
      directory: appDirectory,
    });
  }

  if (options.includeMobile) {
    mobileAppGenerator(tree, {
      name: 'mobile',
      directory: appDirectory,
      unitTestRunner: 'jest',
      linter: Linter.EsLint,
      e2eTestRunner: 'none',
      bundler: 'webpack',
      install: true,
    });
  }

  if (options.includeMarketing) {
    // generate marketing app
  }

  if (options.includeWeb) {
    // generate web app
  }

  const projectRoot = `libs/${options.name}`;
  addProjectConfiguration(tree, options.name, {
    root: projectRoot,
    projectType: 'library',
    sourceRoot: `${projectRoot}/src`,
    targets: {},
  });
  generateFiles(tree, path.join(__dirname, 'files'), projectRoot, options);
  await formatFiles(tree);
}

export default presetGenerator;
