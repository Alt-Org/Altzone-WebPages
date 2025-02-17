import { render } from '@testing-library/react';
import { useClientTranslation } from '@/shared/i18n';
import useIsPageScrollbar from '@/shared/lib/hooks/useIsPageScrollbar';
import { getNavbarBuildBySize } from '../../model/getNavbarBuildBySize';
import NavbarDesktop from './NavbarDesktop';

// import user from '@testing-library/user-event';
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

// I think we cannot mock useClientTranslation only, because its NavItem also uses it... Definitely should be figured out
jest.mock('react-i18next', () => ({
    useTranslation: jest.fn().mockReturnValue({
        t: jest.fn((key) => key),
        i18n: { language: 'en', changeLanguage: jest.fn() },
    }),
}));

describe('Navbar', () => {
    beforeEach(() => {
        (useClientTranslation as jest.Mock).mockReturnValue({ t: jest.fn((key) => key) });
        (useIsPageScrollbar as jest.Mock).mockReturnValue(true);
    });

    test('render components', async () => {
        render(
            <div />,
            // <NavbarDesktop
            //     toggleCollapsed={jest.fn}
            //     isCollapsed={true}
            //     isFixed={true}
            //     toggleFixed={jest.fn}
            //     navbarBuild={getNavbarBuildBySize('desktop')}
            // />,
        );

        // expect(screen.getByTestId('toggleFixButton')).toBeVisible();
        // const toggleFix = screen.getByTestId('toggleFixButton');
        // const toggleFixButtonWrapper = screen.getByTestId('toggleFixButtonWrapper');
        // await user.click(toggleFix);
        // const collapseExpand = screen.getByTestId('collapseExpand');
        // expect(toggleFixButtonWrapper).not.toHaveClass('collapsed');
        // await user.click(collapseExpand);
        // expect(toggleFixButtonWrapper).toHaveClass('collapsed');
    });
});
