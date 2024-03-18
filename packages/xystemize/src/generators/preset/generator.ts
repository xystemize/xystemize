import { formatFiles, generateFiles, Tree } from '@nx/devkit';
import { Linter } from '@nx/eslint';
import * as path from 'path';

import { deleteNxGeneratedFile } from '../../utility';
import backendAppGenerator from '../backend-app/generator';
import jsLibGenerator from '../js-lib/generator';
import marketingAppGenerator from '../marketing-app/generator';
import mobileAppGenerator from '../mobile-app/generator';
import webAppGenerator from '../web-app/generator';

import { setUpDependencies, setUpPreset } from './lib';
import { PresetGeneratorSchema } from './schema';

export async function presetGenerator(tree: Tree, options: PresetGeneratorSchema) {
  const appDirectory = 'apps';

  await setUpDependencies({ tree });

  // add local app-core to libs
  await jsLibGenerator(tree, { name: 'app-core' });
  deleteNxGeneratedFile({ tree, filePath: 'libs/app-core/src/lib' });

  generateFiles(tree, path.join(__dirname, 'files'), '.', options);

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

  await setUpPreset({ tree, options });
  await formatFiles(tree);
}

export default presetGenerator;
