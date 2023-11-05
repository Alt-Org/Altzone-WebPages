import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { SocialSection } from './SocialSection';
import {socialLinks} from "../../model/data/socialSectionMenu";

export default {
    title: 'widgets/Footer/SocialSection',
    args: {
        className: '',
        socialLinks: socialLinks,
    },
} as ComponentMeta<typeof SocialSection>;

const Template: ComponentStory<typeof SocialSection> = (args) => (
    <SocialSection {...args} />
);

export const Default = Template.bind({});

