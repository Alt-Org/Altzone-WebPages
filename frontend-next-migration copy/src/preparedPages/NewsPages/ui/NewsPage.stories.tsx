import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import NewsPage from './NewsPage';

export default {
    title: 'pages/NewsPage',
    component: NewsPage,
} as ComponentMeta<typeof NewsPage>;

// @ts-ignore
const Template: ComponentStory<typeof NewsPage> = (args) => <NewsPage {...args} />;

export const Primary = Template.bind({});
Primary.args = {};

