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

// Mock the auth forms
jest.mock('@/features/AuthByUsername', () => ({
    LoginForm: ({ onSuccessLogin, extraContent }: any) => (
        <div data-testid="login-form">
            <button onClick={onSuccessLogin}>Login</button>
            {extraContent}
        </div>
    ),
    RegisterForm: ({ extraContent }: any) => (
        <div data-testid="register-form">
            Register Form
            {extraContent}
        </div>
    ),
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
        // Mock both translation namespaces
        (useClientTranslation as jest.Mock).mockImplementation((namespace) => ({
            t: jest.fn((key) => `${namespace}.${key}`),
        }));
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
        expect(screen.getByTestId('mobile-navbar-burger-button')).toBeInTheDocument();
    });

    test('toggles nav-menu on burger button click', async () => {
        render(
            <NavbarMobile
                toggleCollapsed={jest.fn()}
                isCollapsed={true}
                isFixed={true}
                toggleFixed={jest.fn()}
                navbarBuild={getNavbarBuildBySize('mobile')}
            />,
        );

        const burgerButton = screen.getByTestId('mobile-navbar-burger-button');
        await userEvent.click(burgerButton);

        expect(screen.getByTestId('nav-menu')).toBeVisible();
    });

    test('toggles profile on profile button click', async () => {
        render(
            <NavbarMobile
                toggleCollapsed={jest.fn()}
                isCollapsed={true}
                isFixed={true}
                toggleFixed={jest.fn()}
                navbarBuild={getNavbarBuildBySize('mobile')}
            />,
        );

        const profileButton = screen.getByTestId('mobile-navbar-profile-button');
        await userEvent.click(profileButton);

        expect(screen.getByTestId('mobile-navbar-profile')).toBeVisible();
    });

    test('shows login form when user can login', async () => {
        render(
            <NavbarMobile
                toggleCollapsed={jest.fn()}
                isCollapsed={true}
                isFixed={true}
                toggleFixed={jest.fn()}
                navbarBuild={getNavbarBuildBySize('mobile')}
            />,
        );

        const profileButton = screen.getByTestId('mobile-navbar-profile-button');
        await userEvent.click(profileButton);

        expect(screen.getByTestId('login-form')).toBeInTheDocument();
    });

    test('can toggle between login and register forms', async () => {
        render(
            <NavbarMobile
                toggleCollapsed={jest.fn()}
                isCollapsed={true}
                isFixed={true}
                toggleFixed={jest.fn()}
                navbarBuild={getNavbarBuildBySize('mobile')}
            />,
        );

        const profileButton = screen.getByTestId('mobile-navbar-profile-button');
        await userEvent.click(profileButton);

        // Initially shows login form
        expect(screen.getByTestId('login-form')).toBeInTheDocument();

        // Click toggle to register
        const toggleButton = screen.getByText('auth.text_to_register');
        await userEvent.click(toggleButton);

        expect(screen.getByTestId('register-form')).toBeInTheDocument();
    });
});
