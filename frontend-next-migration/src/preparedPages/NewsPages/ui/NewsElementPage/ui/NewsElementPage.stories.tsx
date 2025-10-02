import { Meta, StoryObj } from '@storybook/nextjs';
import NewsElementPage from './NewsElementPage';

export default {
    title: 'pages/NewsPageElement',
    component: NewsElementPage,
} as Meta<typeof NewsElementPage>;

export const Primary: StoryObj<typeof NewsElementPage> = {};
