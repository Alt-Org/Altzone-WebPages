import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { envHelper } from '@/shared/const/envHelper';
import type { AccessTokenInfo } from '../types/auth';

type AuthTokenState = {
    authUser: { accessTokenInfo?: AccessTokenInfo };
};

export enum GameApiCacheTags {
    AUTH = 'Auth',
    CLAN = 'Clan',
    GALLERY = 'Gallery',
    PROFILE = 'Profile',
    BOX = 'Box',
}

export const gameApi = createApi({
    reducerPath: 'gameApi',
    baseQuery: fetchBaseQuery({
        baseUrl: envHelper.apiLink,
        credentials: 'include',
        prepareHeaders: (headers, { getState }) => {
            const { accessTokenInfo } = (getState() as AuthTokenState).authUser;

            if (accessTokenInfo) {
                headers.set('Authorization', `Bearer ${accessTokenInfo.accessToken}`);
            }
            return headers;
        },
    }),
    tagTypes: Object.values(GameApiCacheTags),
    endpoints: () => ({}),
});
