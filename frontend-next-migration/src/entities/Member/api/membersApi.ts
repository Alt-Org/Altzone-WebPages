import { directusApi } from '@/shared/api';
import { Member } from '../model/types/types';
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
                    const members = await client.request<Record<string, any>[]>(
                        readItems('members', {
                            fields: [
                                '*',
                                'department.*',
                                'department.translations.*',
                                'team.*',
                                'team.translations.*',
                                'translations.*',
                                'logo.*',
                            ],
                        }),
                    );
                    return { data: members as Member[] };
                } catch (error: any) {
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
