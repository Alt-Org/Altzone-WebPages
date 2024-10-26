import { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Loader } from './Loader';

const meta = {
    title: 'shared/ui/Loader',
    component: Loader,
    argTypes: {
        className: {
            control: 'text',
            description:
                'Additional CSS class names to apply to the root container for custom styling.',
            defaultValue: '',
        },
    },
    args: {
        className: '',
    },
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'Loader component displays an animated loading indicator.',
            },
        },
    },
} satisfies Meta<typeof Loader>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        className: '',
    },
};
