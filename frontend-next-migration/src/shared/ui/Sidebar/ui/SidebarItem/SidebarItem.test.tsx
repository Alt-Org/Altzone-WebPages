import { render, screen } from '@testing-library/react';
import React from 'react';
import {
    ISidebarItem,
    ISidebarItemBasic,
    ISidebarItemDropDown,
    sidebarItemType,
} from '../../model/items';
import { SidebarItem } from './SidebarItem';

jest.mock('@/shared/ui/AppLink/AppLink', () => ({
    AppLink: ({ children, to }: { children: React.ReactNode; to: string }) => (
        <a href={to}>{children}</a>
    ),
    AppLinkTheme: {
        PRIMARY: 'primary',
    },
}));

jest.mock('@/shared/ui/DropdownWrapper', () => ({
    // @ts-ignore
    DropdownWrapper: ({ children }) => <div>{children}</div>,
}));

describe('SidebarItem', () => {
    it('renders a basic sidebar item correctly', () => {
        const item: ISidebarItemBasic = {
            type: sidebarItemType.ISidebarItemBasic,
            path: '/home',
            name: 'Home',
        };
        render(
            <SidebarItem
                item={item}
                collapsed={false}
            />,
        );
        // Check that the element renders
        expect(screen.getByText('Home')).toBeInTheDocument();
        expect(screen.getByRole('link')).toHaveAttribute('href', '/home');
    });

    it('renders a dropdown sidebar item correctly', () => {
        const item: ISidebarItemDropDown = {
            type: sidebarItemType.ISidebarItemDropDown,
            name: 'Settings',
            elements: [
                { elementText: 'Profile', link: { path: '/profile', isExternal: true } },
                { elementText: 'Logout', onClickCallback: jest.fn() },
            ],
        };
        render(
            <SidebarItem
                item={item}
                collapsed={true}
            />,
        );

        // Check that the element renders
        expect(screen.getByText('Settings')).toBeInTheDocument();
        // Additional checks for dropdown elements can be added if necessary
    });

    it('returns null for an unsupported item type', () => {
        const item: ISidebarItem = {
            // @ts-ignore
            type: 'unsupported' as string, // Specify incorrect type
            name: 'Unknown',
            path: '/unknown', // Add required fields
            elements: [], // Empty array for elements
        };

        const { container } = render(
            <SidebarItem
                item={item}
                collapsed={false}
            />,
        );

        // Check that nothing is rendered
        expect(container.firstChild).toBeNull();
    });
});
