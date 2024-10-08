import { Meta, StoryObj } from '@storybook/react';
import { SocialSection } from './SocialSection';
import { socialIconLinks } from '../../model/data/socialSectionMenu';

const meta: Meta<typeof SocialSection> = {
    title: 'widgets/Footer/SocialSection',
    component: SocialSection,
    args: {
        className: '',
        socialIconLinks: socialIconLinks,
    },
};

export default meta;

type Story = StoryObj<typeof SocialSection>;

export const Default: Story = {
    args: {
        socialIconLinks: socialIconLinks,
    },
};
