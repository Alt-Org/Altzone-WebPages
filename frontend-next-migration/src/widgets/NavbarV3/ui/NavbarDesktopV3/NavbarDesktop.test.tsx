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
        const gameTrigger = screen.getByText('game').closest('li');
        const dropdown = document.getElementById('navbar-dropdown-game');

        if (!gameTrigger || !dropdown) {
            throw new Error('Expected the game menu item and dropdown to be rendered');
        }

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
        const gameTrigger = screen.getByText('game').closest('li');

        if (!gameTrigger) {
            throw new Error('Expected the game menu item to be rendered');
        }

        fireEvent.mouseEnter(gameTrigger);

        const dropdown = document.getElementById('navbar-dropdown-game');

        if (!dropdown) {
            throw new Error('Expected the game dropdown to be rendered');
        }
        expect(dropdown).toHaveClass('dropdownMenuOpen');

        fireEvent.keyDown(document, { key: 'Escape' });
        expect(dropdown).not.toHaveClass('dropdownMenuOpen');
    });

    test('applies marginTop style when provided', () => {
        render(
            <NavbarDesktop
                navbarBuild={navbarBuild}
                marginTop={40}
            />,
        );
        const nav = screen.getByRole('navigation', { name: 'Nav menu' });
        expect(nav).toHaveStyle({ marginTop: '40px' });
    });

    test('applies custom className', () => {
        render(
            <NavbarDesktop
                navbarBuild={navbarBuild}
                className="myClass"
            />,
        );
        const nav = screen.getByRole('navigation', { name: 'Nav menu' });
        expect(nav.className).toContain('myClass');
    });
});
