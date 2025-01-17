import { render, screen } from '@testing-library/react';
import { useClientTranslation } from '@/shared/i18n';
import useIsMobileSize from '@/shared/lib/hooks/useIsMobileSize';
import { default as FeedbackSideButton } from './FeedbackSideButton';

jest.mock('@/shared/i18n');
jest.mock('@/shared/lib/hooks/useIsMobileSize');

describe('FeedbackSideButton', () => {
    beforeEach(() => {
        (useClientTranslation as jest.Mock).mockReturnValue({ t: jest.fn((key) => key) });
    });

    it('renders the button when not on mobile or mobile is not disabled', () => {
        (useIsMobileSize as jest.Mock).mockReturnValue({ isMobileSize: false });

        render(<FeedbackSideButton disableMobile={false} />);

        const button = screen.getByRole('button', { name: 'feedback' });
        expect(button).toBeInTheDocument();
    });

    it('does not render the button when on mobile and mobile is disabled', () => {
        (useIsMobileSize as jest.Mock).mockReturnValue({ isMobileSize: true });

        render(<FeedbackSideButton disableMobile={true} />);

        const button = screen.queryByRole('button', { name: 'feedback' });
        expect(button).not.toBeInTheDocument();
    });

    it('renders the button when on mobile and mobile is not disabled', () => {
        (useIsMobileSize as jest.Mock).mockReturnValue({ isMobileSize: true });

        render(<FeedbackSideButton disableMobile={false} />);

        const button = screen.getByRole('button', { name: 'feedback' });
        expect(button).toBeInTheDocument();
    });

    it('renders a disabled button when on mobile and disableMobile is true', () => {
        (useIsMobileSize as jest.Mock).mockReturnValue({ isMobileSize: true });
        render(<FeedbackSideButton disableMobile={true} />);
        const button = screen.queryByRole('button', { name: 'feedback' });
        expect(button).not.toBeInTheDocument();
    });

    it('renders an enabled button when on mobile and disableMobile is false', () => {
        (useIsMobileSize as jest.Mock).mockReturnValue({ isMobileSize: true });
        render(<FeedbackSideButton disableMobile={false} />);
        const button = screen.getByRole('button', { name: 'feedback' });
        expect(button).toBeInTheDocument();
        expect(button).toBeEnabled();
    });
});
