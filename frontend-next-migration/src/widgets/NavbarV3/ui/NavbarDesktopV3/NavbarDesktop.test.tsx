import { render, screen, fireEvent } from '@testing-library/react';
import { useClientTranslation } from '@/shared/i18n';
import useIsPageScrollbar from '@/shared/lib/hooks/useIsPageScrollbar';
import { getNavbarBuildBySize } from '../../model/getNavbarBuildBySize';
import NavbarDesktop from './NavbarDesktop';
import { usePathname } from 'next/navigation';
import cls from './NavbarDesktop.module.scss';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

jest.mock('@/shared/i18n', () => ({
    useClientTranslation: jest.fn(),
}));

jest.mock('@/entities/Auth', () => {
    const MockBaseAuthForm = ({ header, fields, actions, onSubmit }: any) => (
        <form onSubmit={onSubmit}>
            <div>{header}</div>
            <div>{fields}</div>
            <div>{actions}</div>
        </form>
    );

    MockBaseAuthForm.InputField = ({
        label,
        error,
        inputProps,
        showPasswordToggle,
        ...props
    }: any) => (
        <div>
            <label>{label}</label>
            <input {...inputProps} />
            {error && <span role="alert">{error}</span>}
        </div>
    );

    MockBaseAuthForm.Header = ({ children }: any) => <div>{children}</div>;

    MockBaseAuthForm.SubmitButton = ({ children }: any) => (
        <button type="submit">{children}</button>
    );

    MockBaseAuthForm.Checkbox = ({ label, error, inputProps, ...props }: any) => (
        <div>
            <label>
                <input
                    type="checkbox"
                    {...inputProps}
                />
                {label}
            </label>
            {error && <span role="alert">{error}</span>}
        </div>
    );

    return {
        useLoginMutation: jest.fn(() => [jest.fn(), { data: null, isLoading: false, error: null }]),
        useLogoutMutation: () => [jest.fn()],
        useUserPermissionsV2: () => ({
            checkPermissionFor: (what: string) => {
                if (what === 'login') return { isGranted: true };
                return { isGranted: false };
            },
        }),
        BaseAuthForm: MockBaseAuthForm,
    };
});

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

const mockReducer = (state = {}) => state;
const mockStore = configureStore({ reducer: mockReducer });

const withProvider = (ui: React.ReactElement) => <Provider store={mockStore}>{ui}</Provider>;

describe('Navbar', () => {
    beforeEach(() => {
        (useClientTranslation as jest.Mock).mockReturnValue({ t: jest.fn((key) => key) });
        (useIsPageScrollbar as jest.Mock).mockReturnValue(true);
    });

    test('render components', async () => {
        render(withProvider(<div />));
    });
});

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
            withProvider(
                <NavbarDesktop
                    toggleCollapsed={mockToggleCollapsed}
                    isCollapsed={false}
                    isFixed={false}
                    toggleFixed={mockToggleFixed}
                    navbarBuild={getNavbarBuildBySize('desktop')}
                    {...props}
                />,
            ),
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

    test('applies mouseOver styles when isMouseOver is true', () => {
        renderNavbar();

        const navList = screen.getByRole('list');
        fireEvent.mouseEnter(navList);
        expect(navList).toHaveClass(cls.mouseOver);
        fireEvent.mouseLeave(navList);
        expect(navList).not.toHaveClass(cls.mouseOver);
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
