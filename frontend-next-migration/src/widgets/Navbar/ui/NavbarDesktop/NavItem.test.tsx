import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import NavItem from './NavItem';
import {
    ItemType,
    NavbarBuild,
    NavbarDropDownObject,
    NavbarLinkObject,
    NavbarMenuItem,
    NavLogoObject,
} from '../../model/types';
import { PermissionError, useUserPermissionsV2 } from '@/entities/Auth';
import user from '@testing-library/user-event';

jest.mock('@/shared/i18n', () => ({
    useClientTranslation: () => ({
        t: (key: string) => key,
    }),
}));

jest.mock('@/entities/Auth', () => ({
    useUserPermissionsV2: jest.fn(() => ({
        checkPermissionFor: () => ({ isGranted: true }),
    })),
}));

describe('NavItem Component', () => {
    const navbarBuild: NavbarBuild = {
        menu: [],
        namedMenu: {
            [ItemType.navLogo]: {
                name: 'Logo',
                src: '/logo.png',
                path: '/',
                type: ItemType.navLogo,
            },
        },
    };

    beforeEach(() => {
        jest.clearAllMocks();
        (useUserPermissionsV2 as jest.MockedFunction<typeof useUserPermissionsV2>).mockReturnValue({
            checkPermissionFor: () => ({ isGranted: true }),
        });
    });

    it('should render navLink correctly', () => {
        const item: NavbarLinkObject = {
            name: 'Home',
            path: '/',
            isActive: true,
            type: ItemType.navLink,
        };

        render(
            <NavItem
                item={item}
                navbarBuild={navbarBuild}
            />,
        );

        expect(screen.getByText('Home')).toBeInTheDocument();
        expect(screen.getByRole('link')).toHaveAttribute('href', '/');
    });

    it('should render navDropDown correctly with permitted elements', async () => {
        const item: NavbarDropDownObject = {
            name: 'Menu',
            isActive: true,
            type: ItemType.navDropDown,
            elements: [
                {
                    elementText: 'Profile',
                    link: {
                        isExternal: false,
                        path: '/profile',
                    },
                },

                {
                    elementText: 'Settings',
                    link: {
                        isExternal: false,
                        path: '/settings',
                    },
                },
            ],
        };
        render(
            <NavItem
                item={item}
                navbarBuild={navbarBuild}
            />,
        );

        const menuItem = screen.getByText('Menu');
        expect(menuItem).toBeInTheDocument();

        expect(screen.queryByText('Profile')).not.toBeInTheDocument();
        expect(screen.queryByText('Settings')).not.toBeInTheDocument();

        fireEvent.mouseOver(menuItem);

        await waitFor(() => {
            expect(screen.getByText('Profile')).toBeInTheDocument();
            expect(screen.getByText('Settings')).toBeInTheDocument();
        });
    });

    it('should render navLogo correctly', () => {
        const item: NavLogoObject = {
            name: 'Logo',
            src: '/logo.png',
            path: '/',
            type: ItemType.navLogo,
        };

        render(
            <NavItem
                item={item}
                navbarBuild={navbarBuild}
            />,
        );

        const imgElement = screen.getByRole('img');
        expect(imgElement).toHaveAttribute('src', '/logo.png');
        expect(screen.getByRole('link')).toHaveAttribute('href', '/');
    });

    it('should not render clan page link if user does not have permission', () => {
        (useUserPermissionsV2 as jest.MockedFunction<typeof useUserPermissionsV2>).mockReturnValue({
            checkPermissionFor: () => ({ isGranted: false, error: 'NotInClan' as PermissionError }),
        });
        const item: NavbarDropDownObject = {
            name: 'Menu',
            isActive: true,
            type: ItemType.navDropDown,
            elements: [
                {
                    elementText: 'clanpage',
                    link: {
                        isExternal: true,
                        path: '/clan',
                    },
                },
            ],
        };

        render(
            <NavItem
                item={item}
                navbarBuild={navbarBuild}
            />,
        );

        expect(screen.queryByText('clanpage')).not.toBeInTheDocument();
    });

    it('should render clan page link if user has permission', () => {
        (useUserPermissionsV2 as jest.MockedFunction<typeof useUserPermissionsV2>).mockReturnValue({
            checkPermissionFor: () => ({ isGranted: true }),
        });
        const item: NavbarDropDownObject = {
            name: 'Menu',
            isActive: true,
            type: ItemType.navDropDown,
            elements: [
                {
                    elementText: 'clanpage',
                    link: {
                        isExternal: true,
                        path: '/clan',
                    },
                },
            ],
        };
        render(
            <NavItem
                item={item}
                navbarBuild={navbarBuild}
            />,
        );
        const menu = screen.getByText('Menu');
        user.hover(menu);
        expect(screen.getByText('clanpage')).toBeInTheDocument();
    });

    it('should not render anything for unknown item type', () => {
        // @ts-ignore
        const item = {
            name: 'Unknown',
            type: 'unknownType',
        } as NavbarMenuItem;

        const { container } = render(
            <NavItem
                item={item}
                navbarBuild={navbarBuild}
            />,
        );

        expect(container.firstChild).toBeNull();
    });

    it('should translate item names', () => {
        const item: NavbarLinkObject = {
            name: 'TranslatedName',
            path: '/',
            isActive: true,
            type: ItemType.navLink,
        };

        render(
            <NavItem
                item={item}
                navbarBuild={navbarBuild}
            />,
        );

        expect(screen.getByText('TranslatedName')).toBeInTheDocument();
    });

    it('should not apply active class when item is not active', () => {
        const item: NavbarLinkObject = {
            name: 'InactiveLink',
            path: '/',
            isActive: false,
            type: ItemType.navLink,
        };

        render(
            <NavItem
                item={item}
                navbarBuild={navbarBuild}
            />,
        );

        const linkElement = screen.getByRole('link');
        expect(linkElement).not.toHaveClass('active');
    });

    it('should apply passed className', () => {
        const item: NavbarLinkObject = {
            name: 'Home',
            path: '/',
            isActive: true,
            type: ItemType.navLink,
        };

        render(
            <NavItem
                item={item}
                navbarBuild={navbarBuild}
                className="custom-class"
            />,
        );

        const listItem = screen.getByRole('listitem');
        expect(listItem).toHaveClass('custom-class');
    });

    it('should open dropdown menu on hover', async () => {
        const item: NavbarDropDownObject = {
            name: 'Menu',
            isActive: true,
            type: ItemType.navDropDown,
            elements: [
                {
                    elementText: 'Option1',
                    // @ts-ignore
                    path: '/option1',
                },
            ],
        };

        render(
            <NavItem
                item={item}
                navbarBuild={navbarBuild}
            />,
        );

        const menuItem = screen.getByText('Menu');
        fireEvent.mouseOver(menuItem);

        await waitFor(() => {
            expect(screen.getByText('Option1')).toBeInTheDocument();
        });
    });

    it('should have correct href in navLink', () => {
        const item: NavbarLinkObject = {
            name: 'Home',
            path: '/home',
            isActive: true,
            type: ItemType.navLink,
        };

        render(
            <NavItem
                item={item}
                navbarBuild={navbarBuild}
            />,
        );

        const linkElement = screen.getByRole('link');
        expect(linkElement).toHaveAttribute('href', '/home');
    });
});
