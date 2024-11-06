import type { Meta, StoryObj } from '@storybook/react';
import { TestImages } from './SbSvgTest';

const meta = {
    title: 'Test/StorybookSvgTest',
    component: TestImages,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'Component to test SVG icons and image rendering in Storybook.',
            },
        },
    },
    tags: ['autodocs'],
    argTypes: {},
} satisfies Meta<typeof TestImages>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {},
    parameters: {
        docs: {
            description: {
                story: 'Displays an example of SVG icon, footer SVG icons and a PNG image using the `next/image` component.',
            },
        },
    },
};
