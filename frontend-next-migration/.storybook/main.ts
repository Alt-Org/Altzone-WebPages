import { fileURLToPath } from 'node:url';
import type { StorybookConfig } from '@storybook/nextjs-vite';
import { mergeConfig } from 'vite';

const srcPath = fileURLToPath(new URL('../src', import.meta.url));

const config: StorybookConfig = {
    stories: [
        // "../src/**/*.mdx",
        '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)',
    ],

    // stories: [
    //   '../src/**/*.stories.@(js|jsx|ts|tsx)'
    // ],

    addons: ['@storybook/addon-links', '@storybook/addon-onboarding', '@storybook/addon-docs'],

    framework: {
        name: '@storybook/nextjs-vite',
        options: {},
    },
    viteFinal: (config) =>
        mergeConfig(config, {
            resolve: {
                alias: {
                    '@': srcPath,
                },
            },
            css: {
                preprocessorOptions: {
                    scss: {
                        additionalData: '@use "@/app/_styles/variables/_mixins.scss" as *;\n',
                    },
                },
            },
        }),
};
export default config;
