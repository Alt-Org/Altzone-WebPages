import { render, screen } from '@testing-library/react';
import PRGPage from './PRGPage';

jest.mock('@/shared/i18n', () => ({
    useClientTranslation: jest.fn(),
}));

jest.mock('@/shared/lib/hooks/useSizes', () => ({
    __esModule: true,
    default: () => ({ isMobileSize: false, isTabletSize: false }),
}));

jest.mock('@/shared/ui/CustomSwitch', () => ({
    CustomSwitch: ({ elements }: { elements: { children: React.ReactNode }[] }) => (
        <div data-testid="custom-switch">
            {elements.map((el, i) => (
                <span key={i}>{el.children}</span>
            ))}
        </div>
    ),
    CustomSwitchItems: { ToggleItem: 'ToggleItem' },
}));

jest.mock('@/shared/ui/AppLink/AppLink', () => ({
    AppLink: ({
        children,
        to,
        isExternal: _isExternal,
        ...props
    }: {
        children: React.ReactNode;
        to: string;
        isExternal?: boolean;
        [key: string]: unknown;
    }) => (
        <a
            href={to}
            {...props}
        >
            {children}
        </a>
    ),
}));

jest.mock('@/shared/ui/PageTitle', () => ({
    PageTitle: ({ titleText }: { titleText: string }) => <h1>{titleText}</h1>,
}));

jest.mock('@fortawesome/react-fontawesome', () => ({
    FontAwesomeIcon: () => <span data-testid="fa-icon" />,
}));

import { useClientTranslation } from '@/shared/i18n';

describe('PRGPage', () => {
    beforeEach(() => {
        (useClientTranslation as jest.Mock).mockReturnValue({
            t: (key: string) => key,
        });
    });

    it('renders all board members', () => {
        render(<PRGPage />);

        expect(screen.getByText('Helena Pavloff-Pelkonen')).toBeInTheDocument();
        expect(screen.getByText('Esa Pavloff-Pelkonen')).toBeInTheDocument();
        expect(screen.getByText('Emmi-Irina Pavloff')).toBeInTheDocument();
    });

    it('renders team link pointing to /team', () => {
        render(<PRGPage />);

        const teamLink = screen.getByText('alt-zone-team').closest('a');
        expect(teamLink).toHaveAttribute('href', '/team');
    });
});
