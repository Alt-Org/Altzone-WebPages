import { Meta, StoryObj } from '@storybook/react';
import React, { FC, memo, ReactNode } from 'react';
import { AppLink, AppLinkTheme } from './AppLink';

const meta = {
    title: 'shared/ui/AppLink',
    component: AppLink,
    argTypes: {
        to: {
            control: 'text',
            description: 'URL to navigate to when the link is clicked.',
            defaultValue: '',
        },
        className: {
            control: 'text',
            description:
                'Additional CSS class names to apply to the root container for custom styling.',
            defaultValue: '',
        },
        theme: {
            control: AppLinkTheme,
            description: 'The theme of the link.',
            defaultValue: AppLinkTheme.PRIMARY,
        },
        isExternal: {
            control: 'boolean',
            description: 'Whether the link is an external link.',
            defaultValue: false,
        },
        children: {
            control: 'text',
            description: 'The content of the link.',
            defaultValue: '',
        },
    },
    args: {
        to: 'https://altzone.fi',
        className: '',
        theme: AppLinkTheme.PRIMARY,
        isExternal: true,
        children: 'Lorem Ipsum',
    },
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component:
                    'The `AppLink` component is a reusable component that renders a link. It can handle both internal and external URLs.',
            },
        },
    },
} satisfies Meta<typeof AppLink>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        to: 'https://altzone.fi',
        className: '',
        theme: AppLinkTheme.PRIMARY,
        isExternal: true,
        children: 'Lorem Ipsum',
    },
};
