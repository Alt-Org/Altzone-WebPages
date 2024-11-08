import { Meta } from '@storybook/react';
import React from 'react';
import NavbarMobile from './NavbarMobile';
import { getNavbarBuildByTypeAndSize } from '../../model/getNavbarBuildByTypeAndSize';
import { NavbarBuild, NavBarType } from '../../model/types';

interface NavbarTouchProps {
    marginTop?: number;
    onBurgerButtonClick?: (isMenuOpen: boolean) => void;
    navbarBuild?: NavbarBuild;
    side?: 'left' | 'right';
    className?: string;
    navBarType?: NavBarType;
}

const meta: Meta<typeof NavbarMobile> = {
    title: '@/widgets/Navbar/ui/NavbarMobile/NavbarMobile',
    component: NavbarMobile,
    argTypes: {
        marginTop: {
            description: 'Margin at the top',
        },
        onBurgerButtonClick: {
            description:
                'The function is informed in the button event whether the sidebar is open.',
        },
        className: {
            description: 'Additional CSS classes',
        },
        side: {
            description: 'On which side does the sidebar appear?',
        },
        navbarBuild: {
            description: 'Navigation bar components according to usage type and view size',
        },
        navBarType: {
            description: 'Navbar type',
        },
    },
    args: {
        marginTop: 0,
        side: 'left',
        className: '',
        navBarType: 'Default',
        navbarBuild: getNavbarBuildByTypeAndSize('Default', 'mobile'),
    },
    tags: ['autodocs'],
};

export default meta;

// Without a scrollbar, the collapse mode is buggy
export const Navbar = (args: NavbarTouchProps) => <NavbarMobile {...args} />;
