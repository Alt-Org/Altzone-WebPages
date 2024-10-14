import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { NavGoBackButton } from './NavGoBackButton';

export default {
    title: 'features/NavGoBack',
    component: NavGoBackButton,
    args: {
        className: '',

    },
} as ComponentMeta<typeof NavGoBackButton>;

const Template: ComponentStory<typeof NavGoBackButton> = (args) => {
    return (
            <NavGoBackButton {...args} />
    );
};

export const Default = Template.bind({});

