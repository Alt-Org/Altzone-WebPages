import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import FooterDesktop from './FooterDesktop';

export default {
  title: 'widgets/Footer/Desktop',
  component: FooterDesktop,
} as ComponentMeta<typeof FooterDesktop>;

const Template: ComponentStory<typeof FooterDesktop> = () => (
    <FooterDesktop/>
);

export const Default = Template.bind({});


