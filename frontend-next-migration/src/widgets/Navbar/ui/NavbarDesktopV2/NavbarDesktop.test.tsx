import { render, screen, fireEvent } from '@testing-library/react';
import { useClientTranslation } from '@/shared/i18n';
import useIsPageScrollbar from '@/shared/lib/hooks/useIsPageScrollbar';
import { getNavbarBuildBySize } from '../../model/getNavbarBuildBySize';
import NavbarDesktop from './NavbarDesktop';
import { usePathname } from 'next/navigation';

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

describe('Navbar', () => {
    beforeEach(() => {
        (useClientTranslation as jest.Mock).mockReturnValue({ t: jest.fn((key) => key) });
        (useIsPageScrollbar as jest.Mock).mockReturnValue(true);
    });

    test('render components', async () => {
        render(<div />);
    });
});

describe('NavbarDesktop', () => {
    beforeEach(() => {
        (useClientTranslation as jest.Mock).mockReturnValue({ t: jest.fn((key) => key) });
        (useIsPageScrollbar as jest.Mock).mockReturnValue(true);
        (usePathname as jest.Mock).mockReturnValue('/some/path');
    });

    test('renders NavbarDesktop component', () => {
        render(
            <NavbarDesktop
                toggleCollapsed={jest.fn()}
                isCollapsed={false}
                isFixed={false}
                toggleFixed={jest.fn()}
                navbarBuild={getNavbarBuildBySize('desktop')}
            />,
        );

        expect(screen.getByRole('navigation')).toBeInTheDocument();
    });

    test('toggles fixed state', () => {
        const toggleFixed = jest.fn();
        render(
            <NavbarDesktop
                toggleCollapsed={jest.fn()}
                isCollapsed={false}
                isFixed={false}
                toggleFixed={toggleFixed}
                navbarBuild={getNavbarBuildBySize('desktop')}
            />,
        );

        const fixButton = screen.getByTestId('toggleFixButton');
        fireEvent.click(fixButton);
        expect(toggleFixed).toHaveBeenCalled();
    });
});
