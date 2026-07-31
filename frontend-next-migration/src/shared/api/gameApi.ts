import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';
import { envHelper } from '@/shared/const/envHelper';
import { LS_KEYS } from '@/shared/const/LS_KEYS';
import { AccessTokenInfo } from '../types';
import { BaseQueryFn, FetchArgs } from '@reduxjs/toolkit/src/query';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { GameAPIError } from '@/shared/api/errors/GameAPIError';

export enum GameApiCacheTags {
    AUTH = 'Auth',
    CLAN = 'Clan',
    GALLERY = 'Gallery',
    PROFILE = 'Profile',
    BOX = 'Box',
}

/**
 * Makes requests to the game API
 */
const rawBaseQuery = fetchBaseQuery({
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
});

/**
 * Determines whenever an error should be sent to Sentry
 * @param error occurred response error
 */
const shouldReportApiError = (error: FetchBaseQueryError) => {
    if (typeof error.status === 'number') {
        return error.status >= 400;
    }

    return ['FETCH_ERROR', 'PARSING_ERROR', 'TIMEOUT_ERROR'].includes(error.status);
};

/**
 * Catches all errors happen during game API requests and sends them to Sentry
 */
const sentryWrappedBaseQuery: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
> = async (args, api, extraOptions) => {
    const result = await rawBaseQuery(args, api, extraOptions);

    if (result.error && shouldReportApiError(result.error)) {
        const requestUrl = typeof args === 'string' ? args : args.url;
        const requestMethod = typeof args === 'string' ? 'GET' : (args.method ?? 'GET');

        const error = new GameAPIError({
            url: requestUrl,
            method: requestMethod,
            status: result.error.status,
        });
        error.addSpanWithErrorInfo();
    }

    return result;
};

export const gameApi = createApi({
    reducerPath: 'gameApi',
    extractRehydrationInfo(action, { reducerPath }) {
        if (action.type === HYDRATE) {
            return action.payload[reducerPath];
        }
    },
    baseQuery: sentryWrappedBaseQuery,
    tagTypes: Object.values(GameApiCacheTags),
    endpoints: () => ({}),
});
