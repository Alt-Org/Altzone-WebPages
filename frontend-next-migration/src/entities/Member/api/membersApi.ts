import { directusApi } from '@/shared/api';
import { Member, QueryFnResponse } from '../model/types/types';
import { envHelper } from '@/shared/const/envHelper';
import { createDirectus, rest, readItems } from '@directus/sdk';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

const directusBaseUrl = envHelper.directusHost;
const client = createDirectus(directusBaseUrl).with(rest());

const membersApi = directusApi.injectEndpoints({
    endpoints: (builder) => ({
        getMembers: builder.query<Member[], void>({
            queryFn: async (): Promise<{ data: Member[] } | { error: FetchBaseQueryError }> => {
                try {
                    const rawMembers: Record<string, any>[] = await client.request(
                        readItems('members', {
                            fields: ['*', 'translations.*', 'departments.*', 'teams.*', 'logo.*'],
                            populate: {
                                translations: true,
                                departments: true,
                                teams: true,
                                logo: true,
                            },
                        }),
                    );

                    const members = rawMembers.map((raw) => ({
                        id: raw.id,
                        name: raw.name,
                        locale: raw.locale,
                        email: raw.email,
                        github: raw.github,
                        linkedin: raw.linkedin,
                        logo: raw.logo,
                        departments: raw.departments,
                        teams: raw.teams,
                    })) as Member[];

                    return { data: members };
                } catch (error: any) {
                    // Map error to FetchBaseQueryError if needed
                    return {
                        error: {
                            status: error.status || 500,
                            data: { message: error.message || 'Data fetch failed' } as any,
                        },
                    };
                }
            },
        }),
    }),
});

export const { useGetMembersQuery } = membersApi;
