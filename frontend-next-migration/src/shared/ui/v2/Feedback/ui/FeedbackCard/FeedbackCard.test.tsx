import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { toast } from 'react-toastify';
import { useAddFeedbackMutation } from '@/entities/Feedback/api/feedbackApi';
import { useClientTranslation } from '@/shared/i18n';
import FeedbackCard from './FeedbackCard';

jest.mock('@/entities/Feedback/api/feedbackApi', () => ({
    useAddFeedbackMutation: jest.fn(),
}));

jest.mock('@/shared/i18n', () => ({
    useClientTranslation: jest.fn(),
}));

jest.mock('react-toastify', () => ({
    toast: {
        success: jest.fn(),
        error: jest.fn(),
    },
}));

describe('FeedbackCard', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        (useClientTranslation as jest.Mock).mockReturnValue({
            t: (key: string) => key,
            i18n: { language: 'en' },
        });
    });

    it('shows error toast if feedback is missing or emoji is not selected', async () => {
        const mockMutation = jest.fn();
        // @ts-ignore
        jest.mocked(useAddFeedbackMutation).mockReturnValue([mockMutation, { isLoading: false }]);

        render(<FeedbackCard />);
        const sendButton = screen.getByText('send');
        fireEvent.click(sendButton);

        await waitFor(() => {
            expect(toast.error).toHaveBeenCalledWith('error', {
                position: 'bottom-center',
                autoClose: 3000,
            });
        });
    });

    it('disables send button while submitting feedback', async () => {
        const mockMutation = jest.fn().mockResolvedValue({});
        // @ts-ignore
        jest.mocked(useAddFeedbackMutation).mockReturnValue([mockMutation, { isLoading: true }]);

        render(<FeedbackCard />);
        const sendButton = screen.getByText('loading');
        expect(sendButton).toBeDisabled();
    });
});
