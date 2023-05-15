import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { NewsCards } from './NewsCards';

export default {
    title: 'widgets/newsSection/newsCard',
    component: NewsCards,
} as ComponentMeta<typeof NewsCards>;

const Template: ComponentStory<typeof NewsCards> = (args) => <NewsCards {...args} />;

export const Default = Template.bind({});
Default.args = {};
