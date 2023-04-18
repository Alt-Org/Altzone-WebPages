import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import WorkersPage from './WorkersPage';

export default {
    title: 'pages/WorkersPage',
    component: WorkersPage,
} as ComponentMeta<typeof WorkersPage>;

// @ts-ignore
const Template: ComponentStory<typeof WorkersPage> = (args) => <WorkersPage {...args} />;

export const Primary = Template.bind({});
Primary.args = {};

