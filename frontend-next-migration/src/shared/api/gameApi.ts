import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { StateSchema } from "@/app/_providers/StoreProvider";
import { envHelper } from "@/shared/const/envHelper";
import {selectAccessTokenInfo} from "@/entities/Auth";
import {HYDRATE} from "next-redux-wrapper";

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
        // todo violates fsd methodology, need to check if it is possible to add this logic via authMiddleware
        prepareHeaders: (headers, { getState }) => {
            const accessTokenInfo = selectAccessTokenInfo(getState() as StateSchema);
            if (accessTokenInfo) {
                headers.set('Authorization', `Bearer ${accessTokenInfo?.accessToken}`);
            }
            return headers;
        },
    }),
    tagTypes: Object.values(GameApiCacheTags),
    endpoints: () => ({}),
});