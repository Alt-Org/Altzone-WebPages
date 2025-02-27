import type { Meta, StoryObj } from '@storybook/react';
import WallIntroAnimation from './WallIntroAnimation';

/**
 * Storybook configuration for the `WallIntroAnimation` component.
 * The `WallIntroAnimation` component renders opening animation for pages or components.
 */
const meta = {
    title: 'features/v2/wallIntroAnimation',
    component: WallIntroAnimation,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component:
                    'The `WallIntroAnimation` component renders an opening animation that wraps page or component as a child',
            },
        },
    },
    tags: ['autodocs'],
    argTypes: {
        children: {
            description: 'Renders the children that are wrapped inside the WallIntroAnimation',
        },
    },
} satisfies Meta<typeof WallIntroAnimation>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * Default story for the `WallIntroAnimation` component.
 * renders opening animation
 */
export const Default: Story = {
    args: {
        children: (
            <div>
                <h1>Children</h1>
            </div>
        ),
    },
    parameters: {
        docs: {
            description: {
                story: 'Displays the `WallIntroAnimation',
            },
        },
    },
};
