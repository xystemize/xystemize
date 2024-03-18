/* eslint-disable no-undef */
import { execSync } from 'child_process';
import { mkdirSync, rmSync } from 'fs';
import { dirname, join } from 'path';

describe('xystemize', () => {
  let projectDirectory: string;

  beforeAll(() => {
    const projectName = 'test-project';
    projectDirectory = join(process.cwd(), 'tmp', projectName);

    // Cleanup the test project
    rmSync(projectDirectory, {
      recursive: true,
      force: true,
    });

    createTestProject();

    // The plugin has been built and published to a local registry in the jest globalSetup
    // Install the plugin built with the latest source code into the test repo
    execSync(`npm install xystemize@e2e @xystemize/app-core@e2e @xystemize/backend@e2e`, {
      cwd: projectDirectory,
      stdio: 'inherit',
      env: process.env,
    });
  });

  it('should be installed', () => {
    // npm ls will fail if the package is not installed properly
    execSync('npm ls xystemize', {
      cwd: projectDirectory,
      stdio: 'inherit',
    });
  });

  it('remove and regenerate apps', () => {
    const command = [
      'npx nx generate @nx/workspace:remove --projectName=backend-e2e --no-interactive',
      'npx nx generate @nx/workspace:remove --projectName=backend --no-interactive',
      'npx nx generate @nx/workspace:remove --projectName=marketing-e2e --no-interactive',
      'npx nx generate @nx/workspace:remove --projectName=marketing --no-interactive',
      'npx nx generate @nx/workspace:remove --projectName=mobile --no-interactive',
      'npx nx generate @nx/workspace:remove --projectName=web-e2e --no-interactive',
      'npx nx generate @nx/workspace:remove --projectName=web --no-interactive',
      'npx nx generate xystemize:preset --name=test-project --no-interactive',
    ].join(' && ');

    execSync(command, {
      cwd: projectDirectory,
      stdio: 'inherit',
      env: process.env,
    });
  });
});

/**
 * Creates a test project with create-nx-workspace and installs the plugin
 * @returns The directory where the test project was created
 */
function createTestProject() {
  const projectName = 'test-project';
  const projectDirectory = join(process.cwd(), 'tmp', projectName);

  // Ensure projectDirectory is empty
  rmSync(projectDirectory, {
    recursive: true,
    force: true,
  });
  mkdirSync(dirname(projectDirectory), {
    recursive: true,
  });

  execSync(`npx --yes create-nx-workspace@latest ${projectName} --preset xystemize --nxCloud=skip --no-interactive`, {
    cwd: dirname(projectDirectory),
    stdio: 'inherit',
    env: process.env,
  });
  console.info(`Created test project in "${projectDirectory}"`);

  return projectDirectory;
}
