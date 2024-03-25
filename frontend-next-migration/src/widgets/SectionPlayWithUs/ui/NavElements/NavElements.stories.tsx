import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { NavElements } from './NavElements';
import {MockNavs} from "../../model/data/navs";

export default {
    title: 'widgets/DescriptionWithNav/NavElements',
    component: NavElements,
} as ComponentMeta<typeof NavElements>;

const Template: ComponentStory<typeof NavElements> = (args) => <NavElements {...args} navElems={MockNavs}/>;

export const Default = Template.bind({});
Default.args = {};
