import { directusApi } from '@/shared/api';
import { envHelper } from '@/shared/const/envHelper';
import { createDirectus, rest, readItems } from '@directus/sdk';

const directusBaseUrl = envHelper.directusHost;
const client = createDirectus(directusBaseUrl).with(rest());

/**
 * API service for fetching member teams from a Directus backend.
 *
 * This service uses the Directus SDK and Redux Toolkit Query to define endpoints for fetching
 * teams data, including their associated translations.
 *
 * @module memberTeamsApi
 *
 * @endpoint getMemberTeams
 * Endpoint to fetch member teams from the Directus `teams` collection.
 * Retrieves information about teams, including their translations.
 *
 * @returns {object} Response containing an array of teams.
 */

const memberTeamsApi = directusApi.injectEndpoints({
    endpoints: (builder) => ({
        getMemberTeams: builder.query({
            queryFn: async (_arg: void) => {
                const teams = await client.request(
                    readItems('teams', {
                        fields: ['id', 'translations.*'],
                        deep: { translations: true },
                    }),
                );
                return { data: teams };
            },
        }),
    }),
});

export const { useGetMemberTeamsQuery } = memberTeamsApi;
