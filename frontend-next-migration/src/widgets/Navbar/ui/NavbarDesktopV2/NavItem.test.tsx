import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import NavItem from './NavItem';
import { PermissionError, useUserPermissionsV2 } from '@/entities/Auth';
import cls from './NavbarDesktop.module.scss';

// Mock next/image
jest.mock('next/image', () => ({
    __esModule: true,
    default: (props: any) => <img {...props} />,
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

// Mock DropdownWrapper with actual structure
jest.mock('@/shared/ui/DropdownWrapper', () => ({
    DropdownWrapper: ({ children, elements, contentAbsolute, contentClassName }: any) => {
        const [isVisible, setIsVisible] = React.useState(false);

        return (
            <div
                className={`DropdownWrapper ${contentAbsolute ? 'contentAbsolute' : ''}`}
                aria-haspopup="true"
                role="button"
                tabIndex={0}
                onMouseEnter={() => setIsVisible(true)}
                onMouseLeave={() => setIsVisible(false)}
            >
                <div className="childrenWrapper">{children}</div>
                {isVisible && (
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
                )}
            </div>
        );
    },
}));

describe('NavItem Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    const renderNavItem = (item: any, className?: string, currentPath?: string) => {
        render(
            <NavItem
                item={item}
                className={className}
                currentPath={currentPath}
            />,
        );
    };

    const hoverMenuItem = async (menuText: string) => {
        const menuItem = screen.getByText(menuText);
        const dropdownWrapper = menuItem.closest('.DropdownWrapper');
        if (!dropdownWrapper) throw new Error('DropdownWrapper not found');

        fireEvent.mouseEnter(dropdownWrapper);
        await waitFor(() => screen.getByRole('menu'));
    };

    it('should render navDropDown correctly with permitted elements', async () => {
        const item = {
            name: 'Menu',
            type: 'navDropDown' as const,
            elements: [
                { elementText: 'Profile', link: { path: '/profile', isExternal: false } },
                { elementText: 'Settings', link: { path: '/settings', isExternal: false } },
            ],
        };

        renderNavItem(item);
        const menuItem = screen.getByText('Menu');
        expect(menuItem).toBeInTheDocument();

        // Initially dropdown items should not be visible
        expect(screen.queryByRole('link', { name: 'Profile' })).not.toBeInTheDocument();
        expect(screen.queryByRole('link', { name: 'Settings' })).not.toBeInTheDocument();

        // After hover, dropdown items should be visible
        const dropdownWrapper = screen.getByRole('button');
        fireEvent.mouseEnter(dropdownWrapper);
        await waitFor(() => {
            expect(screen.getByRole('link', { name: 'Profile' })).toBeInTheDocument();
            expect(screen.getByRole('link', { name: 'Settings' })).toBeInTheDocument();
        });
    });

    it('should render clan page link if user has permission', async () => {
        jest.mocked(useUserPermissionsV2).mockReturnValue({
            checkPermissionFor: () => ({ isGranted: true }),
        });

        const item = {
            name: 'Menu',
            type: 'navDropDown' as const,
            elements: [{ elementText: 'clanpage', link: { path: '/clan', isExternal: true } }],
        };

        renderNavItem(item);
        await hoverMenuItem('Menu');

        expect(screen.getByRole('link', { name: 'clanpage' })).toBeInTheDocument();
    });

    it('should not render clan page link if user does not have permission', () => {
        (useUserPermissionsV2 as jest.MockedFunction<typeof useUserPermissionsV2>).mockReturnValue({
            checkPermissionFor: () => ({ isGranted: false, error: 'NotInClan' as PermissionError }),
        });

        const item = {
            name: 'Menu',
            type: 'navDropDown' as const,
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

        renderNavItem(item);

        expect(screen.queryByText('clanpage')).not.toBeInTheDocument();
    });

    it('should open dropdown menu on hover', async () => {
        const item = {
            name: 'Menu',
            type: 'navDropDown' as const,
            elements: [{ elementText: 'Option1', link: { path: '/option1', isExternal: false } }],
        };

        renderNavItem(item);
        await hoverMenuItem('Menu');

        expect(screen.getByRole('link', { name: 'Option1' })).toBeInTheDocument();
    });

    it('should render navLink correctly', () => {
        const item = {
            name: 'Home',
            path: '/home',
            type: 'navLink' as const,
        };

        renderNavItem(item);

        const linkElement = screen.getByRole('link', { name: 'Home' });
        expect(linkElement).toBeInTheDocument();
        expect(linkElement).toHaveAttribute('href', '/home');
    });

    it('should render navLogo correctly', () => {
        const item = {
            name: 'Logo',
            src: '/logo.png',
            path: '/',
            type: 'navLogo' as const,
        };

        renderNavItem(item);

        const logoElement = screen.getByRole('link', { name: 'Logo' });
        expect(logoElement).toBeInTheDocument();
        expect(logoElement).toHaveAttribute('href', '/');
        expect(screen.getByRole('img', { name: 'Logo' })).toBeInTheDocument();
    });

    it('should apply active class to navLink when currentPath matches', () => {
        const item = {
            name: 'Home',
            path: '/home',
            type: 'navLink' as const,
        };

        renderNavItem(item, '', '/home');

        const listItem = screen.getByRole('listitem');
        expect(listItem).toHaveClass(cls.active);
    });

    it('should apply active class to navDropDown when any element is active', async () => {
        const item = {
            name: 'Menu',
            type: 'navDropDown' as const,
            elements: [
                { elementText: 'Profile', link: { path: '/profile', isExternal: false } },
                { elementText: 'Settings', link: { path: '/settings', isExternal: false } },
            ],
        };

        renderNavItem(item, '', '/profile');
        await hoverMenuItem('Menu');

        const listItem = screen.getByRole('listitem');
        expect(listItem).toHaveClass(cls.active);
    });

    it('should render navDropDown with disableClickToggle prop', () => {
        const item = {
            name: 'Menu',
            type: 'navDropDown' as const,
            elements: [{ elementText: 'Option1', link: { path: '/option1', isExternal: false } }],
        };

        renderNavItem(item);
        const dropdownWrapper = screen.getByRole('button');
        expect(dropdownWrapper).toBeInTheDocument();
        expect(dropdownWrapper).toHaveAttribute('aria-haspopup', 'true');
    });

    describe('Custom Styling', () => {
        it('should apply custom className when provided', () => {
            const navLinkItem = {
                name: 'Home',
                path: '/home',
                type: 'navLink' as const,
            };

            renderNavItem(navLinkItem, 'custom-class');

            const listItem = screen.getByRole('listitem');
            expect(listItem).toHaveClass('custom-class');
        });
    });
});
