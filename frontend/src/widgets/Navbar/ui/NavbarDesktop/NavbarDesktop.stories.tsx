import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Navbar from './NavbarDesktop';

export default {
  title: 'widgets/Navbar',
  component: Navbar,
  // argTypes: {
  //   backgroundColor: { control: 'color' },
  // },
} as ComponentMeta<typeof Navbar>;

const Template: ComponentStory<typeof Navbar> = (args) => <Navbar {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
