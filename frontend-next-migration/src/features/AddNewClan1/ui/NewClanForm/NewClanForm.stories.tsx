import { StoryObj, Meta } from '@storybook/nextjs';
import { NewClanForm } from './NewClanForm';

export default {
    title: 'features/NewClanForm',
    component: NewClanForm,
    args: {
        className: '',
    },
} as Meta<typeof NewClanForm>;

export const Default: StoryObj<typeof NewClanForm> = {};
