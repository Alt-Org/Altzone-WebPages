import { Meta } from '@storybook/react';
import NavbarDesktop, { NavbarProps } from './NavbarDesktop';
import { getNavbarBuildByTypeAndSize } from '../../model/getNavbarBuildByTypeAndSize';
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
        isCollapsed: false,
        toggleFixed: () => undefined,
        toggleCollapsed: () => undefined,
        className: '',
        navBarType: 'Default',
        navbarBuild: getNavbarBuildByTypeAndSize('Default', 'desktop'),
    },
    tags: ['autodocs'],
};

export default meta;

export const Navbar = (args: NavbarProps) => <NavbarDesktop {...args} />;
