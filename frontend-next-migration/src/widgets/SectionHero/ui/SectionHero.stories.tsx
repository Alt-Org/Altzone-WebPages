import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { SectionHero } from './SectionHero';


export default {
  title: 'widgets/SectionHero',
  component: SectionHero,
  // argTypes: {
  //   backgroundColor: { control: 'color' },
  // },
} as ComponentMeta<typeof SectionHero>;

const Template: ComponentStory<typeof SectionHero> = (args) => <SectionHero {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
