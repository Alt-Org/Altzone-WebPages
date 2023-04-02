import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Title } from './Title';

export default {
    title: 'widgets/Footer/Title',
    component: Title,
    args: {
        className: '',
        children: 'Be part of our Community',
    },
} as ComponentMeta<typeof Title>;

const Template: ComponentStory<typeof Title> = (args) => <Title {...args} />;

export const Default = Template.bind({});
