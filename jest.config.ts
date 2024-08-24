import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  verbose: true,
  testEnvironment: "jsdom",
  testPathIgnorePatterns: [
    '/node_modules/',
    '/dist'
  ],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  projects: [
    {
      testPathIgnorePatterns: ["<rootDir>/node_modules/"],
      preset: "ts-jest",
      displayName: "providers",
      testMatch: ["<rootDir>/packages/providers/__tests__/**/*.spec.ts"],
    }
  ],
};
export default config;
