import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import NavItem from './NavItem';
import {
    ItemType,
    NavbarDropDownObject,
    NavbarLinkObject,
    NavbarMenuItem,
    NavLogoObject,
} from '../../model/types';
import { PermissionError, useUserPermissionsV2 } from '@/entities/Auth';

// Mock next/image
jest.mock('next/image', () => ({
    __esModule: true,
    default: (props: any) => (
        <img
            alt={props.alt ?? ''}
            {...props}
        />
    ),
}));

// Mock translations
jest.mock('@/shared/i18n', () => ({
    useClientTranslation: () => ({
        t: (key: string) => key,
    }),
}));

// Mock permissions
jest.mock('@/entities/Auth', () => ({
    useUserPermissionsV2: jest.fn(() => ({
        checkPermissionFor: () => ({ isGranted: true }),
    })),
}));

// Mock DropdownWrapper to always show content in tests
jest.mock('@/shared/ui/DropdownWrapper', () => ({
    DropdownWrapper: ({ children, elements, contentAbsolute, contentClassName }: any) => (
        <div
            className={`DropdownWrapper ${contentAbsolute ? 'contentAbsolute' : ''}`}
            role="button"
            aria-haspopup="true"
        >
            <div className="childrenWrapper">{children}</div>
            <div
                className={`dropdownContent ${contentClassName}`}
                role="menu"
            >
                {elements.map((element: any, index: number) => (
                    <div
                        key={index}
                        role="menuitem"
                    >
                        {element.link ? (
                            <a href={element.link.path}>{element.elementText}</a>
                        ) : (
                            <span>{element.elementText}</span>
                        )}
                    </div>
                ))}
            </div>
        </div>
    ),
}));

describe('NavItem Component', () => {
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

        render(<NavItem item={item} />);

        expect(screen.getByText('Home')).toBeInTheDocument();
        expect(screen.getByRole('link')).toHaveAttribute('href', '/');
    });

    it('should render navDropDown correctly with permitted elements', async () => {
        const item: NavbarDropDownObject = {
            name: 'Menu',
            isActive: true,
            type: ItemType.navDropDown,
            elements: [
                { elementText: 'Profile', link: { path: '/profile', isExternal: false } },
                { elementText: 'Settings', link: { path: '/settings', isExternal: false } },
            ],
        };

        render(<NavItem item={item} />);

        const menuItem = screen.getByText('Menu');
        const dropdownWrapper = menuItem.closest('[role="button"]');
        expect(dropdownWrapper).toBeInTheDocument();

        if (!dropdownWrapper) throw new Error('Dropdown wrapper not found');
        fireEvent.mouseEnter(dropdownWrapper);

        await waitFor(() => {
            const menuItems = screen.getAllByRole('menuitem');
            expect(menuItems).toHaveLength(2);
            expect(menuItems[0]).toHaveTextContent('Profile');
            expect(menuItems[1]).toHaveTextContent('Settings');
        });
    });

    it('should render navLogo correctly', () => {
        const item: NavLogoObject = {
            name: 'Logo',
            src: '/logo.png',
            path: '/',
            type: ItemType.navLogo,
        };

        render(<NavItem item={item} />);

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
                    link: { isExternal: true, path: '/clan' },
                },
            ],
        };

        render(<NavItem item={item} />);

        expect(screen.queryByText('clanpage')).not.toBeInTheDocument();
    });

    it('should render clan page link if user has permission', async () => {
        const item: NavbarDropDownObject = {
            name: 'Menu',
            isActive: true,
            type: ItemType.navDropDown,
            elements: [{ elementText: 'clanpage', link: { path: '/clan', isExternal: true } }],
        };

        render(<NavItem item={item} />);

        const menuItem = screen.getByText('Menu');
        const dropdownWrapper = menuItem.closest('[role="button"]');
        if (!dropdownWrapper) throw new Error('Dropdown wrapper not found');
        fireEvent.mouseEnter(dropdownWrapper);

        await waitFor(() => {
            const menuItems = screen.getAllByRole('menuitem');
            expect(menuItems[0]).toHaveTextContent('clanpage');
        });
    });

    it('should not render anything for unknown item type', () => {
        const item = { name: 'Unknown', type: 'unknownType' } as unknown as NavbarMenuItem;

        const { container } = render(<NavItem item={item} />);

        expect(container.firstChild).toBeNull();
    });

    it('should translate item names', () => {
        const item: NavbarLinkObject = {
            name: 'TranslatedName',
            path: '/',
            isActive: true,
            type: ItemType.navLink,
        };

        render(<NavItem item={item} />);

        expect(screen.getByText('TranslatedName')).toBeInTheDocument();
    });

    it('should not apply active class when item is not active', () => {
        const item: NavbarLinkObject = {
            name: 'InactiveLink',
            path: '/',
            isActive: false,
            type: ItemType.navLink,
        };

        render(<NavItem item={item} />);

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
            elements: [{ elementText: 'Option1', link: { path: '/option1', isExternal: false } }],
        };

        render(<NavItem item={item} />);

        const menuItem = screen.getByText('Menu');
        const dropdownWrapper = menuItem.closest('[role="button"]');
        if (!dropdownWrapper) throw new Error('Dropdown wrapper not found');
        fireEvent.mouseEnter(dropdownWrapper);

        await waitFor(() => {
            const menuItems = screen.getAllByRole('menuitem');
            expect(menuItems[0]).toHaveTextContent('Option1');
        });
    });

    it('should have correct href in navLink', () => {
        const item: NavbarLinkObject = {
            name: 'Home',
            path: '/home',
            isActive: true,
            type: ItemType.navLink,
        };

        render(<NavItem item={item} />);

        const linkElement = screen.getByRole('link');
        expect(linkElement).toHaveAttribute('href', '/home');
    });
});
