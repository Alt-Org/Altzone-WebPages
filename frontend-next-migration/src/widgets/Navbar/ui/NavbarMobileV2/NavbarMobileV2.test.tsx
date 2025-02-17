import { render, screen } from '@testing-library/react';
import { useClientTranslation } from '@/shared/i18n';
import useIsPageScrollbar from '@/shared/lib/hooks/useIsPageScrollbar';
import { getNavbarBuildBySize } from '../../model/getNavbarBuildBySize';
import NavbarMobile from './NavbarMobile';
import userEvent from '@testing-library/user-event';
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

describe('Navbar mobile', () => {
    beforeEach(() => {
        (useClientTranslation as jest.Mock).mockReturnValue({ t: jest.fn((key) => key) });
        (useIsPageScrollbar as jest.Mock).mockReturnValue(true);
        (usePathname as jest.Mock).mockReturnValue('/some/path');
    });

    test('renders NavbarMobile component', () => {
        render(
            <NavbarMobile
                toggleCollapsed={jest.fn()}
                isCollapsed={true}
                isFixed={true}
                toggleFixed={jest.fn()}
                navbarBuild={getNavbarBuildBySize('mobile')}
            />,
        );

        expect(screen.getByRole('navigation')).toBeInTheDocument();
        expect(screen.getByTestId('burger-button')).toBeInTheDocument();
    });

    test('toggles sidebar on burger button click', async () => {
        render(
            <NavbarMobile
                toggleCollapsed={jest.fn()}
                isCollapsed={true}
                isFixed={true}
                toggleFixed={jest.fn()}
                navbarBuild={getNavbarBuildBySize('mobile')}
            />,
        );

        const burgerButton = screen.getByTestId('burger-button'); // Use getByTestId
        await userEvent.click(burgerButton);

        expect(screen.getByTestId('sidebar')).toBeVisible();
    });
});
