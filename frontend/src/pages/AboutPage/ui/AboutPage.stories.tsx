import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import AboutPage from './AboutPage';

export default {
    title: 'pages/AboutPage',
    component: AboutPage,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof AboutPage>;

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const Template: ComponentStory<typeof AboutPage> = (args) => <AboutPage {...args} />;

export const Primary = Template.bind({});
Primary.args = {};




