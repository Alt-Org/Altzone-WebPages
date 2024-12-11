import { render, fireEvent, screen } from '@testing-library/react';
import { FeedbackCard } from './FeedbackCard';
import { useClientTranslation } from '@/shared/i18n';

jest.mock('@/shared/i18n', () => ({
    useClientTranslation: jest.fn(),
}));

describe('FeedbackCard', () => {
    beforeEach(() => {
        (useClientTranslation as jest.Mock).mockReturnValue({
            t: (key: string) => key,
            i18n: { language: 'en' },
        });
    });

    it('renders correctly', () => {
        const { getByText } = render(<FeedbackCard />);

        expect(getByText('title')).toBeInTheDocument();
    });

    it('fills the feedback and send it', () => {
        render(<FeedbackCard />);

        const select = screen.getByAltText('emoji-3');
        fireEvent.click(select);

        const feedbackText = screen.getByPlaceholderText('input-placeholder');
        fireEvent.change(feedbackText, { target: { value: 'test' } });

        expect(feedbackText).toHaveValue('test');
        expect(select).toHaveClass('selectedEmoji');

        const sendButton = screen.getByText('send');

        fireEvent.click(sendButton);
    });
});
