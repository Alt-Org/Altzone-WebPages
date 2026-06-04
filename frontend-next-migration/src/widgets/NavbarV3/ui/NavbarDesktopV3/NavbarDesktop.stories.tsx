import { Meta } from '@storybook/nextjs';
import NavbarDesktop, { NavbarProps } from './NavbarDesktop';
import { getNavbarBuildBySize } from '../../model/getNavbarBuildBySize';

const meta: Meta<typeof NavbarDesktop> = {
    title: 'widgets/Navbar/ui/NavbarDesktopV3/NavbarDesktop',
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
    },
    args: {
        marginTop: 0,
        className: '',
        navbarBuild: getNavbarBuildBySize('desktop'),
    },
    tags: ['autodocs'],
};

export default meta;

export const Navbar = (args: NavbarProps) => <NavbarDesktop {...args} />;
