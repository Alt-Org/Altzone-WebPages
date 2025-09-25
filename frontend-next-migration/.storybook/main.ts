import type { StorybookConfig } from '@storybook/nextjs';
import path from 'path';

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
        name: '@storybook/nextjs',
        options: {
            builder: {
                useSWC: true, // Enables SWC support
            },
        },
    },
    webpackFinal: async (config) => {
        config.resolve = config.resolve || {};
        config.resolve.alias = {
            ...(config.resolve.alias || {}),
            '@': path.resolve(__dirname, '../src'),
        };
        if (config.module?.rules) {
            config.module.rules.push({
                test: /\.scss$/,
                loader: 'sass-loader',
                options: {
                    additionalData: `
           @use "@/app/_styles/variables/_mixins.scss" as *;
         `,
                },
            });
        }
        return config;
    },
};
export default config;
