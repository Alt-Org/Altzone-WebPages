import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {StateSchema} from "@/app/providers/StoreProvider";
import {envHelper} from "@/shared/const/env/envHelper";
import {GetClanResponse, GetClansResponse, IClan, IClanCreateDto, IClanUpdateDto} from "@/entities/Clan";


const clanUrl = "clan";

export const clanApi = createApi({
    reducerPath: 'clanApi',
    tagTypes: ['Clan'],
    baseQuery: fetchBaseQuery(
        {
            baseUrl: envHelper.apiLink,
            credentials: "include",
            prepareHeaders :(headers,{getState, endpoint})=>{
                const accessTokenInfo = (getState() as StateSchema).authUser.accessTokenInfo;
                const excludedEndpoints = ['login', 'refresh', 'register'];
                if(accessTokenInfo && !excludedEndpoints.includes(endpoint)) {
                    headers.set('Authorization', `Bearer ${accessTokenInfo?.accessToken}`);
                }
            },

        }),
    endpoints: (builder) => ({

        getClans: builder.query<GetClansResponse, {}>({
            query: (options) => {
                // const paramsToBeSent= {
                //     page: options.page,
                //     limit: options.limit,
                //     sortBy: options?.sort?.sortBy,
                //     sortOrder: options?.sort?.sortOrder
                // }
                return {
                    url: clanUrl,
                    method: 'GET',
                    // params: paramsToBeSent,
                }
            },
            providesTags: ['Clan'],
        }),

        getClanById: builder.query<GetClanResponse, string>({
            query: (clanId) => `${clanUrl}/${clanId}`,
            providesTags: ['Clan']
        }),

        createClan: builder.mutation<IClan, IClanCreateDto>({
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

    }),
})

export const {
    util,
    useGetClansQuery,
    useGetClanByIdQuery,
    useCreateClanMutation,
    useDeleteClanMutation,
    useUpdateClanMutation,
    endpoints: clanEndpoints
} = clanApi;
