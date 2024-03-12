import { getJestProjects } from '@nx/jest';

export default {
  projects: getJestProjects(),
  testTimeout: 300000,
};
