import {gameApi, GameApiCacheTags} from "@/shared/api";
import { GetClanResponse, GetClansResponse, IClanCreateDto, IClanUpdateDto, ICreateClanResponse, IJoin } from "../../Clan";

interface GetClansQueryParams {
    page?: number,
    search?: string,
}
const clanUrl = "clan";

const clanApi = gameApi.injectEndpoints({
    endpoints: (builder) => ({
        getClans: builder.query<GetClansResponse, GetClansQueryParams>({
            query: (params) => ({
                url: clanUrl,
                method: 'GET',
                params,
            }),
            providesTags: [GameApiCacheTags.CLAN],
        }),
        getClanById: builder.query<GetClanResponse, string>({
            query: (clanId) => `${clanUrl}/${clanId}`,
            providesTags: [GameApiCacheTags.CLAN],
        }),
        getClanByIdWithPlayers: builder.query<GetClanResponse, string>({
            query: (clanId) => `${clanUrl}/${clanId}?with=Player`,
            providesTags: [GameApiCacheTags.CLAN],
        }),
        createClan: builder.mutation<ICreateClanResponse, IClanCreateDto>({
            query: (clan) => ({
                url: clanUrl,
                method: 'POST',
                body: clan,
            }),
            invalidatesTags: [GameApiCacheTags.CLAN],
        }),
        deleteClan: builder.mutation<void, string>({
            query: (clanId) => ({
                url: `${clanUrl}/${clanId}`,
                method: 'DELETE',
            }),
            invalidatesTags: [GameApiCacheTags.CLAN],
        }),
        updateClan: builder.mutation<void, IClanUpdateDto>({
            query: (clan) => ({
                url: clanUrl,
                method: 'PUT',
                body: clan,
            }),
            invalidatesTags: [GameApiCacheTags.CLAN],
        }),
        joinClan: builder.mutation<void, IJoin>({
            query: (join) => ({
                url: `${clanUrl}/join`,
                method: 'POST',
                body: join,
            }),
            invalidatesTags: [GameApiCacheTags.CLAN],
        }),
        leaveClan: builder.mutation<void, void>({
            query: () => ({
                url: `${clanUrl}/leave`,
                method: 'POST',
            }),
        }),
    }),
    overrideExisting: false,
});

export const {
    useGetClansQuery,
    useGetClanByIdQuery,
    useGetClanByIdWithPlayersQuery,
    useCreateClanMutation,
    useDeleteClanMutation,
    useUpdateClanMutation,
    useJoinClanMutation,
    useLeaveClanMutation,
} = clanApi;