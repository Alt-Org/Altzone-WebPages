import { render, screen } from '@testing-library/react';
import PRGPage from './PRGPage';

jest.mock('@/shared/i18n', () => ({
    useClientTranslation: jest.fn(),
}));

jest.mock('@/shared/lib/hooks/useSizes', () => ({
    __esModule: true,
    default: jest.fn(() => ({ isMobileSize: false, isTabletSize: false })),
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
import useSizes from '@/shared/lib/hooks/useSizes';

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

    it('renders the tab switch on desktop', () => {
        (useSizes as jest.Mock).mockReturnValue({ isMobileSize: false, isTabletSize: false });
        render(<PRGPage />);

        expect(screen.getByTestId('custom-switch')).toBeInTheDocument();
    });

    it('loops all document tabs instead of the switch on mobile', () => {
        (useSizes as jest.Mock).mockReturnValue({ isMobileSize: true, isTabletSize: false });
        render(<PRGPage />);

        expect(screen.queryByTestId('custom-switch')).not.toBeInTheDocument();
        expect(screen.getByText('action-plan')).toBeInTheDocument();
        expect(screen.getByText('activity-report')).toBeInTheDocument();
        expect(screen.getByText('bylaws')).toBeInTheDocument();
        expect(screen.getAllByText('check-pdf')).toHaveLength(3);
    });

    it('loops all document tabs instead of the switch on tablet', () => {
        (useSizes as jest.Mock).mockReturnValue({ isMobileSize: false, isTabletSize: true });
        render(<PRGPage />);

        expect(screen.queryByTestId('custom-switch')).not.toBeInTheDocument();
        expect(screen.getAllByText('check-pdf')).toHaveLength(3);
    });
});
