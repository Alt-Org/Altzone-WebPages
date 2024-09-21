import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import FooterDesktop from './FooterDesktop';
import {socialIconLinks} from "../../model/data/socialSectionMenu";

export default {
  title: 'widgets/Footer/Desktop',
  component: FooterDesktop,
} as ComponentMeta<typeof FooterDesktop>;

const Template: ComponentStory<typeof FooterDesktop> = () => (
    <FooterDesktop
        socialLinks={socialIconLinks}
        title={"Be part of our community 😊"}
        texts={
            {
                consent: "Consent",
                cookies: "Cookies",
                privacy: "Privacy",
                currentYear: new Date().getFullYear(),
            }
        }
    />
);

export const Default = Template.bind({});


// export const CurrentYear = new Date().getFullYear();
// export const CompanyName = "Psyche's Royale Gaming ry";
// export const Cookies = 'Cookies';
// export const Privacy = 'Privacy';