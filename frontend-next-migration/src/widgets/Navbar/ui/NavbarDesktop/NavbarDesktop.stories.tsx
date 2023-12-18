import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import NavbarDesktop from './NavbarDesktop';
import { navbarMenuDesktopMock } from '../../model/data/navbarMenuDesktop.mock';

export default {
  title: 'widgets/Navbar/Desktop',
  component: NavbarDesktop,
} as ComponentMeta<typeof NavbarDesktop>;

const Template: ComponentStory<typeof NavbarDesktop> = (args) => (
    <NavbarDesktop {...args} />
);

export const Default = Template.bind({});
Default.args = {
  overlaid: false,
  marginTop: 0,
  navbarMenu: navbarMenuDesktopMock,
};

export const WithOverlay = Template.bind({});
WithOverlay.args = {
  overlaid: true,
  marginTop: 0,
  navbarMenu: navbarMenuDesktopMock,
};

export const WithMarginTop = Template.bind({});
WithMarginTop.args = {
  overlaid: false,
  marginTop: 25,
  navbarMenu: navbarMenuDesktopMock,
};

export const WithoutMenu = Template.bind({});
WithoutMenu.args = {
  overlaid: false,
  marginTop: 0,
  navbarMenu: [],
};
