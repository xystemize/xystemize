export const generalDependencies = {
  dayjs: '^1.11.10',
  dotenv: '^16.4.5',
  'env-var': '^7.4.1',
  mobx: '^6.12.0',
  'mobx-react-lite': '^4.0.5',
  lodash: '^4.17.21',
};

export const generalDevDependencies = {
  husky: '^9.0.11',
  'lint-staged': '^15.2.2',
  'eslint-plugin-simple-import-sort': '^12.0.0',
  'eslint-plugin-unused-imports': '^3.1.0',
};

export const backendDependencies = {
  'firebase-admin': '^12.0.0',
  'firebase-functions': '^4.7.0',
};

export const backendDevDependencies = {
  'firebase-tools': '^13.4.0',
};

export const frontendDependencies = {
  firebase: '^10.8.0',
};

export const frontendDevDependencies = {};

export const mobileDependencies = {
  ...frontendDependencies,
};

export const mobileDevDependencies = {
  ...frontendDevDependencies,
};

export const webDependencies = {
  ...frontendDependencies,
};

export const webDevDependencies = {
  ...frontendDevDependencies,
};

export const allDependencies = {
  ...generalDependencies,
  ...backendDependencies,
  ...frontendDependencies,
  ...mobileDependencies,
  ...webDependencies,
};

export const allDevDependencies = {
  ...generalDevDependencies,
  ...backendDevDependencies,
  ...frontendDevDependencies,
  ...mobileDevDependencies,
  ...webDevDependencies,
};
