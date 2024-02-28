import { addProjectConfiguration, formatFiles, generateFiles, Tree } from '@nx/devkit';
import { Linter } from '@nx/eslint';
import * as path from 'path';

import mobileAppGenerator from '../mobile-app/generator';

import { PresetGeneratorSchema } from './schema';

export async function presetGenerator(tree: Tree, options: PresetGeneratorSchema) {
  if (options.includeBackend) {
    // generate backend app
  }

  if (options.includeMobile) {
    mobileAppGenerator(tree, {
      name: 'mobile',
      directory: 'apps',
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
