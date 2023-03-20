import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Sidebar } from './Sidebar';

export default {
    title: 'widget/Sidebar',
    component: Sidebar,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Sidebar>;

const Template: ComponentStory<typeof Sidebar> = (args) => <Sidebar {...args} />;

export const Primary = Template.bind({});
Primary.args = {};

