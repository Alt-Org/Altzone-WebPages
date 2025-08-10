import { gameApi } from '@/shared/api';
import {
    PlayerLeaderboardResponse,
    ClanLeaderboardResponse,
    ClanPositionResponse,
} from '@/entities/Leaderboard/types/leaderboardResponses';

// After normalization, position is number | null (null = not in a clan)
type ClanPositionNormalized = Omit<ClanPositionResponse, 'data'> & {
    data: { Object: { position: number | null } };
};

export const leaderboardApi = gameApi.injectEndpoints({
    endpoints: (builder) => ({
        // GET /leaderboard/player
        getTopPlayers: builder.query<PlayerLeaderboardResponse, void>({
            query: () => ({
                url: 'leaderboard/player',
                method: 'GET',
            }),
        }),

        // GET /leaderboard/clan
        getTopClans: builder.query<ClanLeaderboardResponse, void>({
            query: () => ({
                url: 'leaderboard/clan',
                method: 'GET',
            }),
        }),

        // GET /leaderboard/clan/position
        // Treat 404 ("not in clan") as a handled response and normalize to position: null
        getClanPosition: builder.query<ClanPositionNormalized, void>({
            query: () => ({
                url: 'leaderboard/clan/position',
                method: 'GET',
                // IMPORTANT: validateStatus must be inside the query object
                validateStatus: (response) => response.status === 200 || response.status === 404,
            }),
            transformResponse: (response: ClanPositionResponse, meta) => {
                const status = meta?.response?.status;
                if (status === 404) {
                    return {
                        data: { Object: { position: null } },
                        metaData: {
                            dataKey: 'Object',
                            modelName: 'Object',
                            dataType: 'Object',
                            dataCount: 0,
                        },
                    } as ClanPositionNormalized;
                }
                const pos = response?.data?.Object?.position ?? null;
                return {
                    ...response,
                    data: { Object: { position: pos } },
                } as ClanPositionNormalized;
            },
        }),
    }),
    overrideExisting: false,
});

export const { useGetTopPlayersQuery, useGetTopClansQuery, useGetClanPositionQuery } =
    leaderboardApi;
