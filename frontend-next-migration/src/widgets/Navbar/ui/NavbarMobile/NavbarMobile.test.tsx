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

describe('Navbar mobile', () => {
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

        const toggleFixButton = screen.getByTestId('toggleFixButton');
        expect(screen.getByTestId('toggleFixButton')).toBeVisible();
        await user.click(toggleFixButton);
        expect(screen.getByTestId('collapseExpand')).toBeVisible();
        const collapseExpand = screen.getByTestId('collapseExpand');
        expect(toggleFixButton.parentElement).not.toHaveClass('collapsed');
        await user.click(collapseExpand);
        expect(toggleFixButton.parentElement).toHaveClass('collapsed');
    });
});
