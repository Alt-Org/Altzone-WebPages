import type { Meta, StoryObj } from '@storybook/react';
import IntroWall from './IntroWall';

/**
 * Storybook configuration for the `IntroWall` component.
 * The `IntroWall` component renders animation of crumbling wall.
 */
const meta = {
    title: 'features/v2/IntroWall/IntroWall',
    component: IntroWall,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component:
                    'The `IntroWall` component renders an opening animation of crumbling wall',
            },
        },
    },
    tags: ['autodocs'],
    argTypes: {},
} satisfies Meta<typeof IntroWall>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * Default story for the `IntroWall` component.
 * renders IntroWall animation
 */
export const Default: Story = {
    args: {},
    parameters: {
        docs: {
            description: {
                story: 'Displays the `IntroWall` component',
            },
        },
    },
};
