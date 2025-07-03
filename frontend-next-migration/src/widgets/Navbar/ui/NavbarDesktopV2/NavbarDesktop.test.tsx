import { render, screen, fireEvent } from '@testing-library/react';
import { useClientTranslation } from '@/shared/i18n';
import useIsPageScrollbar from '@/shared/lib/hooks/useIsPageScrollbar';
import { getNavbarBuildBySize } from '../../model/getNavbarBuildBySize';
import NavbarDesktop from './NavbarDesktop';
import { usePathname } from 'next/navigation';
import cls from './NavbarDesktop.module.scss';

jest.mock('@/shared/i18n', () => ({
    useClientTranslation: jest.fn(),
}));

jest.mock('@/entities/Auth', () => ({
    useLoginMutation: jest.fn(),
    useLogoutMutation: () => [jest.fn()],
    useUserPermissionsV2: () => ({
        checkPermissionFor: (what: string) => {
            if (what === 'login') return { isGranted: true };
            return { isGranted: false };
        },
    }),
}));

jest.mock('@/shared/lib/hooks/useIsPageScrollbar');
jest.mock('react-i18next', () => ({
    useTranslation: jest.fn().mockReturnValue({
        t: jest.fn((key) => key),
        i18n: { language: 'en', changeLanguage: jest.fn() },
    }),
}));

jest.mock('next/navigation', () => ({
    usePathname: jest.fn(),
}));

describe('NavbarDesktop', () => {
    const mockToggleCollapsed = jest.fn();
    const mockToggleFixed = jest.fn();

    beforeEach(() => {
        (useClientTranslation as jest.Mock).mockReturnValue({ t: jest.fn((key) => key) });
        (useIsPageScrollbar as jest.Mock).mockReturnValue(true);
        (usePathname as jest.Mock).mockReturnValue('/some/path');
        jest.clearAllMocks();
    });

    const renderNavbar = (props = {}) => {
        return render(
            <NavbarDesktop
                toggleCollapsed={mockToggleCollapsed}
                isCollapsed={false}
                isFixed={false}
                toggleFixed={mockToggleFixed}
                navbarBuild={getNavbarBuildBySize('desktop')}
                {...props}
            />,
        );
    };

    test('renders basic navbar structure', () => {
        renderNavbar();

        expect(screen.getByRole('navigation')).toBeInTheDocument();
        expect(screen.getByTestId('toggleFixButtonWrapper')).toBeInTheDocument();
    });

    test('applies correct classes when fixed', () => {
        renderNavbar({ isFixed: true });

        const nav = screen.getByRole('navigation');
        expect(nav).toHaveClass(cls.fixed);
        expect(screen.getByTestId('collapseExpandWrapper')).toBeInTheDocument();
    });

    test('handles collapse button click', () => {
        renderNavbar({ isFixed: true });

        const collapseButton = screen.getByTestId('collapseExpandWrapper');
        const button = collapseButton.querySelector('button');
        if (!button) throw new Error('Button not found');

        fireEvent.click(button);
        expect(mockToggleCollapsed).toHaveBeenCalled();
    });

    test('handles fix button click', () => {
        renderNavbar();

        const fixButton = screen.getByTestId('toggleFixButton');
        fireEvent.click(fixButton);

        expect(mockToggleFixed).toHaveBeenCalled();
    });

    test('applies collapsed styles when isCollapsed is true', () => {
        renderNavbar({ isCollapsed: true });

        const navLists = screen.getAllByRole('list');
        expect(navLists[0]).toHaveClass(cls.collapsed);
    });

    test('does not show collapse button when not fixed', () => {
        renderNavbar({ isFixed: false });

        expect(screen.queryByTestId('collapseExpandWrapper')).not.toBeInTheDocument();
    });

    test('handles transition end', () => {
        renderNavbar({ isFixed: true });

        const fixButtonWrapper = screen.getByTestId('toggleFixButtonWrapper');
        fireEvent.transitionEnd(fixButtonWrapper);

        const collapseButton = screen.getByTestId('collapseExpandWrapper');
        const button = collapseButton.querySelector('button');
        if (!button) throw new Error('Button not found');

        fireEvent.click(button);
        expect(mockToggleCollapsed).toHaveBeenCalled();
    });
});
