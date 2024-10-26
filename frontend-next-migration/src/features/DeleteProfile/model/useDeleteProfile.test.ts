import { renderHook, act } from '@testing-library/react';
import { toast } from 'react-toastify';
import { useDeleteProfileMutation } from '@/entities/Profile';
import useDeleteProfile from './useDeleteProfile';

jest.mock('@/entities/Profile', () => ({
    useDeleteProfileMutation: jest.fn(),
}));

jest.mock('react-toastify', () => ({
    toast: {
        success: jest.fn(),
        error: jest.fn(),
        info: jest.fn(),
    },
}));

describe('useDeleteProfile', () => {
    const mockDeleteProfile = jest.fn();

    beforeEach(() => {
        (useDeleteProfileMutation as jest.Mock).mockReturnValue([mockDeleteProfile]);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should handle successful profile deletion', async () => {
        global.confirm = jest.fn(() => true); // Mock confirm dialog to simulate user confirmation
        mockDeleteProfile.mockResolvedValue({ data: 'Success' });
        const { result } = renderHook(() => useDeleteProfile());

        await act(async () => {
            result.current.handleDelete();
        });

        // Check if confirm was called and deletion was successful
        expect(global.confirm).toHaveBeenCalledWith('Oletko varma?');
        expect(mockDeleteProfile).toHaveBeenCalled();
        expect(toast.success).toHaveBeenCalledWith('Profiili poistettiin onnistuneesti');
        expect(result.current.isCancelled).toBe(false);
    });

    it('should handle deletion error', async () => {
        global.confirm = jest.fn(() => true);
        const errorMessage = { message: 'Deletion failed' };
        mockDeleteProfile.mockResolvedValue({ error: errorMessage });
        const { result } = renderHook(() => useDeleteProfile());

        await act(async () => {
            result.current.handleDelete();
        });
        // Check if the correct behavior is triggered in case of an error
        expect(global.confirm).toHaveBeenCalledWith('Oletko varma?');
        expect(mockDeleteProfile).toHaveBeenCalled();
        expect(toast.error).toHaveBeenCalledWith(
            `Virhe poistettaessa profiilia: ${JSON.stringify(errorMessage)}`,
        );
        expect(result.current.isCancelled).toBe(true);
    });

    it('should handle deletion cancellation by user', async () => {
        global.confirm = jest.fn(() => false); // Simulate user cancelling the deletion
        const { result } = renderHook(() => useDeleteProfile());

        await act(async () => {
            result.current.handleDelete();
        });

        // Check if deletion was cancelled and no action was taken
        expect(global.confirm).toHaveBeenCalledWith('Oletko varma?');
        expect(mockDeleteProfile).not.toHaveBeenCalled();
        expect(toast.info).toHaveBeenCalledWith('Poisto peruutettiin', { autoClose: 1500 });
        expect(result.current.isCancelled).toBe(true);
    });
});
