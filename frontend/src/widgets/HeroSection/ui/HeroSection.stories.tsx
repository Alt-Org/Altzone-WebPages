import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { HeroSection } from './HeroSection';


export default {
  title: 'widgets/HeroSection',
  component: HeroSection,
  // argTypes: {
  //   backgroundColor: { control: 'color' },
  // },
} as ComponentMeta<typeof HeroSection>;

const Template: ComponentStory<typeof HeroSection> = (args) => <HeroSection {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
