import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Container } from './Container';

export default {
    title: 'shared/Container',
    component: Container,
    args: {
        className: '',
        fluid: false,
    },
} as ComponentMeta<typeof Container>;

const Template: ComponentStory<typeof Container> = (args) => {
    return <Container {...args} />;
};

export const Default = Template.bind({});
Default.args = {
    children: <div>Default content</div>,
};

export const Fluid = Template.bind({});
Fluid.args = {
    fluid: true,
    children: <div>Fluid content</div>,
};
