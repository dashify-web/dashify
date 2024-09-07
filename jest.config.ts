import type { Config } from '@jest/types';

const projects = (
  ...projectNames: string[]
): Config.InitialProjectOptions[] => {
  return projectNames.map((projectName) => ({
    testPathIgnorePatterns: ['<rootDir>/node_modules/'],
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    displayName: projectName,
    testMatch: [
      `<rootDir>/packages/${projectName}/__tests__/**/*.spec.ts`,
      `<rootDir>/packages/${projectName}/__tests__/**/*.spec.tsx`,
      `<rootDir>/packages/${projectName}/__tests__/**/**/*.spec.ts`,
      `<rootDir>/packages/${projectName}/__tests__/**/**/*.spec.tsx`,
    ],
  }));
};

const config: Config.InitialOptions = {
  verbose: true,
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testPathIgnorePatterns: ['/node_modules/', '/dist'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  projects: projects('utils', 'providers', 'auth-routes', 'core'),
};
export default config;
