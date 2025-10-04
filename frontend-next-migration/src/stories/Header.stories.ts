import type { Meta, StoryObj } from '@storybook/nextjs';
import { Header } from './Header';
import { action } from 'storybook/actions';

const meta = {
    title: 'Example/Header',
    component: Header,
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
    tags: ['autodocs'],
    parameters: {
        // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
        layout: 'fullscreen',
    },
} satisfies Meta<typeof Header>;

export default meta;

type Story = StoryObj<typeof meta>;

export const LoggedIn: Story = {
    args: {
        user: {
            name: 'Jane Doe',
        },
        onLogin: action('onLogin'),
        onLogout: action('onLogout'),
        onCreateAccount: action('onCreateAccount'),
    },
};

export const LoggedOut: Story = {
    args: {
        user: undefined,
        onLogin: action('onLogin'),
        onLogout: action('onLogout'),
        onCreateAccount: action('onCreateAccount'),
    },
};
