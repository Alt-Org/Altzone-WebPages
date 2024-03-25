import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { NavElement } from './NavElement';
import {MockNavs} from "../../model/data/navs";

export default {
    title: 'widgets/DescriptionWithNav/NavElement',
    component: NavElement,
} as ComponentMeta<typeof NavElement>;

const Template: ComponentStory<typeof NavElement> = (args) => <div style={{display: 'flex' , justifyContent: 'center'}}><NavElement {...args} navElem={MockNavs[0]}/></div>;

export const Default = Template.bind({});
Default.args = {};
