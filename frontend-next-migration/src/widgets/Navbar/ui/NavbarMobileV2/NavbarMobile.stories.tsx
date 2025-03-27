import { Meta, Story } from '@storybook/react';
import React from 'react';
import NavbarMobile, { NavbarTouchProps } from './NavbarMobile';
import { getNavbarBuildBySize } from '../../model/getNavbarBuildBySize';

const meta: Meta<typeof NavbarMobile> = {
    title: '@/widgets/Navbar/ui/NavbarMobileV2/NavbarMobile',
    component: NavbarMobile,
    argTypes: {
        marginTop: {
            description: 'Margin at the top',
            control: { type: 'number' },
        },
        onBurgerButtonClick: {
            description:
                'The function is informed in the button event whether the sidebar is open.',
            action: 'clicked',
        },
        className: {
            description: 'Additional CSS classes',
            control: { type: 'text' },
        },
        navbarBuild: {
            description: 'Navigation bar components according to usage type and view size',
            control: { type: 'object' },
        },
    },
    args: {
        marginTop: 0,
        className: '',
        navbarBuild: getNavbarBuildBySize('mobile'),
    },
    tags: ['autodocs'],
};

export default meta;

const Template: Story<NavbarTouchProps> = (args) => <NavbarMobile {...args} />;

export const Default = Template.bind({});
Default.args = {
    marginTop: 0,
    className: '',
    navbarBuild: getNavbarBuildBySize('mobile'),
};
