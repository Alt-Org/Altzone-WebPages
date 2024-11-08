import { render, screen, waitFor } from '@testing-library/react';
import user from '@testing-library/user-event';
import { useClientTranslation } from '@/shared/i18n';
import useIsPageScrollbar from '@/shared/lib/hooks/useIsPageScrollbar';
import { CollapsedProvider } from '../../model/CollapsedProvider';
import { FixedProvider } from '../../model/FixedProvider';
import { getNavbarBuildByTypeAndSize } from '../../model/getNavbarBuildByTypeAndSize';
import NavbarMobile from './NavbarMobile';

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

// // I think we cannot mock useClientTranslation only, because its NavItem also uses it... Definitely should be figured out
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
            <FixedProvider>
                <CollapsedProvider>
                    <NavbarMobile navbarBuild={getNavbarBuildByTypeAndSize('Default', 'mobile')} />
                </CollapsedProvider>
            </FixedProvider>,
        );

        expect(screen.getByTestId('toggleFixButton')).toBeVisible();

        const toggleFix = screen.getByTestId('toggleFixButton');
        await user.click(toggleFix);

        expect(screen.getByTestId('collapseExpand')).toBeVisible();
        const toggleCollapse = screen.getByTestId('collapseExpand');
        user.click(toggleCollapse);

        //wait for transitions
        waitFor(
            () => {
                expect(screen.getByTestId('toggleFixButton')).not.toBeVisible();
            },
            { timeout: 500 },
        );

        user.click(toggleCollapse);

        waitFor(
            () => {
                expect(screen.getByTestId('toggleFixButton')).toBeVisible();
            },
            { timeout: 500 },
        );
    });
});
