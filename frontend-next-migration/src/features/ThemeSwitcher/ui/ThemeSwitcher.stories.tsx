import { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ThemeSwitcher } from './ThemeSwitcher';

export default {
    title: 'features/ThemeSwitcher',
    component: ThemeSwitcher,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as Meta<typeof ThemeSwitcher>;

export const Primary: StoryObj<typeof ThemeSwitcher> = {};
