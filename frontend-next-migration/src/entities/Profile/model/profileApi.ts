import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { StateSchema } from "@/app/_providers/StoreProvider";
import { envHelper } from "@/shared/const/envHelper";
import { GetClanResponse, GetClansResponse, IClan, IClanCreateDto, IClanUpdateDto, ICreateClanResponse } from "@/entities/Clan";

const profileUrl = "profile";
//needs to be moved to something else
//const profileUrl = "profile";

export const profileApi = createApi({
    reducerPath: 'profileApi',
    tagTypes: ['Profile'],
    baseQuery: fetchBaseQuery(
        {
            baseUrl: envHelper.apiLink,
            credentials: "include",
            prepareHeaders: (headers, { getState, endpoint }) => {
                const accessTokenInfo = (getState() as StateSchema).authUser.accessTokenInfo;
                if (accessTokenInfo) {
                    headers.set('Authorization', `Bearer ${accessTokenInfo?.accessToken}`);
                }
            },

        }),
    endpoints: (builder) => ({
        deleteProfile: builder.mutation<void, void>({
            query: () => ({
                url: `${profileUrl}`,
                method: 'DELETE',
            }),
        }),
    }),
})

export const {
    util,
    useDeleteProfileMutation,
    endpoints: profileEndpoints
} = profileApi;
