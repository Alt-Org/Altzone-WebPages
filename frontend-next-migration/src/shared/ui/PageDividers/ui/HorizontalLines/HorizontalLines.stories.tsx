import { Meta, StoryObj } from '@storybook/react';
import HorizontalLines from './HorizontalLines';

const meta = {
    title: 'shared/ui/HorizontalLines',
    component: HorizontalLines,
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component:
                    'The `HorizontalLines` component is a reusable component that renders horizontal lines.',
            },
        },
    },
} satisfies Meta<typeof HorizontalLines>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
