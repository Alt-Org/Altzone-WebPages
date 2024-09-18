import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { StateSchema } from "@/app/_providers/StoreProvider";
import { envHelper } from "@/shared/const/envHelper";
import { GetClanResponse, GetClansResponse, IClan, IClanCreateDto, IClanUpdateDto, ICreateClanResponse, IJoin } from "@/entities/Clan";

interface GetClansQueryParams {
    page?: number,
    search?: string,
}
const clanUrl = "clan";

export const clanApi = createApi({
    reducerPath: 'clanApi',
    tagTypes: ['Clan'],
    baseQuery: fetchBaseQuery(
        {
            baseUrl: envHelper.apiLink,
            credentials: "include",
            prepareHeaders: (headers, { getState, endpoint }) => {
                const accessTokenInfo = (getState() as StateSchema).authUser.accessTokenInfo;
                const excludedEndpoints = ['login', 'refresh', 'register'];
                if (accessTokenInfo && !excludedEndpoints.includes(endpoint)) {
                    headers.set('Authorization', `Bearer ${accessTokenInfo?.accessToken}`);
                }
            },

        }),
    endpoints: (builder) => ({

        getClans: builder.query<GetClansResponse, GetClansQueryParams>({

            query: (params) => {
                // const paramsToBeSent= {
                //     page: options.page,
                //     limit: options.limit,
                //     sortBy: options?.sort?.sortBy,
                //     sortOrder: options?.sort?.sortOrder
                // }
                return {
                    url: clanUrl,
                    method: 'GET',
                    params: params,
                }
            },
            providesTags: ['Clan'],
        }),

        getClanById: builder.query<GetClanResponse, string>({
            query: (clanId) => `${clanUrl}/${clanId}`,
            providesTags: ['Clan']
        }),

        getClanByIdWithPlayers: builder.query<GetClanResponse, string>({
            query: (clanId) => `${clanUrl}/${clanId}?with=Player`,
            providesTags: ['Clan']
        }),

        createClan: builder.mutation<ICreateClanResponse, IClanCreateDto>({
            query: (clan) => ({
                url: clanUrl,
                method: 'POST',
                body: clan,
            }),
            invalidatesTags: ['Clan'],
        }),

        deleteClan: builder.mutation<void, string>({
            query: (clanId) => ({
                url: `${clanUrl}/${clanId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Clan'],
        }),

        updateClan: builder.mutation<void, IClanUpdateDto>({
            query: (clan) => ({
                url: clanUrl,
                method: 'PUT',
                body: clan,
            }),
            invalidatesTags: ['Clan'],
        }),
      
        joinClan: builder.mutation<void, IJoin>({
            query: (join) => ({
                url: `${clanUrl}/join`,
                method: 'POST',
                body: join,
            }),
            invalidatesTags: ['Clan'],
        }),
        leaveClan: builder.mutation<void, void>({
            query: () => ({
                url: `${clanUrl}/leave`,
                method: 'POST',
            }),
        }),
    }),
})

export const {
    util,
    useGetClansQuery,
    useGetClanByIdQuery,
    useGetClanByIdWithPlayersQuery,
    useCreateClanMutation,
    useDeleteClanMutation,
    useUpdateClanMutation,
    useJoinClanMutation,
    useLeaveClanMutation,
    endpoints: clanEndpoints
} = clanApi;
