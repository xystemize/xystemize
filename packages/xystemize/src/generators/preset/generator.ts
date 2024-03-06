import { formatFiles, Tree } from '@nx/devkit';
import { Linter } from '@nx/eslint';

import backendAppGenerator from '../backend-app/generator';
import marketingAppGenerator from '../marketing-app/generator';
import mobileAppGenerator from '../mobile-app/generator';
import webAppGenerator from '../web-app/generator';

import { PresetGeneratorSchema } from './schema';
import { setUpPreset } from './setUpPreset';

export async function presetGenerator(tree: Tree, options: PresetGeneratorSchema) {
  const appDirectory = 'apps';

  if (options.includeBackend) {
    await backendAppGenerator(tree, {
      name: 'backend',
      directory: appDirectory,
    });
  }

  if (options.includeMobile) {
    await mobileAppGenerator(tree, {
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
    await marketingAppGenerator(tree, {
      name: 'marketing',
      directory: appDirectory,
      style: 'css',
    });
  }

  if (options.includeWeb) {
    await webAppGenerator(tree, {
      name: 'web',
      directory: appDirectory,
      style: 'css',
    });
  }

  await setUpPreset({ tree });
  // const projectRoot = `libs/${options.name}`;
  // addProjectConfiguration(tree, options.name, {
  //   root: projectRoot,
  //   projectType: 'library',
  //   sourceRoot: `${projectRoot}/src`,
  //   targets: {},
  // });
  // generateFiles(tree, path.join(__dirname, 'files'), projectRoot, options);
  await formatFiles(tree);
}

export default presetGenerator;
