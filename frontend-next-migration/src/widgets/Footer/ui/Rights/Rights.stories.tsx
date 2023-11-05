import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Rights } from './Rights';

export default {
    title: 'widgets/Footer/Rights',
    component: Rights,
    args: {
        className: '',
    },
} as ComponentMeta<typeof Rights>;

const Template: ComponentStory<typeof Rights> = (args) => <Rights {...args} />;

export const Default = Template.bind({});

