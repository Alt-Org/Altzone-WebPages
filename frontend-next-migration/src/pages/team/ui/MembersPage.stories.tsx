import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import MembersPage from './MembersPage';

export default {
    title: 'pages/MembersPage',
    component: MembersPage,
} as ComponentMeta<typeof MembersPage>;

// @ts-ignore
const Template: ComponentStory<typeof MembersPage> = (args) => <MembersPage {...args} />;

export const Primary = Template.bind({});
Primary.args = {};

