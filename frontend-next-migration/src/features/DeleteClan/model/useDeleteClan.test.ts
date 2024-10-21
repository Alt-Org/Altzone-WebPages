import { renderHook, act } from '@testing-library/react';
import { toast } from 'react-toastify';
import { useDeleteClanMutation } from '@/entities/Clan';
import useDeleteClan from './useDeleteClan';

jest.mock('@/entities/Clan', () => ({
    useDeleteClanMutation: jest.fn(),
}));

jest.mock('react-toastify', () => ({
    toast: {
        success: jest.fn(),
        error: jest.fn(),
        info: jest.fn(),
    },
}));

describe('useDeleteClan', () => {
    const mockDeleteClan = jest.fn();
    const clanId = '123';

    beforeEach(() => {
        (useDeleteClanMutation as jest.Mock).mockReturnValue([mockDeleteClan]);
        jest.clearAllMocks();
        global.confirm = jest.fn(() => true);
    });

    it('should handle successful clan deletion', async () => {
        global.confirm = jest.fn(() => true);
        mockDeleteClan.mockResolvedValue({ data: 'Success' });
        const { result } = renderHook(() => useDeleteClan());

        await act(async () => {
            result.current.handleDelete(clanId);
        });

        expect(mockDeleteClan).toHaveBeenCalledWith(clanId);
        expect(toast.success).toHaveBeenCalledWith('Klaani poistettiin onnistuneesti');
        expect(result.current.isCancelled).toBe(false);
    });

    it('should handle deletion error', async () => {
        global.confirm = jest.fn(() => true);
        const errorMessage = { message: 'Deletion failed' };
        mockDeleteClan.mockResolvedValue({ error: errorMessage });
        const { result } = renderHook(() => useDeleteClan());

        await act(async () => {
            result.current.handleDelete(clanId);
        });

        expect(mockDeleteClan).toHaveBeenCalledWith(clanId);
        expect(toast.error).toHaveBeenCalledWith(JSON.stringify(errorMessage));
        expect(result.current.isCancelled).toBe(true);
    });

    it('should handle deletion cancellation by user', async () => {
        global.confirm = jest.fn(() => false); // Simulate user cancelling the action
        const { result } = renderHook(() => useDeleteClan());

        await act(async () => {
            result.current.handleDelete(clanId);
        });

        expect(mockDeleteClan).not.toHaveBeenCalled();
        expect(toast.info).toHaveBeenCalledWith('Poisto peruutettiin', { autoClose: 1500 });
        expect(result.current.isCancelled).toBe(true);
    });
});
