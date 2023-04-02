import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Sidebar } from './Sidebar';

export default {
    title: 'shared/Sidebar',
    component: Sidebar,
    argTypes: {
        buttonClassName: { control: 'text' },
        side: { control: { type: 'select', options: ['left', 'right'] } },
        closeOnClickOutside: { control: 'boolean' },
    },
} as ComponentMeta<typeof Sidebar>;

const sidebarItemsList = [
        {
            name: 'Item 1',
            path: '#item1',

        },
        {
            name: 'Item 2',
            path: '#item2',
        },
    ]

const Template: ComponentStory<typeof Sidebar> = (args) => <Sidebar {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    buttonClassName: '',
    sidebarItemsList: sidebarItemsList,
    side: 'left',
    closeOnClickOutside: false,
};
