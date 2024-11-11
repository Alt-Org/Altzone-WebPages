import { Meta } from '@storybook/react';
import React from 'react';
import NavbarDesktop from './NavbarDesktop';
import { getNavbarBuildByTypeAndSize } from '../../model/getNavbarBuildByTypeAndSize';
import { NavbarBuild, NavBarType } from '../../model/types';

type NavbarProps = {
    marginTop?: number;
    className?: string;
    navbarBuild: NavbarBuild;
    isFixed?: boolean;
    navBarType?: NavBarType;
};

const meta: Meta<typeof NavbarDesktop> = {
    title: '@/widgets/Navbar/ui/NavbarDesktop/NavbarDesktop',
    component: NavbarDesktop,
    argTypes: {
        marginTop: {
            description: 'Margin at the top',
        },
        className: {
            description: 'Additional CSS classes',
        },
        navbarBuild: {
            description: 'Navigation bar components according to usage type and view size',
        },
        isFixed: {
            description: 'This is deprecated. Fixed type is get from context',
        },
        navBarType: {
            description: 'Navbar type',
        },
    },
    args: {
        marginTop: 0,
        isFixed: false,
        className: '',
        navBarType: 'Default',
        navbarBuild: getNavbarBuildByTypeAndSize('Default', 'desktop'),
    },
    tags: ['autodocs'],
};

export default meta;

// Without a scrollbar, the collapse mode is buggy
export const Navbar = (args: NavbarProps) => <NavbarDesktop {...args} />;
