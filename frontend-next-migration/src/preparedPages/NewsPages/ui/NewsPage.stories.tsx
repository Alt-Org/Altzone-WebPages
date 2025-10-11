import { Meta, StoryObj } from '@storybook/nextjs';
import NewsPage from './NewsPage';

export default {
    title: 'pages/NewsPage',
    component: NewsPage,
} as Meta<typeof NewsPage>;

export const Primary: StoryObj<typeof NewsPage> = {};
