import { renderHook, act } from '@testing-library/react';
import { toast } from 'react-toastify';
import { useJoinClanMutation } from '@/entities/Clan';
import { useClientTranslation } from '@/shared/i18n';
import useJoinClan from './useJoinClan';

jest.mock('react-toastify');
jest.mock('@/entities/Clan', () => ({
    useJoinClanMutation: jest.fn(),
}));
jest.mock('@/shared/i18n', () => ({
    useClientTranslation: jest.fn(),
}));

describe('useJoinClan', () => {
    const mockJoinClan = jest.fn();
    const mockT = jest.fn((key) => key);

    beforeEach(() => {
        jest.clearAllMocks();
        // @ts-ignore
        useJoinClanMutation.mockReturnValue([mockJoinClan]);
        // @ts-ignore
        useClientTranslation.mockReturnValue({ t: mockT });
    });

    it('should successfully join a clan', async () => {
        mockJoinClan.mockResolvedValueOnce({ data: {} });

        const { result } = renderHook(() => useJoinClan());

        await act(async () => {
            await result.current.handleJoin('clan_id', 'player_id', 'join_message');
        });

        expect(mockJoinClan).toHaveBeenCalledWith({
            clan_id: 'clan_id',
            player_id: 'player_id',
            join_message: 'join_message',
        });
        expect(toast.success).toHaveBeenCalledWith('toast_join_success');
    });

    it('should handle error when joining a clan', async () => {
        const errorMessage = 'Error joining clan';
        mockJoinClan.mockResolvedValueOnce({ error: errorMessage });

        const { result } = renderHook(() => useJoinClan());

        await act(async () => {
            await result.current.handleJoin('clan_id', 'player_id', 'join_message');
        });

        expect(mockJoinClan).toHaveBeenCalledWith({
            clan_id: 'clan_id',
            player_id: 'player_id',
            join_message: 'join_message',
        });
        expect(toast.error).toHaveBeenCalledWith(`"${errorMessage}"`);
    });

    it('should call onSuccess callback if provided', async () => {
        const onSuccessMock = jest.fn();
        mockJoinClan.mockResolvedValueOnce({ data: {} });

        const { result } = renderHook(() => useJoinClan());

        await act(async () => {
            await result.current.handleJoin('clan_id', 'player_id', 'join_message', onSuccessMock);
        });

        expect(onSuccessMock).toHaveBeenCalled();
    });
});
