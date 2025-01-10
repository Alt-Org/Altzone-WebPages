import { ComponentStory, ComponentMeta } from '@storybook/react';
import { NewClanForm } from './NewClanForm';

export default {
    title: 'features/NewClanForm',
    component: NewClanForm,
    args: {
        className: '',
    },
} as ComponentMeta<typeof NewClanForm>;

const Template: ComponentStory<typeof NewClanForm> = (args) => {
    return <NewClanForm {...args} />;
};

export const Default = Template.bind({});
