import { StoryObj, Meta } from '@storybook/nextjs-vite';
import { NavGoBackButton } from './NavGoBackButton';

export default {
    title: 'features/NavGoBack',
    component: NavGoBackButton,
    args: {
        className: '',
    },
} as Meta<typeof NavGoBackButton>;

export const Default: StoryObj<typeof NavGoBackButton> = {};
