import { envHelper } from '@/shared/const/envHelper';
import { createDirectus, rest, readItems } from '@directus/sdk';
import { Member, Demographics } from '../model/types/types';
import { directusApi } from '@/shared/api';

const directusBaseUrl = envHelper.directusHost;
const client = createDirectus(directusBaseUrl).with(rest());

/**
 * RTK Query endpoint: Returns the count of unique members from Directus.
 * Uniqueness is based on normalized names; falls back to ID if name is missing.
 * Fetches up to 500 members per call.
 * Use with `useGetMembersQuery()` hook.
 */

/**
 * RTK Query endpoint: Fetches demographics data from Directus.
 * Returns the localities and nationalities counts from the latest record.
 * Uses a cacheBuster query parameter to prevent cached responses.
 * Use with `useGetDemographicsQuery()` hook.
 */

export const aboutApi = directusApi.injectEndpoints({
    endpoints: (builder) => ({
        getMembers: builder.query<number, void>({
            queryFn: async () => {
                try {
                    const members = await client.request<Member[]>(
                        readItems('members', { limit: 500 }),
                    );

                    const normalize = (input: unknown) =>
                        String(input ?? '')
                            .normalize('NFKD')
                            .replace(/[\u0300-\u036f]/g, '')
                            .replace(/\s+/g, ' ')
                            .trim()
                            .toLowerCase();

                    const uniqueCount = new Set(
                        members.map((member, index) =>
                            normalize(member.name)
                                ? `name:${normalize(member.name)}`
                                : `__id_${member.id ?? index}`,
                        ),
                    ).size;

                    return { data: uniqueCount };
                } catch (error) {
                    console.error('getMembers error:', error);
                    return {
                        error: {
                            status: 'FETCH_ERROR',
                            error: String(error),
                        },
                    };
                }
            },
        }),
        getDemographics: builder.query<{ localities: number; nationalities: number }, void>({
            queryFn: async () => {
                try {
                    const cacheBuster = Date.now();
                    const demographics = await client.request<Demographics[]>(
                        readItems('demographics', {
                            filter: { status: { _neq: 'archived' } },
                            limit: 1,
                            cacheBuster,
                        }),
                    );

                    if (!demographics.length) {
                        return { data: { localities: 0, nationalities: 0 } };
                    }

                    const { localities = 0, nationalities = 0 } = demographics[0];

                    return {
                        data: {
                            localities,
                            nationalities,
                        },
                    };
                } catch (error) {
                    console.error('getDemographics error:', error);
                    return {
                        error: {
                            status: 'FETCH_ERROR',
                            error: String(error),
                        },
                    };
                }
            },
        }),
    }),
    overrideExisting: false,
});

export const { useGetMembersQuery, useGetDemographicsQuery } = aboutApi;
