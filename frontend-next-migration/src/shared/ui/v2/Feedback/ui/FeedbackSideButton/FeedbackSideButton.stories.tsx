import { StoryObj, Meta } from '@storybook/nextjs';
import { default as FeedbackSideButton } from './FeedbackSideButton';

export default {
    title: 'features/v2/FeedbackByExternalSource/SideButton',
    component: FeedbackSideButton,
    args: {
        className: '',
    },
} as Meta<typeof FeedbackSideButton>;

export const Default: StoryObj<typeof FeedbackSideButton> = {};
