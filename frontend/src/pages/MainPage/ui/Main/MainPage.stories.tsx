import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import MainPage from './MainPage';

export default {
    title: 'pages/MainPage',
    component: MainPage,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof MainPage>;

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//  @ts-ignore
const Template: ComponentStory<typeof MainPage> = (args:never) => <MainPage {...args} />;

export const Primary = Template.bind({});
Primary.args = {};


