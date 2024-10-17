import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { HYDRATE } from "next-redux-wrapper";
import { selectAccessTokenInfo } from "@/entities/Auth";
import { envHelper } from "@/shared/const/envHelper";

// import { StateSchema } from "@/app/_providers/StoreProvider";

export enum GameApiCacheTags {
    AUTH = 'Auth',
    CLAN = 'Clan',
    GALLERY = 'Gallery',
    PROFILE = 'Profile',
}

export const gameApi = createApi({
    reducerPath: 'gameApi',
    extractRehydrationInfo(action, { reducerPath }) {
        if (action.type === HYDRATE) {
            return action.payload[reducerPath]
        }
    },
    baseQuery: fetchBaseQuery({
        baseUrl: envHelper.apiLink,
        credentials: "include",
        /** todo violates fsd methodology, need to check if it is possible to add this logic via authMiddleware.
         * This also causes circular dependencies.
         * Make sure lower-level modules (like API setup) do not depend on higher-level modules (like state access or selectors) directly.*/
        prepareHeaders: (headers, { getState }) => {
            const accessTokenInfo = selectAccessTokenInfo(getState() as any);
            if (accessTokenInfo) {
                headers.set('Authorization', `Bearer ${accessTokenInfo?.accessToken}`);
            }
            return headers;
        },
    }),
    tagTypes: Object.values(GameApiCacheTags),
    endpoints: () => ({}),
});