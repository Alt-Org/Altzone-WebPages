import type { Meta, StoryObj } from '@storybook/nextjs';
import WallIntroAnimation from './WallIntroAnimation';

/**
 * Storybook configuration for the `WallIntroAnimation` component.
 * The `WallIntroAnimation` component renders opening animation for pages or components.
 */
const meta = {
    title: 'features/v2/WallIntroAnimation/wallIntroAnimation',
    component: WallIntroAnimation,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'The `WallIntroAnimation` component renders an opening animation',
            },
        },
    },
    tags: ['autodocs'],
    argTypes: {},
} satisfies Meta<typeof WallIntroAnimation>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * Default story for the `WallIntroAnimation` component.
 * renders opening animation
 */
export const Default: Story = {
    args: {},
    parameters: {
        docs: {
            description: {
                story: 'Displays the `WallIntroAnimation`',
            },
        },
    },
};
