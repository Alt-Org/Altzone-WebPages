import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';
import { envHelper } from '@/shared/const/envHelper';
import { LS_KEYS } from '@/shared/const/LS_KEYS';
import { AccessTokenInfo } from '../types/shared';

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
            return action.payload[reducerPath];
        }
    },
    baseQuery: fetchBaseQuery({
        baseUrl: envHelper.apiLink,
        credentials: 'include',
        /** todo violates fsd methodology, need to check if it is possible to add this logic via authMiddleware.
         * This also causes circular dependencies.
         * Make sure lower-level modules (like API setup) do not depend on higher-level modules (like state access or selectors) directly.*/
        prepareHeaders: (headers) => {
            const AUTH_USER_STRING = localStorage.getItem(LS_KEYS.AUTH_USER);
            const accessTokenInfo: AccessTokenInfo | null = AUTH_USER_STRING
                ? (JSON.parse(AUTH_USER_STRING)?.accessTokenInfo ?? null)
                : null;

            if (accessTokenInfo) {
                headers.set('Authorization', `Bearer ${accessTokenInfo.accessToken}`);
            }
            return headers;
        },
    }),
    tagTypes: Object.values(GameApiCacheTags),
    endpoints: () => ({}),
});
