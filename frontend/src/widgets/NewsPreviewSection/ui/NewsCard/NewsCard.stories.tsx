import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { NewsCard } from './NewsCard';

export default {
    title: 'widgets/newsSection/newsCard',
    component: NewsCard,
} as ComponentMeta<typeof NewsCard>;

const Template: ComponentStory<typeof NewsCard> = (args) => <NewsCard {...args} />;

export const Default = Template.bind({});
Default.args = {};
