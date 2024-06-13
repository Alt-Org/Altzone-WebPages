import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import NewsElementPage from './NewsElementPage';

export default {
    title: 'pages/NewsPageElement',
    component: NewsElementPage,
} as ComponentMeta<typeof NewsElementPage>;

// @ts-ignore
const Template: ComponentStory<typeof NewsElementPage> = (args) => <NewsElementPage {...args} />;

export const Primary = Template.bind({});
Primary.args = {};

