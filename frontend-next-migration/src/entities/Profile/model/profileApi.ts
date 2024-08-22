import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { StateSchema } from "@/app/_providers/StoreProvider";
import { envHelper } from "@/shared/const/envHelper";
import { GetClanResponse, GetClansResponse, IClan, IClanCreateDto, IClanUpdateDto, ICreateClanResponse } from "@/entities/Clan";

interface GetClansQueryParams {
    page?: number,
    search?: string,
}
const clanUrl = "clan";
//needs to be moved to something else
//const profileUrl = "profile";

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


        // deleteProfile: builder.mutation<void, void>({
        //     query: () => ({
        //         url: `${profileUrl}`,
        //         method: 'DELETE',
        //     }),
        // }),

    }),
})

export const {
    util,
    endpoints: profileEndpoints
} = clanApi;
