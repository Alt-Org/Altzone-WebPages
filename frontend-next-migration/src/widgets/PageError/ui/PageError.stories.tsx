import { StoryObj, Meta } from '@storybook/nextjs';
import { PageError } from './PageError';

export default {
    title: 'widgets/PageError',
    component: PageError,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as Meta<typeof PageError>;

export const Primary: StoryObj<typeof PageError> = {};
