import { Meta, StoryObj } from '@storybook/nextjs';
import NavbarMobile from './NavbarMobile';
import { getNavbarBuildBySize } from '../../model/getNavbarBuildBySize';

const meta: Meta<typeof NavbarMobile> = {
    title: '@/widgets/Navbar/ui/NavbarMobileV2/NavbarMobile',
    component: NavbarMobile,
    argTypes: {
        marginTop: {
            description: 'Margin at the top',
            control: { type: 'number' },
        },
        onDropdownChange: {
            description:
                'The function is informed in the dropdown open/close event whether the dropdown is open',
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

export const Default: StoryObj<typeof NavbarMobile> = {
    args: {
        marginTop: 0,
        onDropdownChange: (_collapsed) => {
            /*console.log(`dropdownChange ${_collapsed}`)*/
        },
        className: '',
        navbarBuild: getNavbarBuildBySize('mobile'),
    },
};
