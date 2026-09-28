import { render, screen, fireEvent, act } from '@testing-library/react';
import NavbarDesktop from './NavbarDesktop';
import { NavbarBuild, ItemType } from '../../model/types';

jest.mock('@/shared/i18n', () => ({
    useClientTranslation: jest.fn().mockReturnValue({
        t: jest.fn((key: string) => key),
    }),
}));

jest.mock('@/entities/Auth', () => ({
    useLogoutMutation: () => [jest.fn()],
    useUserPermissionsV2: () => ({
        checkPermissionFor: () => ({ isGranted: false }),
    }),
}));

jest.mock('@/features/AuthByUsername', () => ({
    LoginForm: () => <div data-testid="login-form" />,
}));

jest.mock('@/features/LangSwitcher', () => ({
    LangSwitcher: () => <div data-testid="lang-switcher" />,
}));

jest.mock('@/shared/ui/AppLink/AppLink', () => ({
    AppLink: ({ children, to, isExternal, ...props }: any) => (
        <a
            href={to}
            {...props}
        >
            {children}
        </a>
    ),
    AppLinkTheme: { PRIMARY: 'primary' },
}));

jest.mock('@fortawesome/react-fontawesome', () => ({
    FontAwesomeIcon: () => <span data-testid="icon" />,
}));

jest.mock('@/shared/lib/hooks/useDropdownManager', () => ({
    useDropdownManager: () => ({
        state: { isOpen: false, isToggled: false },
        actions: { toggle: jest.fn(), reset: jest.fn() },
    }),
}));

const makeNavbarBuild = (): NavbarBuild => ({
    namedMenu: {},
    menu: [
        {
            name: 'Nav logo',
            src: 'logo.png',
            path: '/',
            type: ItemType.navLogo,
        },
        {
            name: 'news',
            path: '/news',
            type: ItemType.navLink,
        },
        {
            name: 'contactUs',
            path: '/team',
            type: ItemType.navLink,
        },
        {
            name: 'game',
            type: ItemType.navDropDown,
            elements: [
                {
                    elementText: 'learnTheGame',
                    link: { path: '/peli', isExternal: false },
                },
                {
                    elementText: 'scoreboard',
                    link: { path: '/leaderboard', isExternal: false },
                },
            ],
        },
    ],
});

describe('NavbarDesktopV3', () => {
    const navbarBuild = makeNavbarBuild();

    test('renders nav element', () => {
        render(<NavbarDesktop navbarBuild={navbarBuild} />);
        expect(screen.getByRole('navigation', { name: 'Nav menu' })).toBeInTheDocument();
    });

    test('renders top-level triggers', () => {
        render(<NavbarDesktop navbarBuild={navbarBuild} />);
        expect(screen.getByText('game')).toBeInTheDocument();
        expect(screen.getByText('news')).toBeInTheDocument();
        expect(screen.getByText('contactUs')).toBeInTheDocument();
    });

    test('dropdown opens on hover and closes on leave', () => {
        render(<NavbarDesktop navbarBuild={navbarBuild} />);
        const gameTrigger = screen.getByText('game').closest('li')!;
        const dropdown = document.getElementById('navbar-dropdown-game')!;

        expect(dropdown).not.toHaveClass('dropdownMenuOpen');

        fireEvent.mouseEnter(gameTrigger);
        expect(dropdown).toHaveClass('dropdownMenuOpen');
        expect(screen.getByText('learnTheGame')).toBeInTheDocument();
        expect(screen.getByText('scoreboard')).toBeInTheDocument();

        jest.useFakeTimers();
        act(() => {
            fireEvent.mouseLeave(gameTrigger);
        });
        act(() => {
            jest.advanceTimersByTime(300);
        });
        expect(dropdown).not.toHaveClass('dropdownMenuOpen');
        jest.useRealTimers();
    });

    test('escape closes the dropdown', () => {
        render(<NavbarDesktop navbarBuild={navbarBuild} />);
        const gameTrigger = screen.getByText('game').closest('li')!;
        fireEvent.mouseEnter(gameTrigger);

        const dropdown = document.getElementById('navbar-dropdown-game')!;
        expect(dropdown).toHaveClass('dropdownMenuOpen');

        fireEvent.keyDown(document, { key: 'Escape' });
        expect(dropdown).not.toHaveClass('dropdownMenuOpen');
    });

    test('applies marginTop style when provided', () => {
        const { container } = render(
            <NavbarDesktop
                navbarBuild={navbarBuild}
                marginTop={40}
            />,
        );
        const nav = container.querySelector('nav')!;
        expect(nav).toHaveStyle({ marginTop: '40px' });
    });

    test('applies custom className', () => {
        const { container } = render(
            <NavbarDesktop
                navbarBuild={navbarBuild}
                className="myClass"
            />,
        );
        const nav = container.querySelector('nav')!;
        expect(nav.className).toContain('myClass');
    });
});
