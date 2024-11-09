import { renderHook, act } from '@testing-library/react';
import { toast } from 'react-toastify';
import { useDeleteClanMutation } from '@/entities/Clan';
import { useClientTranslation } from '@/shared/i18n';
import useDeleteClan from './useDeleteClan';

jest.mock('react-toastify', () => ({
    toast: {
        error: jest.fn(),
        success: jest.fn(),
        info: jest.fn(),
    },
}));

jest.mock('@/entities/Clan', () => ({
    useDeleteClanMutation: jest.fn(),
}));

jest.mock('@/shared/i18n', () => ({
    useClientTranslation: jest.fn(),
}));

describe('useDeleteClan', () => {
    const mockDeleteClanMutation = jest.fn();
    const tMock = jest.fn((key) => key);

    beforeEach(() => {
        jest.clearAllMocks();
        (useDeleteClanMutation as jest.Mock).mockReturnValue([mockDeleteClanMutation]);
        (useClientTranslation as jest.Mock).mockReturnValue({ t: tMock });
        global.confirm = jest.fn(() => true);
    });

    it('should call deleteClan and show success toast on successful deletion', async () => {
        mockDeleteClanMutation.mockResolvedValue({});

        const { result } = renderHook(() => useDeleteClan());

        await act(async () => {
            await result.current.handleDelete('clanId');
        });

        expect(mockDeleteClanMutation).toHaveBeenCalledWith('clanId');
        expect(toast.success).toHaveBeenCalledWith(tMock('clan_deleted'));
        expect(result.current.isCancelled).toBe(false);
    });

    it('should show error toast if deleteClan fails', async () => {
        const error = { message: 'Error deleting clan' };
        mockDeleteClanMutation.mockResolvedValue({ error });

        const { result } = renderHook(() => useDeleteClan());

        await act(async () => {
            await result.current.handleDelete('clanId');
        });

        expect(mockDeleteClanMutation).toHaveBeenCalledWith('clanId');
        expect(toast.error).toHaveBeenCalledWith(JSON.stringify(error));
        expect(result.current.isCancelled).toBe(true);
    });

    it('should show info toast if deletion is cancelled', async () => {
        global.confirm = jest.fn(() => false);

        const { result } = renderHook(() => useDeleteClan());

        await act(async () => {
            await result.current.handleDelete('clanId');
        });

        expect(toast.info).toHaveBeenCalledWith(tMock('clan_delete_cancelled'), {
            autoClose: 1500,
        });
        expect(result.current.isCancelled).toBe(true);
    });

    it('should call onSuccess callback if deletion is successful', async () => {
        mockDeleteClanMutation.mockResolvedValue({});
        const onSuccessMock = jest.fn();

        const { result } = renderHook(() => useDeleteClan());

        await act(async () => {
            await result.current.handleDelete('clanId', onSuccessMock);
        });

        expect(onSuccessMock).toHaveBeenCalled();
        expect(result.current.isCancelled).toBe(false);
    });
});
