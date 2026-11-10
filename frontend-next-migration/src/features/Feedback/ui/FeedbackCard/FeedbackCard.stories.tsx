import { StoryObj, Meta } from '@storybook/nextjs-vite';
import FeedbackCard from './FeedbackCard';

export default {
    title: 'features/feedback/FeedbackCard',
    component: FeedbackCard,
    args: {
        className: '',
    },
} as Meta<typeof FeedbackCard>;

export const Default: StoryObj<typeof FeedbackCard> = {};
