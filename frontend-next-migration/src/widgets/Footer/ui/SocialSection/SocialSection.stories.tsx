import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { SocialSection } from './SocialSection';
import {socialIconLinks} from "../../model/data/socialSectionMenu";

export default {
    title: 'widgets/Footer/SocialSection',
    args: {
        className: '',
        socialLinks: socialIconLinks,
    },
} as ComponentMeta<typeof SocialSection>;

const Template: ComponentStory<typeof SocialSection> = (args) => (
    <SocialSection {...args} />
);

export const Default = Template.bind({});

