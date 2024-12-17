import type { StorybookConfig } from '@storybook/react-vite';
import { join, dirname } from 'path';

const getAbsolutePath = (value: string) => {
  return dirname(require.resolve(join(value, 'package.json')));
};

const config: StorybookConfig = {
  stories: [
    '../lib/**/*.mdx',
    '../lib/**/*.stories.@(js|jsx|mjs|ts|tsx)',
    '../lib/**/components/*.mdx',
    '../lib/**/components/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],
  addons: [
    getAbsolutePath('@storybook/addon-onboarding'),
    getAbsolutePath('@storybook/addon-links'),
    getAbsolutePath('@storybook/addon-essentials'),
    getAbsolutePath('@chromatic-com/storybook'),
    getAbsolutePath('@storybook/addon-interactions'),
  ],
  framework: {
    name: getAbsolutePath('@storybook/react-vite'),
    options: {},
  },
};
export default config;
