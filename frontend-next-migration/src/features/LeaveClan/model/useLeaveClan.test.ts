import { renderHook, act } from '@testing-library/react';
import { toast } from 'react-toastify';
import { useLeaveClanMutation } from '@/entities/Clan';
import { useClientTranslation } from '@/shared/i18n';
import useLeaveClan from './useLeaveClan';

// Mocking necessary functions and hooks
jest.mock('react-toastify');
jest.mock('@/entities/Clan', () => ({
    useLeaveClanMutation: jest.fn(),
}));
jest.mock('@/shared/i18n', () => ({
    useClientTranslation: jest.fn(),
}));

describe('useLeaveClan', () => {
    const mockLeaveClan = jest.fn();
    const mockT = jest.fn((key) => key); // Mock translation function

    beforeEach(() => {
        // Clear mocks before each test
        jest.clearAllMocks();
        // @ts-ignore
        useLeaveClanMutation.mockReturnValue([mockLeaveClan]);
        // @ts-ignore
        useClientTranslation.mockReturnValue({ t: mockT });
        window.confirm = jest.fn(); // Mock window.confirm
    });

    it('should leave the clan successfully', async () => {
        // @ts-ignore
        window.confirm.mockReturnValue(true); // Simulate confirmation
        mockLeaveClan.mockResolvedValueOnce({}); // Mock successful leave

        const { result } = renderHook(() => useLeaveClan());

        await act(async () => {
            await result.current.handleLeave();
        });

        expect(mockLeaveClan).toHaveBeenCalled(); // Check if leaveClan was called
        expect(toast.success).toHaveBeenCalledWith('toast_left_clan'); // Check success message
        expect(result.current.isCancelled).toBe(false); // Ensure isCancelled is false
    });

    it('should handle error when leaving the clan', async () => {
        // @ts-ignore
        window.confirm.mockReturnValue(true); // Simulate confirmation
        const errorMessage = 'Error leaving clan';
        mockLeaveClan.mockResolvedValueOnce({ error: errorMessage }); // Mock leave error

        const { result } = renderHook(() => useLeaveClan());

        await act(async () => {
            await result.current.handleLeave();
        });

        expect(mockLeaveClan).toHaveBeenCalled(); // Check if leaveClan was called
        expect(toast.error).toHaveBeenCalledWith(`toast_error: ${errorMessage}`); // Check error message
        expect(result.current.isCancelled).toBe(true); // Ensure isCancelled is true
    });

    it('should cancel action if not confirmed', async () => {
        // @ts-ignore
        window.confirm.mockReturnValue(false); // Simulate cancellation

        const { result } = renderHook(() => useLeaveClan());

        await act(async () => {
            await result.current.handleLeave();
        });

        expect(mockLeaveClan).not.toHaveBeenCalled(); // Check leaveClan was not called
        expect(toast.info).toHaveBeenCalledWith('toast_action_canceled', { autoClose: 1500 }); // Check cancellation message
        expect(result.current.isCancelled).toBe(true); // Ensure isCancelled is true
    });

    it('should call onSuccess callback if provided', async () => {
        const onSuccessMock = jest.fn();
        // @ts-ignore
        window.confirm.mockReturnValue(true); // Simulate confirmation
        mockLeaveClan.mockResolvedValueOnce({}); // Mock successful leave

        const { result } = renderHook(() => useLeaveClan());

        await act(async () => {
            await result.current.handleLeave(onSuccessMock);
        });

        expect(onSuccessMock).toHaveBeenCalled(); // Check onSuccess was called
    });
});
