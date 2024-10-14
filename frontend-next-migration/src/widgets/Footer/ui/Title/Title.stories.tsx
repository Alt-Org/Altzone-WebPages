import { Meta, StoryObj } from '@storybook/react';
import { Title } from './Title';

const meta: Meta<typeof Title> = {
    title: 'widgets/Footer/Title',
    component: Title,
    args: {
        className: '',
        title: 'Be part of our community 😊',
    },
};

export default meta;

type Story = StoryObj<typeof Title>;

export const Default: Story = {
    args: {
        title: 'Be part of our community 😊',
    },
};
